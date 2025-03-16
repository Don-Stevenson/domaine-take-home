import {useLoaderData} from '@remix-run/react';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {ProductCard} from '~/components/ProductCard';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context, params}) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product} = useLoaderData();

  // Process the product data to make secondaryImage more accessible
  const processedProduct = createEnhancedProduct(product);

  return (
    <div className="max-w-6xl flex flex-start px-4 py-8">
      <ProductCard product={processedProduct} />
    </div>
  );
}

/**
 * Creates an enhanced product with properly formatted secondaryImage
 * @param {Object} product - The original product data
 * @returns {Object} - The enhanced product with accessible secondaryImage
 */
function createEnhancedProduct(product) {
  return {
    ...product,
    options: createEnhancedProductOptions(product.options),
    selectedOrFirstAvailableVariant: createEnhancedVariant(
      product.selectedOrFirstAvailableVariant,
    ),
    adjacentVariants: createEnhancedAdjacentVariants(product.adjacentVariants),
  };
}

/**
 * Creates enhanced product options with properly formatted secondaryImage
 * @param {Array|undefined} options - The product options
 * @returns {Array} - The enhanced product options
 */
function createEnhancedProductOptions(options) {
  if (!options) return [];

  return options.map((option) => ({
    ...option,
    optionValues: createEnhancedOptionValues(option.optionValues),
  }));
}

/**
 * Creates enhanced option values with properly formatted secondaryImage
 * @param {Array|undefined} optionValues - The option values
 * @returns {Array} - The enhanced option values
 */
function createEnhancedOptionValues(optionValues) {
  if (!optionValues) return [];

  return optionValues.map((value) => ({
    ...value,
    firstSelectableVariant: createEnhancedVariant(value.firstSelectableVariant),
  }));
}

/**
 * Creates an enhanced variant with properly formatted secondaryImage
 * @param {Object|null} variant - The original variant
 * @returns {Object|null} - The enhanced variant with accessible secondaryImage
 */
function createEnhancedVariant(variant) {
  if (!variant) return null;

  return {
    ...variant,
    secondaryImage: getAccessibleSecondaryImage(variant.secondaryImage),
  };
}

/**
 * Creates enhanced adjacent variants with properly formatted secondaryImage
 * @param {Array|undefined} adjacentVariants - The adjacent variants
 * @returns {Array} - The enhanced adjacent variants
 */
function createEnhancedAdjacentVariants(adjacentVariants) {
  if (!adjacentVariants) return [];

  return adjacentVariants.map((variant) => createEnhancedVariant(variant));
}

/**
 * Gets the accessible image from a secondaryImage metafield reference
 * @param {Object|null} secondaryImage - The secondaryImage metafield
 * @returns {Object|null} - The accessible image or null
 */
function getAccessibleSecondaryImage(secondaryImage) {
  return secondaryImage?.reference?.image || null;
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    secondaryImage: metafield(namespace: "custom", key: "secondary_image") {
      reference {
        ... on MediaImage {
          id
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

import {useLoaderData, useLocation} from '@remix-run/react';
import {Contact} from '~/components/Contact';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.page?.title ?? 'Page'}`}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader({context, params}) {
  try {
    if (params.handle === 'contact') {
      return {
        page: {
          title: 'Contact Us',
          body: '',
        },
      };
    }

    if (!params.handle) {
      throw new Error('Missing page handle');
    }

    const {page} = await context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    });

    if (!page) {
      throw new Response('Not Found', {status: 404});
    }

    return {
      page,
    };
  } catch (error) {
    console.error('Loader error:', error);
    return {
      page: {
        title: 'Error',
        body: '',
      },
    };
  }
}

export default function Page() {
  const data = useLoaderData();
  const location = useLocation();

  try {
    if (location.pathname.endsWith('/contact')) {
      return <Contact />;
    }

    return (
      <div className="page">
        <header>
          <h1>{data?.page?.title}</h1>
        </header>
        <main dangerouslySetInnerHTML={{__html: data?.page?.body ?? ''}} />
      </div>
    );
  } catch (error) {
    console.error('Render error:', error);
    return <div>Something went wrong. Please try again.</div>;
  }
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

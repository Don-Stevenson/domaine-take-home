import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductForm} from './ProductForm';
import {
  OnSaleBadge,
  PriceDisplay,
  ProductCardTitle,
  ProductCardVendor,
} from './typography/ProductCardFont';
import {CustomColorSwatch} from './CustomColorSwatch';

export function ProductCard({product}) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation to a selected variant
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const {title, vendor} = product;

  // Get color options from product options
  const colorOptions =
    product.options?.find((option) => option.name === 'Color')?.optionValues ||
    [];

  const currentColorVariant = selectedColor
    ? colorOptions.find((color) => color.name === selectedColor)
        ?.firstSelectableVariant
    : selectedVariant;

  const isOnSale = (() => {
    if (!currentColorVariant?.compareAtPrice || !currentColorVariant?.price) {
      return false;
    }

    const compareAtPriceAmount = Number(
      currentColorVariant.compareAtPrice.amount,
    );
    const currentPriceAmount = Number(currentColorVariant.price.amount);

    return (
      compareAtPriceAmount > 0 && compareAtPriceAmount !== currentPriceAmount
    );
  })();

  const formatPrice = (priceObj) => {
    const {amount} = priceObj;
    return `${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="flex flex-col gap-[0.938rem]">
      {/* Product Image Section */}
      <div className="relative">
        {isOnSale && (
          <div className="absolute top-5 left-5">
            <OnSaleBadge>On Sale!</OnSaleBadge>
          </div>
        )}

        <div
          className="flex items-center justify-center border border-[#E8E8E8] rounded-xl p-5 max-w-[19.69rem]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full overflow-hidden flex items-center justify-center">
            {currentColorVariant?.image && (
              <Image
                data={currentColorVariant.image}
                className="w-[17.19rem] h-auto transition-opacity duration-300"
                alt={`${title} - ${currentColorVariant.title}`}
              />
            )}
          </div>
        </div>

        {isHovered && currentColorVariant?.secondaryImage && (
          <div
            className="absolute pointer-events-none border border-[#E8E8E8] rounded-xl overflow-hidden"
            style={{
              top: '0rem',
              right: '-1rem',
              transform: 'translateX(100%)',
              height: '19.69rem',
              width: 'auto',
              aspectRatio:
                currentColorVariant.secondaryImage.width /
                currentColorVariant.secondaryImage.height,
            }}
          >
            <Image
              data={currentColorVariant.secondaryImage}
              className="h-full w-auto"
              alt={`${title} - ${currentColorVariant.title} hover view`}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <CustomColorSwatch
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          currentColorVariant={currentColorVariant}
        />
        {/* Product Details Section */}
        <div className="flex flex-col gap-[0.375rem]">
          {vendor && <ProductCardVendor>{vendor}</ProductCardVendor>}
          {title && <ProductCardTitle>{title}</ProductCardTitle>}
          <div className="flex justify-start items-center gap-2">
            {isOnSale ? (
              <>
                <PriceDisplay className="line-through">
                  {currentColorVariant?.compareAtPrice &&
                    formatPrice(currentColorVariant.compareAtPrice)}
                </PriceDisplay>
                <PriceDisplay textColorClasses="text-red-500">
                  {currentColorVariant?.price &&
                    formatPrice(currentColorVariant.price)}
                </PriceDisplay>
              </>
            ) : (
              <PriceDisplay>
                {currentColorVariant?.price &&
                  formatPrice(currentColorVariant.price)}
              </PriceDisplay>
            )}
          </div>
        </div>
        <div className="mt-8">
          <ProductForm
            selectedVariant={currentColorVariant || selectedVariant}
          />
        </div>
      </div>
    </div>
  );
}

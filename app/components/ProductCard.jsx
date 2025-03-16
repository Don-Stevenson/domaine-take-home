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

export function ProductCard({product}) {
  const [selectedColor, setSelectedColor] = useState(null);

  // Selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation to a selected variant
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const {title, vendor} = product;

  // Get color options
  const colorOptions =
    product.options?.find((option) => option.name === 'Color')?.optionValues ||
    [];

  // Find the currently selected color variant
  const currentColorVariant = selectedColor
    ? colorOptions.find((color) => color.name === selectedColor)
        ?.firstSelectableVariant
    : selectedVariant;

  // Check if product is on sale
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
        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-5 left-5">
            <OnSaleBadge>On Sale!</OnSaleBadge>
          </div>
        )}

        <div className="flex items-center justify-center border border-[#E8E8E8] pt-5 pb-5 rounded-xl p-5 max-w-[19.69rem]">
          <div className="w-full overflow-hidden flex items-center justify-center">
            {currentColorVariant?.image && (
              <Image
                data={currentColorVariant.image}
                className="w-[17.19rem] h-auto"
                alt={`${title} - ${currentColorVariant.title}`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col">
        {/* Color options */}
        <div className="flex flex-wrap gap-2 mb-[0.938rem] w-40">
          {colorOptions.map((color) => {
            const isSelected =
              selectedColor === color.name ||
              (!selectedColor &&
                currentColorVariant?.selectedOptions[0]?.value === color.name);

            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`relative w-[1.25rem] h-[1.25rem] rounded-full ${
                  isSelected ? 'ring-1 ring-[#0A4874] ring-offset-1' : ''
                }`}
                style={{
                  backgroundColor: getColorCode(color.name),
                  backgroundImage: color.swatch?.image
                    ? `url(${color.swatch.image.previewImage?.url})`
                    : 'none',
                }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-[0.375rem]">
          {vendor && <ProductCardVendor>{vendor}</ProductCardVendor>}
          <ProductCardTitle>{title}</ProductCardTitle>
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

// Helper function to get color codes
function getColorCode(colorName) {
  const colorMap = {
    Orange: '#FF6633',
    Green: '#006600',
    Blue: '#00639C',
    Yellow: '#FCE78D',
    Pink: '#FFCCFF',
    Navy: '#19264B',
  };

  return colorMap[colorName] || '#cccccc';
}

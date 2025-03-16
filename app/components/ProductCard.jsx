import {useState} from 'react';
import {
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductForm} from './ProductForm';
import {CustomColorSwatch} from './CustomColorSwatch';
import {HoverImage} from './HoverImage';
import {ProductDetails} from './ProductDetails';

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
      <div className="relative">
        <HoverImage
          isHovered={isHovered}
          currentColorVariant={currentColorVariant}
          title={title}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          isOnSale={isOnSale}
          hoverImagePositionClasses="top-0 -right-4"
        />
      </div>
      <div className="flex flex-col">
        <CustomColorSwatch
          colorOptions={colorOptions}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          currentColorVariant={currentColorVariant}
        />
        <ProductDetails
          vendor={vendor}
          title={title}
          isOnSale={isOnSale}
          currentColorVariant={currentColorVariant}
          formatPrice={formatPrice}
        />
        <div className="mt-8">
          <ProductForm
            selectedVariant={currentColorVariant || selectedVariant}
          />
        </div>
      </div>
    </div>
  );
}

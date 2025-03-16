import {
  PriceDisplay,
  ProductCardTitle,
  ProductCardVendor,
} from './typography/ProductCardFont';

export function ProductDetails({
  vendor,
  title,
  isOnSale,
  currentColorVariant,
  formatPrice,
}) {
  return (
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
  );
}

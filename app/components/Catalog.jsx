import {Image, Money} from '@shopify/hydrogen';
export function Catalog({product}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 mt-8">
      <div className="flex flex-col gap-4 sm:gap-8">
        <div className="text-[#0A4874] font-roboto font-medium text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4">
          Current Catalog
        </div>
        <span className="font-roboto text-gray-600 max-w-[10rem] md:max-w-auto sm:max-w-2xl text-sm sm:mx-0 sm:px-0">
          Check out our current catalog below. Quality t-shirts at unbeatable
          prices!
        </span>
        <div className="flex">
          <div className="border border-[#E8E8E8] rounded-xl">
            <span className="text-[#0A4874] font-roboto font-medium text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4">
              {product.title}
            </span>
            <div className="mb-3 sm:mb-4 md:mb-6">
              {product.featuredImage && (
                <Image
                  data={product.featuredImage}
                  aspectRatio="1/1"
                  sizes="(min-width: 640px) 50vw, (min-width: 768px) 40vw, (min-width: 1024px) 30vw, 90vw"
                  className="rounded-lg sm:mx-0 max-w-[55%] md:max-w-[75%] lg:max-w-[60%]"
                />
              )}
            </div>
            <span className="font-roboto font-medium text-[#111111] text-base sm:text-lg md:text-xl block mb-1 sm:mb-2">
              Special Price
            </span>
            <span className="font-roboto text-[#0A4874] text-lg sm:text-xl md:text-2xl font-bold">
              <Money data={product.priceRange.minVariantPrice} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

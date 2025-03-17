import {Image, Money} from '@shopify/hydrogen';
export function Catalog({product}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 mt-8">
      <div className="flex flex-col gap-4 sm:gap-8">
        <div className="text-[#0A4874] font-roboto font-medium text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-center sm:text-left">
          Current Catalog
        </div>
        <div className="text-center sm:text-left">
          <p className="font-roboto text-gray-600 text-sm max-w-2xl mx-auto sm:mx-0 px-2 sm:px-0">
            Check out our current catalog below. Quality t-shirts at unbeatable
            prices!
          </p>
        </div>
        <div className="flex justify-center sm:justify-start">
          <div className="border border-[#E8E8E8] rounded-xl p-4 sm:p-6 md:p-8 bg-white shadow-sm w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
            <h2 className="text-[#0A4874] font-roboto font-medium text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-center sm:text-left">
              {product.title}
            </h2>
            <div className="mb-3 sm:mb-4 md:mb-6">
              {product.featuredImage && (
                <Image
                  data={product.featuredImage}
                  aspectRatio="1/1"
                  sizes="(min-width: 640px) 50vw, (min-width: 768px) 40vw, (min-width: 1024px) 30vw, 90vw"
                  className="rounded-lg mx-auto sm:mx-0 max-w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%]"
                />
              )}
            </div>
            <div className="text-center sm:text-left">
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
    </div>
  );
}

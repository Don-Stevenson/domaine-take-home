import {Image, Money} from '@shopify/hydrogen';
export function Catalog({product}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-8">
      <div className="flex flex-col gap-8">
        <div className="text-[#0A4874] font-roboto font-medium text-3xl md:text-4xl mb-4">
          Current Catalog
        </div>
        <div className="text-center">
          <p className="font-roboto text-gray-600 max-w-2xl mx-auto">
            Check out our current catalog below. Quality t-shirts at unbeatable
            prices!
          </p>
        </div>
        <div className="flex justify-center">
          <div className="border border-[#E8E8E8] rounded-xl p-6 md:p-8 bg-white shadow-sm max-w-sm w-full">
            <h2 className="text-[#0A4874] font-roboto font-medium text-xl mb-4 text-center">
              {product.title}
            </h2>
            <div className="mb-4">
              {product.featuredImage && (
                <Image
                  data={product.featuredImage}
                  aspectRatio="1/1"
                  sizes="(min-width: 45em) 20vw, 50vw"
                  className="rounded-lg mx-auto"
                />
              )}
            </div>
            <div className="text-center">
              <span className="font-roboto font-medium text-[#111111] text-lg block mb-2">
                Special Price
              </span>
              <span className="font-roboto text-[#0A4874] text-xl font-bold">
                <Money data={product.priceRange.minVariantPrice} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

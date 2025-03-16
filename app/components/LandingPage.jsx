import {Image, Money} from '@shopify/hydrogen';

export function LandingPage({money, image, title}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col gap-4 sm:gap-8">
        <div className="text-[#0A4874] font-roboto font-medium text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-center sm:text-left">
          Our Latest Products
        </div>
        <div className="text-center">
          <p className="font-roboto text-gray-600 text-sm max-w-2xl mx-auto px-2 sm:px-0">
            Check out our latest sale items below. Quality t-shirts at
            unbeatable prices!
          </p>
        </div>
        <div className="flex justify-center">
          <div className="border border-[#E8E8E8] rounded-xl p-4 sm:p-6 md:p-8 bg-white shadow-sm w-full max-w-xs sm:max-w-sm">
            <h2 className="text-[#0A4874] font-roboto font-medium text-lg sm:text-xl mb-3 sm:mb-4 text-center">
              {title}
            </h2>
            <div className="mb-3 sm:mb-4">
              <Image
                data={image}
                aspectRatio="1/1"
                sizes="(min-width: 640px) 50vw, (min-width: 768px) 40vw, (min-width: 1024px) 30vw, 90vw"
                className="rounded-lg mx-auto"
              />
            </div>
            <div className="text-center">
              <span className="font-roboto font-medium text-[#111111] text-base sm:text-lg block mb-1 sm:mb-2">
                Special Price
              </span>
              <span className="font-roboto text-[#0A4874] text-lg sm:text-xl font-bold">
                <Money data={money} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {Image} from '@shopify/hydrogen';
import {CarouselDots} from './CarouselDots';

export function MobileCarousel({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  containerStyle,
}) {
  return (
    <div className="md:hidden">
      <button
        className="w-full flex items-center justify-center border border-[#E8E8E8] rounded-xl p-5 max-w-[19.69rem]"
        style={containerStyle}
        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
          }
        }}
        aria-label={`View ${
          currentImageIndex === 0 ? 'secondary' : 'primary'
        } image`}
      >
        {images[currentImageIndex]?.image && (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              data={images[currentImageIndex].image}
              className="max-h-full max-w-full object-contain"
              alt={images[currentImageIndex].alt}
              sizes="100vw"
            />
          </div>
        )}
      </button>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <CarouselDots
              key={`image-dot-${image.alt}`}
              index={index}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

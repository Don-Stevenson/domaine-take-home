import {Image} from '@shopify/hydrogen';
import {OnSaleBadge} from './OnSaleBadge';
import {useState} from 'react';
import {MobileCarousel} from './MobileCarousel';

export function HoverImage({
  isHovered,
  currentColorVariant,
  title,
  onMouseEnter,
  onMouseLeave,
  isOnSale,
  hoverImagePositionClasses = '',
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImageViews =
    currentColorVariant?.image && currentColorVariant?.secondaryImage
      ? [
          {
            image: currentColorVariant.image,
            alt: `${title} - ${currentColorVariant.title}`,
          },
          {
            image: currentColorVariant.secondaryImage,
            alt: `${title} - ${currentColorVariant.title} secondary view`,
          },
        ]
      : [];

  const calculatedContainerStyle =
    productImageViews.length === 2
      ? {
          aspectRatio: Math.min(
            currentColorVariant.image.width / currentColorVariant.image.height,
            currentColorVariant.secondaryImage.width /
              currentColorVariant.secondaryImage.height,
          ),
        }
      : {};

  return (
    <div className="relative isolate">
      {isOnSale && (
        <div className="absolute top-5 left-5 z-[2]">
          <OnSaleBadge>On Sale!</OnSaleBadge>
        </div>
      )}
      <MobileCarousel
        images={productImageViews}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        containerStyle={calculatedContainerStyle}
      />

      {/* Desktop/Tablet Hover View */}
      <div className="hidden md:block">
        <div
          className="flex items-center justify-center border border-[#E8E8E8] rounded-xl p-5 max-w-[19.69rem]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="w-full overflow-hidden flex items-center justify-center">
            {currentColorVariant?.image && (
              <Image
                data={currentColorVariant.image}
                className="w-[17.19rem] h-auto transition-opacity duration-300"
                alt={`${title} - ${currentColorVariant.title}`}
                sizes="(min-width: 768px) 275px, 100vw"
              />
            )}
          </div>
        </div>

        {isHovered && currentColorVariant?.secondaryImage && (
          <div
            className={`absolute pointer-events-none border border-[#E8E8E8] rounded-xl overflow-hidden h-[19.69rem] w-auto translate-x-full ${hoverImagePositionClasses}`}
            style={{
              aspectRatio:
                currentColorVariant.secondaryImage.width /
                currentColorVariant.secondaryImage.height,
            }}
          >
            <Image
              data={currentColorVariant.secondaryImage}
              className="h-full w-auto z-[-1]"
              alt={`${title} - ${currentColorVariant.title} hover view`}
              sizes="(min-width: 768px) 315px, 100vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}

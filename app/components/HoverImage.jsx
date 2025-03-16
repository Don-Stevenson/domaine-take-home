import {Image} from '@shopify/hydrogen';
import {OnSaleBadge} from './OnSaleBadge';

export function HoverImage({
  isHovered,
  currentColorVariant,
  title,
  onMouseEnter,
  onMouseLeave,
  isOnSale,
  hoverImagePositionClasses = '',
}) {
  return (
    <div className="relative">
      {isOnSale && (
        <div className="absolute top-5 left-5">
          <OnSaleBadge>On Sale!</OnSaleBadge>
        </div>
      )}

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
            className="h-full w-auto"
            alt={`${title} - ${currentColorVariant.title} hover view`}
          />
        </div>
      )}
    </div>
  );
}

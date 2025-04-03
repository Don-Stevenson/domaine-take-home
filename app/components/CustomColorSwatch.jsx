export function CustomColorSwatch({
  colorOptions,
  selectedColor,
  setSelectedColor,
  currentColorVariant,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-[0.938rem] w-40">
      {colorOptions.map((color) => {
        const isSelected =
          selectedColor === color.name ||
          (!selectedColor &&
            currentColorVariant?.selectedOptions[0]?.value === color.name);
        const isOutOfStock = !color.firstSelectableVariant?.availableForSale;
        return (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`relative w-[1.25rem] h-[1.25rem] rounded-full ${
              isSelected ? 'ring-1 ring-[#0A4874] ring-offset-1' : ''
            } ${
              isOutOfStock
                ? 'before:absolute before:content-[""] before:w-[1.5rem] before:h-[5px] before:bg-red-900 before:rotate-45 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2'
                : ''
            }`}
            disabled={isOutOfStock}
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

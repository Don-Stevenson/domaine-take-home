export function CarouselDots({index, currentImageIndex, setCurrentImageIndex}) {
  return (
    <button
      className={`w-2 h-2 rounded-full ${
        currentImageIndex === index ? 'bg-gray-600' : 'bg-gray-300'
      }`}
      onClick={() => setCurrentImageIndex(index)}
      aria-label={`View image ${index + 1}`}
    />
  );
}

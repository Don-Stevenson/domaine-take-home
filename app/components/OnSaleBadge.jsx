export function OnSaleBadge({
  className = 'border-red-600',
  children,
  textColorClasses = 'text-red-600',
}) {
  return (
    <span
      className={`${className} ${textColorClasses} font-franklin font-medium text-[0.59rem] leading-[0.69rem] md:text-sm md:leading-[1.12rem] text-center px-1 py-0.5 md:px-3 md:py-1.5 rounded-full border w-[3.4rem] h-[1.2rem] md:w-[5.7rem] md:h-[1.85rem] flex items-center justify-center`}
      aria-label="Product on sale"
    >
      {children}
    </span>
  );
}

export function PriceDisplay({
  className = '',
  children,
  textColorClasses = 'text-gray-500',
}) {
  return (
    <span
      className={`${className} ${textColorClasses} font-roboto font-normal text-[14px] leading-[16px] text-center `}
    >
      {children}
    </span>
  );
}

export function ProductCardTitle({
  className = '',
  children,
  textColorClasses = 'text-[#0A4874]',
}) {
  return (
    <span
      className={`${className} ${textColorClasses} font-roboto font-medium text-base leading-[1.125rem]`}
    >
      {children}
    </span>
  );
}

export function ProductCardVendor({
  className = '',
  children,
  textColorClasses = 'text-[#111111]',
}) {
  return (
    <span
      className={`${className} ${textColorClasses} font-roboto font-normal text-sm leading-4 w-auto h-4`}
    >
      {children}
    </span>
  );
}

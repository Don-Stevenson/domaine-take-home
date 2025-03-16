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

export function OnSaleBadge({
  className = 'border-red-600',
  children,
  textColorClasses = 'text-red-600',
}) {
  return (
    <span
      className={`${className} ${textColorClasses} "font-franklin font-medium text-sm leading-[1.12rem] text-center px-3 py-1.5 rounded-full border w-[5.7rem] h-[1.85rem] flex items-center justify-cente`}
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

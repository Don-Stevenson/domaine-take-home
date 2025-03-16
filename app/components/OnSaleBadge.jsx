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

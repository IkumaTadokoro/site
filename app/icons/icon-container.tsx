export default function IconContainer({
  children,
  srText,
  size = 42,
}: {
  children: React.ReactNode;
  srText: string;
  size?: number;
}) {
  const iconSize = `${size}px`;

  return (
    <div className="grid place-content-center rounded-md shadow-sm w-12 h-12">
      <svg viewBox="0 0 128 128" width={iconSize} height={iconSize}>
        {children}
      </svg>
      <span className="sr-only">{srText}</span>
    </div>
  );
}

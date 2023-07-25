import { css } from "styled-system/css";
import { grid } from "styled-system/patterns";

export default function IconContainer({
  children,
  srText,
  size = 42,
}: {
  children: React.ReactNode;
  srText: string;
  size?: number;
}) {
  const containerSize = `48px`;
  const iconSize = `${size}px`;
  const srOnly = css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  });

  return (
    <div
      className={grid({
        rounded: "md",
        shadow: "xs",
        placeContent: "center",
        width: containerSize,
        height: containerSize,
      })}
    >
      <svg viewBox="0 0 128 128" width={iconSize} height={iconSize}>
        {children}
      </svg>
      <span className={srOnly}>{srText}</span>
    </div>
  );
}

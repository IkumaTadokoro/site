import { css } from "styled-system/css";
import { container, grid } from "styled-system/patterns";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={grid({
        borderTop: "1px solid",
        borderColor: "zinc.100",
      })}
    >
      <div
        className={container({
          paddingY: { base: 8 },
        })}
      >
        <p
          className={css({
            color: "zinc.500",
            fontSize: "sm",
          })}
        >
          &copy; Copyright ikuma-t {year}, All rights reserved
        </p>
      </div>
    </footer>
  );
}

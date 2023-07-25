import { css } from "styled-system/css";
import { container, flex } from "styled-system/patterns";

export default function NavBar() {
  return (
    <header className={css({ shadow: "xs" })}>
      <div className={container({ paddingY: { base: 3 }, maxWidth: "2xl" })}>
        <ul
          className={flex({
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
          })}
        >
          <li>
            <h1
              className={css({
                fontWeight: 700,
                fontSize: {
                  base: "xl",
                },
                display: "flex",
                alignItems: "center",
                gap: 3,
              })}
            >
              <a href="/">
                <img
                  src="/ikuma.png"
                  alt="ikuma-tのアイコン"
                  width="38px"
                  className={css({
                    borderRadius: "50%",
                    shadow: "md",
                    _hover: {
                      opacity: 0.8,
                      cursor: "pointer",
                    },
                  })}
                />
              </a>
            </h1>
          </li>
          <li
            className={css({
              color: "zinc.900",
              _hover: {
                opacity: 0.8,
                cursor: "pointer",
              },
            })}
          >
            <a
              href="https://ikuma-t.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

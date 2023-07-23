import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className={container({ paddingY: { base: 2, md: 6, lg: 8 } })}>
      <h1
        className={css({
          textStyle: "6xl",
          fontWeight: "bold",
          color: "zinc.500",
        })}
      >
        Hello! I'm ikuma-t!
      </h1>
    </div>
  );
}

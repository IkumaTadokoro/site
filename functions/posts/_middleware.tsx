import React from "react";
import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";

interface Props {
  ogTitle: string;
}

export const onRequest = vercelOGPagesPlugin<Props>({
  imagePathSuffix: "/ogp.png",
  component: ({ ogTitle }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "80%",
          }}
        >
          <span
            style={{
              fontSize: "70px",
              fontWeight: "900",
              color: "white",
              backgroundColor: "black",
              padding: "8px 32px",
            }}
          >
            {ogTitle}
          </span>
        </div>
      </div>
    );
  },
  extractors: {
    on: {
      'meta[property="og:title"]': (props) => ({
        element(element) {
          props.ogTitle = element.getAttribute("content")!;
        },
      }),
    },
  },

  // NOTE: 動作しない。バグってる？
  autoInject: {
    openGraph: true,
  },
});

import type {
  V2_MetaFunction,
  LoaderArgs,
  HeadersFunction,
} from "@remix-run/cloudflare";

import { useLoaderData } from "@remix-run/react";
import React from "react";
import { createNewtClient } from "~/utils/newt.server";
import {
  getLatestInformation,
  getPinnedInformation,
} from "~/models/information.server";
import { getLatestTalks } from "~/models/talk.server";
import { getLatestPosts } from "~/models/post.server";
import { LatestContentCard } from "./latest-content-card";
import { BuyMeACoffee } from "./buy-me-a-coffee";
import { Information } from "./information";
import { SelfIntroduction } from "./self-introduction";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ikuma-t.com" },
    { name: "description", content: "プログラマikuma-tの個人サイトです。" },
    { property: "og:title", content: "ikuma-t.com" },
    {
      property: "og:description",
      content: "プログラマikuma-tの個人サイトです。",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://ikuma-t.com" },
    { property: "og:image", content: "https://ikuma-t.com/ogp.png" },
    { property: "twitter:card", content: "summary" },
    { property: "twitter:site", content: "@ikumatdkr" },
  ];
};

export const headers: HeadersFunction = () => {
  // max-age=1sec: Stale-while-revalidateが無効なブラウザではキャッシュしない: https://caniuse.com/?search=stale-while-revalidate
  // SwR=10min: 滞在しているセッションの中ではキャッシュを使う
  // stale-if-error=1day: エラーが発生した場合は1日間はキャッシュを使う
  return {
    "Cache-Control":
      "max-age=1, s-maxage=60, stale-while-revalidate=600 stale-if-error=86400",
  };
};

export const loader = async ({ context }: LoaderArgs) => {
  const {
    env: { NEWT_CDN_API_TOKEN: token, NEWT_SPACE_UID: spaceUid },
  } = context;
  const client = createNewtClient({ spaceUid, token });
  const [latestTalk, latestPost, latestInformation, pinnedInformation] =
    await Promise.all([
      getLatestTalks(client),
      getLatestPosts(client),
      getLatestInformation(client),
      getPinnedInformation(client),
    ]);
  return { latestPost, latestTalk, latestInformation, pinnedInformation };
};

export default function Index() {
  const { latestPost, latestTalk, latestInformation, pinnedInformation } =
    useLoaderData() as Awaited<ReturnType<typeof loader>>;
  if (!latestPost) {
    return null;
  }

  if (!latestTalk) {
    return null;
  }

  if (!latestInformation) {
    return null;
  }

  return (
    <div>
      <section className="sm:grid place-content-center place-items-center gap-y-2 my-12 md:my-20 hidden">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800">
          Hi 👋! I'm ikuma-t.
        </h2>
        <p className="text-zinc-500 text-sm md:text-base lg:text-lg">
          Tabun... Frontend Engineer
        </p>
      </section>
      <div className="grid gap-4">
        <SelfIntroduction />
        <Information {...{ latestInformation, pinnedInformation }} />
        <div className="grid md:grid-cols-2 gap-4">
          <LatestContentCard
            cardTitle="Blog"
            cardDescription="最新の投稿"
            backgroundContent={{
              emoji: latestPost.emoji.value,
            }}
            title={latestPost.title}
            description={latestPost.body.replace(
              /#|##|###|####|#####|######|\[.*?\]\(.*?\)|\*|-|1.| \| |\n/g,
              " "
            )}
            href={`/posts/${latestPost.slug}`}
          />
          <LatestContentCard
            cardTitle="Talk"
            cardDescription="最新の登壇"
            backgroundContent={{
              imageUrl: latestTalk.ogp.src,
            }}
            title={latestTalk.title}
            description={latestTalk.body.replace(
              /#|##|###|####|#####|######|\[.*?\]\(.*?\)|\*|-|1.| \| |\n/g,
              " "
            )}
            href={`/talks/${latestTalk._id}`}
          />
        </div>
        <BuyMeACoffee />
      </div>
    </div>
  );
}

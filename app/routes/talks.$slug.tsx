import type {
  HeadersFunction,
  LoaderArgs,
  V2_MetaArgs,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { TypographyH2, TypographyH3 } from "~/components/typography";
import parse from "html-react-parser";
import Time from "~/components/time";
import { DoorOpen } from "lucide-react";
import { createNewtClient } from "~/utils/newt.server";
import { getTalkById } from "~/models/talk.server";

export const loader = async ({ context, params }: LoaderArgs) => {
  const {
    env: { NEWT_CDN_API_TOKEN: token, NEWT_SPACE_UID: spaceUid },
  } = context;
  const client = createNewtClient({ spaceUid, token });

  const talk = await getTalkById(client, params.slug);
  return {
    talk,
  };
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

export const meta: V2_MetaFunction<Awaited<ReturnType<typeof loader>>> = ({
  location,
  data,
}: V2_MetaArgs) => {
  const url = new URL(location.pathname, "https://ikuma-t.com");
  const title = data.talk.title;
  const htmlExpr = /<("[^"]*"|'[^']*'|[^'">])*>/g;
  const description =
    data.talk.body.replace(htmlExpr, "").slice(0, 117) + "...";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: description,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    {
      property: "og:image",
      content: "https://ikuma-t.com/ogp.png",
    },
    { property: "twitter:card", content: "summary" },
    { property: "twitter:site", content: "@ikumatdkr" },
  ];
};

export default function TalkSlug() {
  const { talk } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="grid gap-x-8 gap-y-8">
      <section>
        <TypographyH2>{talk.title}</TypographyH2>
        <div className="text-sm text-muted-foreground">
          <Time timeString={talk.eventDate} type="createdAt" />
        </div>
      </section>
      <section>
        <TypographyH3>登壇スライド</TypographyH3>
        <div className="mt-2">{parse(talk.slideUrl.html)}</div>
      </section>
      {talk.eventUrl && (
        <section>
          <TypographyH3>登壇イベント</TypographyH3>
          <div className="inline-flex gap-x-2 items-center mt-4 border-b border-zinc-200 hover:border-zinc-700 pb-1">
            <DoorOpen />
            <div>
              <a className="mt-2" href={talk.eventUrl.url}>
                {talk.eventName}
              </a>
            </div>
          </div>
        </section>
      )}
      <section>
        <TypographyH3>登壇内容</TypographyH3>
        <div className="mt-4 prose-neutral prose-sm sm:prose prose-h2:text-lg prose-h2:font-bold prose-h2:text-neutral-400">
          {parse(talk.body)}
        </div>
      </section>
    </div>
  );
}

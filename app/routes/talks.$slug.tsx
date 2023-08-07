import { createClient } from "newt-client-js";
import type { Content } from "newt-client-js";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { TypographyH2, TypographyH3 } from "~/components/typography";
import parse from "html-react-parser";
import Time from "~/components/time";
import { DoorOpen } from "lucide-react";

interface Talk extends Content {
  title: string;
  body: string;
  ogp: {
    _id: string;
    altText: string;
    description: string;
    fileName: string;
    fileSize: number;
    width: number;
    height: number;
    title: string;
    fileType: string;
    src: string;
  };
  slideUrl: {
    html: string;
    url: string;
  };
  eventName: string;
  eventUrl: {
    html: string;
    url: string;
  };
  eventDate: string;
}

export const loader = async ({ context, params }: LoaderArgs) => {
  const client = createClient({
    spaceUid: context.env.NEWT_SPACE_UID,
    token: context.env.NEWT_CDN_API_TOKEN,
    apiType: "cdn",
    adapter: fetchAdapter,
  });

  const talk = await client.getContent<Talk>({
    appUid: "ikuma-t",
    modelUid: "talk",
    contentId: params.slug,
    query: {},
  });

  return {
    talk,
  };
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

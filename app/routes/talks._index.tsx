import PageTitle from "~/components/page-title";
import TalkCard from "~/components/talk-card";
import { createClient } from "newt-client-js";
import type { Content } from "newt-client-js";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import TallyIcon from "~/components/tally-icon";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Talks | ikuma-t.com" },
    { name: "description", content: "登壇したイベントの一覧です。" },
    { property: "og:title", content: "Talks" },
    {
      property: "og:description",
      content: "登壇したイベントの一覧です",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://ikuma-t.com/talks" },
    { property: "og:image", content: "/ogp.png" },
  ];
};

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

export const loader = async ({ context }: LoaderArgs) => {
  const client = createClient({
    spaceUid: context.env.NEWT_SPACE_UID,
    token: context.env.NEWT_CDN_API_TOKEN,
    apiType: "cdn",
    adapter: fetchAdapter,
  });

  const talks = await client.getContents<Talk>({
    appUid: "ikuma-t",
    modelUid: "talk",
    query: {
      select: ["_id", "title", "body", "ogp", "eventName", "eventDate"],
      order: ["-eventDate"],
      body: { fmt: "text" },
    },
  });

  return {
    talks,
  };
};

export default function Talks() {
  const { talks } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [latestTalk, ...otherTalks] = talks.items;
  const otherTalkGroupedByYear = otherTalks.reduce((acc, talk) => {
    const year = new Date(talk.eventDate).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(talk);
    return acc;
  }, {} as Record<number, Talk[]>);
  const latestTalkEventYear = new Date(latestTalk.eventDate).getFullYear();

  return (
    <div className="grid gap-x-4 gap-y-4">
      <PageTitle title="Talks" description="登壇したイベントの一覧です" />
      <section className="grid gap-2">
        <h3 className="text-muted-foreground font-bold text-md md:text-lg">
          最新
        </h3>
        <TalkCard
          id={latestTalk._id}
          title={latestTalk.title}
          imageUrl={latestTalk.ogp.src}
          eventDate={latestTalk.eventDate}
          eventName={latestTalk.eventName}
        />
      </section>
      <section>
        {Object.entries(otherTalkGroupedByYear)
          .sort(([yearA], [yearB]) => {
            return Number(yearB) - Number(yearA);
          })
          .map(([year, talks]) => {
            const isLatestTalkEventYear = Number(year) === latestTalkEventYear;
            const count =
              otherTalkGroupedByYear[Number(year)].length +
              (isLatestTalkEventYear ? 1 : 0);

            return (
              <div key={year} className="grid gap-2 mb-4">
                <h3 className="text-muted-foreground text-sm md:text-md flex items-center gap-x-2">
                  {year}
                  <TallyIcon number={count} />
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {talks.map((talk) => {
                    return (
                      <TalkCard
                        key={talk._id}
                        id={talk._id}
                        title={talk.title}
                        imageUrl={talk.ogp.src}
                        eventDate={talk.eventDate}
                        eventName={talk.eventName}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

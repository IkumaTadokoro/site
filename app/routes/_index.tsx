import type { V2_MetaFunction, LoaderArgs } from "@remix-run/cloudflare";
import {
  ChevronRightCircle,
  ChevronsUpDown,
  Coffee,
  ExternalLink,
  Link2,
  Megaphone,
} from "lucide-react";
import { Link, useLoaderData } from "@remix-run/react";
import { Icons } from "~/components/icons";
import { TypographyMuted } from "~/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { createClient } from "newt-client-js";
import type { Content } from "newt-client-js";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import { Badge } from "~/components/ui/badge";
import Time from "~/components/time";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import parse from "html-react-parser";

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
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:site", content: "@ikumatdkr" },
  ];
};

interface Post extends Content {
  title: string;
  body: string;
  emoji: {
    type: "emoji";
    value: string;
  };
  category: "tech" | "life" | "idea";
}

interface Information extends Content {
  title: string;
  body: string;
  publishedAt: string;
  pinned: boolean;
}

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

  const latestTalk = await client.getFirstContent<Talk>({
    appUid: "ikuma-t",
    modelUid: "talk",
    query: {
      select: ["_id", "title", "body", "ogp", "eventDate"],
      order: ["-eventDate"],
      body: { fmt: "text" },
    },
  });

  const latestPost = await client.getFirstContent<Post>({
    appUid: "ikuma-t",
    modelUid: "post",
    query: {
      body: { fmt: "text" },
    },
  });

  const latestInformation = await client.getContents<Information>({
    appUid: "ikuma-t",
    modelUid: "information",
    query: {
      limit: 3,
      order: ["-publishedAt"],
    },
  });

  const pinnedInformation = await client.getFirstContent<Information>({
    appUid: "ikuma-t",
    modelUid: "information",
    query: {
      and: [{ pinned: true }],
    },
  });

  return { latestPost, latestTalk, latestInformation, pinnedInformation };
};

export default function Index() {
  const [isOpen, setIsOpen] = React.useState(false);
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
        <p className="text-zinc-400 text-sm md:text-base lg:text-lg">
          Tabun... Frontend Engineer
        </p>
      </section>
      <div className="grid gap-4">
        <Card>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CardHeader className="flex justify-between flex-row items-center">
              <CardTitle className="flex items-center gap-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/ikuma.png" />
                  <AvatarFallback>ikuma-t</AvatarFallback>
                </Avatar>
                <h2 className="flex md:items-center flex-col md:flex-row gap-x-3 gap-y-1">
                  ikuma-t
                  <span className="text-zinc-400 text-xs sm:text-sm font-medium">
                    いくまてぃー | いくま
                  </span>
                </h2>
              </CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="outline">
                  <span className="hidden md:inline">詳細を見る</span>
                  <ChevronsUpDown className="h-4 w-4 md:ml-2" />
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CardContent>
              <div className="prose">
                <p className="text-sm sm:text-md">
                  Fintechスタートアップで働くプログラマです。フロントエンドが好きです。
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <section className="grid gap-2 px-1">
                <TypographyMuted>SNS</TypographyMuted>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="https://github.com/IkumaTadokoro"
                    target="_blank"
                    className="border-b flex gap-2 items-center hover:border-zinc-800 hover:opacity-70"
                  >
                    <Icons.gitHub className="h-5 w-5" />
                    GitHub
                  </Link>
                  <Link
                    to="https://twitter.com/ikumatdkr"
                    target="_blank"
                    className="border-b flex gap-2 items-center hover:border-zinc-800 hover:opacity-70"
                  >
                    <Icons.twitter className="h-5 w-5" />
                    <Icons.x className="h-4 w-4" />
                  </Link>
                  <Link
                    to="https://zenn.dev/ikuma"
                    target="_blank"
                    className="border-b flex gap-2 items-center hover:border-zinc-800 hover:opacity-70"
                  >
                    <Icons.zenn className="h-5 w-5" />
                    Zenn
                  </Link>
                  <Link
                    to="https://www.timesy.dev/ikuma"
                    target="_blank"
                    className="border-b flex gap-2 items-center hover:border-zinc-800 hover:opacity-70"
                  >
                    <Link2 className="h-5 w-5" />
                    Timesy
                  </Link>
                  <Link
                    to="https://bento.me/ikuma"
                    target="_blank"
                    className="border-b flex gap-2 items-center hover:border-zinc-800 hover:opacity-70"
                  >
                    <Link2 className="h-5 w-5" />
                    Bento
                  </Link>
                  <Link
                    to="https://bsky.app/profile/ikumatdkr.bsky.social"
                    target="_blank"
                    className="border-b flex gap-2 items-center hover:border-zinc-800 hover:opacity-70"
                  >
                    <Link2 className="h-5 w-5" />
                    Bluesky
                  </Link>
                </div>
              </section>
            </CardFooter>
            <CardContent>
              <CollapsibleContent className="grid space-y-8">
                <section className="grid space-y-2">
                  <TypographyMuted>自己紹介</TypographyMuted>
                  <div className="prose text-sm sm:text-md">
                    <p>
                      もともと業務パッケージの導入コンサル的なことをやっていましたが、
                      <Link
                        to="https://bootcamp.fjord.jp/"
                        className="decoration-slate-500 hover:opacity-70 underline-offset-4 mx-1 gap-1 items-center inline-flex"
                      >
                        <span className="text-slate-700">FJORD BOOT CAMP</span>
                        <ExternalLink className="pt-0.5 w-5 h-5" />
                      </Link>
                      での学習を経てプログラマーに転職しました。
                    </p>
                    <p>
                      普段から追いかけているのはフロントエンド周りやWeb標準ですが、バックエンドも興味がないわけではなく以下のような技術の使用経験があります。詳細については
                      <Link
                        to="tech-stack"
                        className="decoration-slate-500 hover:opacity-70 underline-offset-4 mx-1 gap-1 items-center inline-flex"
                      >
                        <div className="text-slate-700">技術スタック</div>
                        <Link2 className="pt-0.5 w-5 h-5" />
                      </Link>
                      参照。
                    </p>
                    <p>
                      技術を丁寧に深ぼること、表現の工夫でより良い体験を届けることが得意です！
                    </p>
                  </div>
                </section>
                <section className="grid space-y-2">
                  <TypographyMuted>経歴</TypographyMuted>
                  <Table>
                    <TableCaption>最終更新日: 2023.08.06</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[70px]">年月</TableHead>
                        <TableHead>出来事</TableHead>
                        <TableHead>詳細</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">2014.04</TableCell>
                        <TableCell>XX大学経済学部経営学科 入学</TableCell>
                        <TableCell>
                          経営学を専攻したのは自営業でパン屋をやろうと思っていたため。
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2018.03</TableCell>
                        <TableCell>XX大学経済学部経営学科 卒業</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2018.04</TableCell>
                        <TableCell>
                          システムインテグレータ系の会社 入社
                        </TableCell>
                        <TableCell>
                          ERPパッケージ導入コンサルタントとして従事
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2021.10</TableCell>
                        <TableCell>
                          システムインテグレータ系の会社 退社
                        </TableCell>
                        <TableCell>
                          プログラマーになりたいと思い、転職活動を開始
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2022.04</TableCell>
                        <TableCell>自作サービス『quitcost』リリース</TableCell>
                        <TableCell>
                          <Link
                            to="https://zenn.dev/ikuma/articles/release-quitcost"
                            target="_blank"
                            className="flex items-center gap-x-1"
                          >
                            <ExternalLink className="w-5 h-5" />
                            リリース記事
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2022.06</TableCell>
                        <TableCell>株式会社エンペイ 入社</TableCell>
                        <TableCell>
                          プログラマーとして入社し、現在に至る
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </section>
              </CollapsibleContent>
            </CardContent>
          </Collapsible>
        </Card>
        <Card>
          <CardHeader className="flex justify-between flex-wrap flex-row items-center">
            <CardTitle className="flex items-center gap-x-2">
              <Megaphone className="h-6 w-6" />
              個人的なお知らせ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <section>
                <CardDescription className="text-sm font-semibold text-muted-foreground">
                  ピックアップ！
                </CardDescription>
                {pinnedInformation && (
                  <AccordionItem
                    key={`${pinnedInformation._id}_pinned`}
                    value={`${pinnedInformation._id}_pinned`}
                  >
                    <AccordionTrigger>
                      <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-4 gap-y-2 items-center">
                        <Badge variant="default">
                          <Time timeString={pinnedInformation.publishedAt} />
                        </Badge>
                        <span className="text-sm font-semibold">
                          {pinnedInformation.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose-sm prose-a:text-blue-700">
                      {parse(pinnedInformation.body)}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </section>
              <section className="mt-8">
                <CardDescription className="text-sm font-semibold text-muted-foreground">
                  最新3件
                </CardDescription>
                {latestInformation.items.map((information) => {
                  return (
                    <AccordionItem
                      key={information._id}
                      value={information._id}
                    >
                      <AccordionTrigger>
                        <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-4 gap-y-2 items-center">
                          <Badge variant="secondary">
                            <Time timeString={information.publishedAt} />
                          </Badge>
                          <span className="text-sm font-semibold">
                            {information.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="prose-sm prose-a:text-blue-700">
                        {parse(information.body)}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </section>
            </Accordion>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <ContentCard
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
            href={`/posts/${latestPost._id}`}
          />
          <ContentCard
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
        <Alert>
          <Coffee className="h-6 w-6 stroke-yellow-800 " />
          <div className="flex justify-between items-center gap-x-2">
            <div className="mt-2">
              <AlertTitle>Buy me a Coffee!</AlertTitle>
              <AlertDescription>
                ドメイン代や自己研鑽のために使わせていただきます！
              </AlertDescription>
            </div>
            <Button variant="outline" asChild size="sm" className="mt-2">
              <Link to="https://www.buymeacoffee.com/ikuma" target="_blank">
                <Coffee className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

const ContentCard = ({
  cardTitle,
  cardDescription,
  backgroundContent,
  title,
  description,
  href,
}: {
  cardTitle: string;
  cardDescription: string;
  backgroundContent:
    | {
        imageUrl: string;
      }
    | {
        emoji: string;
      };
  title: string;
  description: string;
  href: string;
}) => {
  const CardImage = () => {
    if ("imageUrl" in backgroundContent) {
      return (
        <div className="rounded grid place-content-center shadow">
          <img
            src={backgroundContent.imageUrl}
            alt="ogp"
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-full h-40 p-6 rounded grid place-content-center shadow">
        <span className="text-8xl">{backgroundContent.emoji}</span>
      </div>
    );
  };

  return (
    <Tooltip>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link to={href}>
              <ChevronRightCircle className="w-4 h-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CardImage />
          <div className="overflow-auto">
            <TooltipTrigger className="text-left">
              <h3 className="text-md font-bold line-clamp-1">{title}</h3>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{title}</p>
            </TooltipContent>
            <TypographyMuted className="line-clamp-2 mt-2">
              {description}
            </TypographyMuted>
          </div>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

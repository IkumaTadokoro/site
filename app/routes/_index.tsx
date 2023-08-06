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

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ikuma-t.com" },
    { name: "description", content: "移行作業中" },
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

export const loader = async ({ context }: LoaderArgs) => {
  const client = createClient({
    spaceUid: context.env.NEWT_SPACE_UID,
    token: context.env.NEWT_CDN_API_TOKEN,
    apiType: "cdn",
    adapter: fetchAdapter,
  });

  const posts = await client.getFirstContent<Post>({
    appUid: "ikuma-t",
    modelUid: "post",
    query: {
      body: { fmt: "text" },
    },
  });

  return posts;
};

export default function Index() {
  const [isOpen, setIsOpen] = React.useState(false);
  const posts = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  if (!posts) {
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
        <Alert>
          <Megaphone className="h-6 w-6 stroke-yellow-400 " />
          <div className="flex justify-between items-center gap-x-2">
            <div className="mt-2">
              <AlertTitle>登壇情報</AlertTitle>
              <AlertDescription>
                8/25・26 開催の スクラムフェス仙台で登壇します！
              </AlertDescription>
            </div>
            <Button variant="outline" asChild size="sm" className="mt-2">
              <Link
                to="https://confengine.com/conferences/scrum-fest-sendai-2023/proposal/18657"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Alert>
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
        <div className="grid md:grid-cols-2 gap-4">
          <ContentCard
            cardTitle="Blog"
            cardDescription="最新の投稿"
            backgroundContent={{
              emoji: posts.emoji.value,
            }}
            title={posts.title}
            description={posts.body.replace(
              /#|##|###|####|#####|######|\[.*?\]\(.*?\)|\*|-|1.| \| |\n/g,
              " "
            )}
            href={`/posts/${posts._id}`}
          />
          <ContentCard
            cardTitle="Talk"
            cardDescription="最新の登壇"
            backgroundContent={{
              imageUrl: "/ogp.png",
            }}
            title="自分だけの小さなSelenium「Olenium」を作って始める、ブラウザ自動化技術の理論と実践"
            description="Kaigi on Rails 2022で登壇しました。"
            href="/talks"
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
        <div className="w-full h-40 rounded grid place-content-center shadow-sm">
          <img
            src={backgroundContent.imageUrl}
            alt="ogp"
            className="object-cover w-full h-full rounded"
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
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
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
        <CardFooter className="flex justify-end">
          <Button variant="outline" asChild>
            <Link to={href}>
              <ChevronRightCircle className="w-4 h-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </Tooltip>
  );
};

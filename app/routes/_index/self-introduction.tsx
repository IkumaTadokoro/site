import { Link } from "@remix-run/react";
import { ChevronsUpDown, Link2, ExternalLink, Table } from "lucide-react";
import { useState } from "react";
import { Icons } from "~/components/icons";
import { TypographyMuted } from "~/components/typography";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/ui/collapsible";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

export const SelfIntroduction = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/ikuma.png" />
              <AvatarFallback>ikuma-t</AvatarFallback>
            </Avatar>
            <p className="flex md:items-center flex-col md:flex-row gap-x-3 gap-y-1">
              ikuma-t
              <span className="text-zinc-400 text-xs sm:text-sm font-medium">
                いくまてぃー | いくま
              </span>
            </p>
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
                    <TableCell>システムインテグレータ系の会社 入社</TableCell>
                    <TableCell>
                      ERPパッケージ導入コンサルタントとして従事
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2021.10</TableCell>
                    <TableCell>システムインテグレータ系の会社 退社</TableCell>
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
                    <TableCell>プログラマーとして入社し、現在に至る</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};

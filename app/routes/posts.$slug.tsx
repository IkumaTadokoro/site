import { TypographyH2, TypographyMuted } from "~/components/typography";
import {
  Map,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Undo2,
  Link2,
} from "lucide-react";
import type { V2_MetaArgs } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import CategoryBadge from "~/components/category-badge";
import Time from "~/components/time";
import { createClient } from "newt-client-js";
import type { Content } from "newt-client-js";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import type { HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact, Element } from "html-react-parser";
import React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface Post extends Content {
  title: string;
  slug: string;
  body: string;
  category: "tech" | "life" | "idea";
  publishedAt: string;
  updatedAt: string;
}

export const loader = async ({ context, params }: LoaderArgs) => {
  const client = createClient({
    spaceUid: context.env.NEWT_SPACE_UID,
    token: context.env.NEWT_CDN_API_TOKEN,
    apiType: "cdn",
    adapter: fetchAdapter,
  });

  const post = (await client.getFirstContent<Post>({
    appUid: context.env.NEWT_APP_UID,
    modelUid: "post",
    query: {
      and: [
        {
          slug: {
            match: params.slug,
          },
        },
      ],
    },
  })) as Post;

  const nextSibling = await client.getFirstContent<Post>({
    appUid: context.env.NEWT_APP_UID,
    modelUid: "post",
    query: {
      and: [
        {
          publishedAt: {
            gt: post!.publishedAt,
          },
        },
      ],
      order: ["publishedAt"],
    },
  });
  const prevSibling = await client.getFirstContent<Post>({
    appUid: context.env.NEWT_APP_UID,
    modelUid: "post",
    query: {
      and: [
        {
          publishedAt: {
            lt: post!.publishedAt,
          },
        },
      ],
      order: ["-publishedAt"],
    },
  });

  return {
    content: post,
    siblings: {
      prev: prevSibling,
      next: nextSibling,
    },
  };
};

export const meta: V2_MetaFunction<Awaited<ReturnType<typeof loader>>> = ({
  location,
  data,
}: V2_MetaArgs) => {
  const url = new URL(location.pathname, "https://ikuma-t.com");
  const title = data.content.title;
  const htmlExpr = /<("[^"]*"|'[^']*'|[^'">])*>/g;
  const description =
    data.content.body.replace(htmlExpr, "").slice(0, 117) + "...";

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
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:site", content: "@ikumatdkr" },
  ];
};

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.getElementById(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${href}`);
  }
};

export default function PostSlug() {
  const {
    content,
    siblings: { next, prev },
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const tableOfContents: { level: number; title: string; href: string }[] = [];
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.type && domNode.type === "tag" && domNode.name) {
          if (/^h[1-6]$/.test(domNode.name)) {
            const textContent = domToReact(domNode.children, options) as string;
            const encodedContent = encodeURIComponent(textContent);
            const level = parseInt(domNode.name.replace(/\D/g, ""), 10);
            if (level < 4) {
              tableOfContents.push({
                level,
                title: textContent,
                href: encodedContent,
              });
            }
            return React.createElement(
              domNode.name,
              { id: encodedContent },
              <div className="flex items-center gap-x-2">
                <a
                  href={`#${encodedContent}`}
                  className="hover:opacity-80 opacity-20"
                  aria-hidden="true"
                  onClick={(e) => {
                    handleScroll(e, encodedContent);
                  }}
                >
                  <Link2 className="w-5 h-5" />
                </a>
                {textContent}
              </div>
            );
          }
        }
      }
    },
  };
  const body = parse(content.body, options);

  return (
    <div className="grid gap-x-8 gap-y-4">
      <section className="grid gap-2 px-1 py-4">
        <CategoryBadge category={content.category} />
        <TypographyH2>{content.title}</TypographyH2>
        <div className="flex space-x-4 text-xs text-muted-foreground">
          <Time timeString={content.publishedAt} type="createdAt" />
          <Time timeString={content.updatedAt} type="updatedAt" />
        </div>
        <div className="mt-4">
          <TableOfContent tableOfContents={tableOfContents} />
        </div>
        <article className="prose md:prose-base prose-sm prose-a:break-words mt-8 px-1 overflow-hidden">
          {body}
        </article>
      </section>
      <div className="grid gap-y-4">
        <Separator />
        <div className="flex-col md:flex-row flex justify-between items-center gap-x-4 gap-y-2">
          {next && (
            <Button variant="outline" asChild className="w-full md:w-fit">
              <Link to={`/posts/${next.slug}`}>
                <span className="w-64 md:w-48 truncate">{next.title}</span>
                <ChevronLeft className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
          <div className="grow" />
          {prev && (
            <Button variant="outline" asChild className="w-full md:w-fit">
              <Link to={`/posts/${prev.slug}`}>
                <span className="w-64 md:w-48 truncate">{prev.title}</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
        <Button variant="default" asChild>
          <Link to="/posts">
            <Undo2 className="w-4 h-4 mr-2" />
            Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}

const TableOfContent = ({
  tableOfContents,
}: {
  tableOfContents: { level: number; title: string; href: string }[];
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const listStyleClass = (level: number) => {
    switch (level) {
      case 1:
        return "ml-0 mt-2 font-bold text-zinc-900";
      case 2:
        return "ml-0 mt-2 font-bold text-zinc-900";
      case 3:
        return "ml-0 text-zinc-400";
      default:
        return "ml-0";
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <Card>
        <CardHeader className="px-4 py-2">
          <div className="flex items-center justify-between space-x-4">
            <CardTitle className="text-sm md:text-md flex items-center gap-2">
              <Map className="w-6 h-6 text-zinc-800" />
              目次
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CardContent className={isOpen ? "pb-6 px-4" : "pb-0"}>
          <CollapsibleContent>
            {tableOfContents.length > 0 ? (
              <ul className={cn("grid text-sm gap-1")}>
                {tableOfContents.map(({ level, title, href }) => (
                  <li
                    key={href}
                    className={cn(
                      "truncate cursor-pointer hover:opacity-60",
                      listStyleClass(level)
                    )}
                  >
                    <a
                      href={`#${href}`}
                      onClick={(e) => {
                        handleScroll(e, href);
                      }}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <TypographyMuted>目次はありません</TypographyMuted>
            )}
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};

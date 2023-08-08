import ArticleCard from "~/components/article-card";
import { createClient } from "newt-client-js";
import type { Content } from "newt-client-js";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Braces, Lightbulb, Sprout, CircleIcon } from "lucide-react";
import PageTitle from "~/components/page-title";
import EmptyState from "~/components/empty-state";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Blog | ikuma-t.com" },
    {
      name: "description",
      content: "日常や技術的な学びを書き溜めた一覧です。",
    },
    { property: "og:title", content: "Blog" },
    {
      property: "og:description",
      content: "日常や技術的な学びを書き溜めた一覧です。",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://ikuma-t.com/posts" },
    { property: "og:image", content: "https://ikuma-t.com/ogp.png" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:site", content: "@ikumatdkr" },
  ];
};

interface Post extends Content {
  title: string;
  slug: string;
  body: string;
  emoji: {
    type: "emoji";
    value: string;
  };
  category: "tech" | "life" | "idea";
  publishedAt: string;
  updatedAt: string;
}

export const loader = async ({ context }: LoaderArgs) => {
  const client = createClient({
    spaceUid: context.env.NEWT_SPACE_UID,
    token: context.env.NEWT_CDN_API_TOKEN,
    apiType: "cdn",
    adapter: fetchAdapter,
  });

  const posts = await client.getContents<Post>({
    appUid: "ikuma-t",
    modelUid: "post",
    query: {
      body: { fmt: "text" },
      order: ["-publishedAt"],
    },
  });

  return posts;
};

export default function Posts() {
  return (
    <div className="grid gap-x-4 gap-y-4">
      <PageTitle
        title="Blog"
        description="日常や技術的な学びを書き溜めた一覧です"
      />
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">
            All
            <div className="grid grid-cols-2 ml-3">
              <CircleIcon className="h-2 w-2 text-blue-700 fill-blue-700" />
              <CircleIcon className="h-2 w-2 text-yellow-400 fill-yellow-400" />
              <CircleIcon className="h-2 w-2 text-green-700 fill-green-700" />
            </div>
          </TabsTrigger>
          <TabsTrigger value="tech">
            Tech
            <Braces className="w-4 h-4 ml-3 text-blue-700" />
          </TabsTrigger>
          <TabsTrigger value="idea">
            Idea
            <Lightbulb className="w-4 h-4 ml-3 text-yellow-400" />
          </TabsTrigger>
          <TabsTrigger value="life">
            Life
            <Sprout className="w-4 h-4 ml-3 text-green-700" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <FilteredPosts category="all" />
        </TabsContent>
        <TabsContent value="tech">
          <FilteredPosts category="tech" />
        </TabsContent>
        <TabsContent value="idea">
          <FilteredPosts category="idea" />
        </TabsContent>
        <TabsContent value="life">
          <FilteredPosts category="life" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const FilteredPosts = ({
  category,
}: {
  category: "all" | "tech" | "life" | "idea";
}) => {
  const contents = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const filteredPosts =
    category === "all"
      ? contents.items
      : contents.items.filter((content) => content.category === category);

  if (filteredPosts.length === 0) {
    return <EmptyState type="not-found" />;
  }

  return (
    <div className="grid gap-2 px-1">
      {filteredPosts.map((content) => (
        <ArticleCard
          key={content._id}
          slug={content.slug}
          title={content.title}
          body={content.body}
          emoji={content.emoji}
          category={content.category}
          createdAt={content._sys.raw.firstPublishedAt}
          updatedAt={content._sys.raw.publishedAt}
        />
      ))}
    </div>
  );
};

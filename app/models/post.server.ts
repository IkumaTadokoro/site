import type { Content, GetContentsQuery } from "newt-client-js";
import type { NewtClient } from "~/utils/newt.server";
import { createFetchSettings } from "~/utils/newt.server";

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

const POST_MODEL_UID = "post";
const fetchSettings = createFetchSettings(POST_MODEL_UID);

export async function getLatestPosts(client: NewtClient) {
  return await client.getFirstContent<Post>({
    ...fetchSettings,
    query: {
      select: ["slug", "title", "body", "emoji"],
      order: ["-publishedAt"],
      body: { fmt: "text" },
    },
  });
}

export async function getPosts(
  client: NewtClient,
  queryOptions: GetContentsQuery = {}
) {
  return await client.getContents<Post>({
    ...fetchSettings,
    query: {
      ...queryOptions,
    },
  });
}

export async function getPostBySlug(client: NewtClient, slug: Post["slug"]) {
  return await client.getFirstContent<Post>({
    ...fetchSettings,
    query: {
      and: [
        {
          slug: {
            match: slug,
          },
        },
      ],
    },
  });
}

export async function getPost(client: NewtClient, query: GetContentsQuery) {
  return await client.getFirstContent<Post>({
    ...fetchSettings,
    query: {
      ...query,
    },
  });
}

import type { LoaderArgs } from "@remix-run/cloudflare";
import { getPosts } from "~/models/post.server";
import { createDescriptionFromHtml } from "~/utils/content.server";
import { createNewtClient } from "~/utils/newt.server";

export async function loader({ context }: LoaderArgs) {
  const {
    env: { NEWT_CDN_API_TOKEN: token, NEWT_SPACE_UID: spaceUid },
  } = context;
  const client = createNewtClient({ spaceUid, token });
  const posts = (
    await getPosts(client, {
      select: ["title", "body", "slug", "category", "publishedAt"],
      order: ["-publishedAt"],
    })
  ).items.map((post) => {
    return [
      `<item>`,
      `<title>${post.title}</title>`,
      `<pubDate>${post.publishedAt}</pubDate>`,
      `<description><![CDATA[${createDescriptionFromHtml(
        post.body
      )}]]></description>`,
      `<content:encoded><![CDATA[${post.body}]]></content:encoded>`,
      `<link>https://ikuma-t.com/posts/${post.slug}</link>`,
      `<category>${post.category}</category>`,
      `<guid isPermaLink="false">tag:${post.publishedAt}:/${post.slug}#</guid>`,
      `</item>`,
    ].join("");
  });

  const rss = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">`,
    `<channel>`,
    `<title>ikuma-t.com</title>`,
    `<link>https://ikuma-t.com</link>`,
    `<description>プログラマikuma-tの個人サイトです</description>`,
    `<language>ja</language>`,
    ...posts,
    `</channel>`,
    `</rss>`,
  ];

  return new Response(rss.join(""), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

import type { Content, GetContentsQuery } from "newt-client-js";
import { createFetchSettings, type NewtClient } from "~/utils/newt.server";

const TALK_MODEL_UID = "talk";
const fetchSettings = createFetchSettings(TALK_MODEL_UID);

export interface Talk extends Content {
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

export async function getLatestTalks(client: NewtClient) {
  return await client.getFirstContent<Talk>({
    ...fetchSettings,
    query: {
      select: ["_id", "title", "body", "ogp", "eventDate"],
      order: ["-eventDate"],
      body: { fmt: "text" },
    },
  });
}

export async function getTalks(client: NewtClient, query: GetContentsQuery) {
  return await client.getContents<Talk>({
    ...fetchSettings,
    query: {
      ...query,
    },
  });
}

export async function getTalkById(client: NewtClient, id: Talk["_id"]) {
  return await client.getContent<Talk>({
    ...fetchSettings,
    contentId: id,
  });
}

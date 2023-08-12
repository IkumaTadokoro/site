import type { Content } from "newt-client-js";
import { createFetchSettings, type NewtClient } from "~/utils/newt.server";

interface Information extends Content {
  title: string;
  body: string;
  publishedAt: string;
  pinned: boolean;
}

const INFORMATION_MODEL_UID = "information";
const fetchSettings = createFetchSettings(INFORMATION_MODEL_UID);

export async function getLatestInformation(
  client: NewtClient,
  {
    limit = 3,
  }: {
    limit?: number;
  } = {}
) {
  return await client.getContents<Information>({
    ...fetchSettings,
    query: {
      select: ["_id", "title", "body", "publishedAt"],
      limit,
      order: ["-publishedAt"],
    },
  });
}

export async function getPinnedInformation(client: NewtClient) {
  return await client.getFirstContent<Information>({
    ...fetchSettings,
    query: {
      select: ["_id", "title", "body", "publishedAt"],
      and: [{ pinned: true }],
      order: ["-publishedAt"],
    },
  });
}

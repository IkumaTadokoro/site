import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import { createClient } from "newt-client-js";

/**
 * TODO: Remix + Cloudflare Pagesでloader / action以外から環境変数を取得する方法がないため、
 * spaceUidとtokenを引数に取る構成になっています。
 * @see https://github.com/remix-run/remix/discussions/3581
 *
 */
export function createNewtClient({
  spaceUid,
  token,
}: {
  spaceUid: string;
  token: string;
}) {
  return createClient({
    spaceUid: spaceUid,
    token: token,
    apiType: "cdn",
    adapter: fetchAdapter,
  });
}

export type NewtClient = ReturnType<typeof createNewtClient>;
export const NEWT_APP_UID = "ikuma-t";

export function createFetchSettings(modelUid: string) {
  return {
    appUid: NEWT_APP_UID,
    modelUid: modelUid,
  };
}

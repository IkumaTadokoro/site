/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

// TODO: 握りつぶしているだけで型補完は入っていない
interface Env {
  readonly NEWT_CDN_API_TOKEN: string;
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    env: Env;
  }
}

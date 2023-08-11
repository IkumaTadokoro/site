import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./globals.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { TooltipProvider } from "./components/ui/tooltip";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "61580db7a7934661ba589ae566ce5ee2"}'
          ></script>
        )}
      </head>
      <body>
        <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
          <NavBar />
          <main className="container max-w-2xl px-4 py-8 md:py-10">
            <TooltipProvider delayDuration={1}>
              <Outlet />
            </TooltipProvider>
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

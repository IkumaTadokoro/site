import type { V2_MetaFunction } from "@remix-run/cloudflare";
import Footer from "~/components/footer";
import NavBar from "~/components/navbar";
import {
  AWSIcon,
  GoIcon,
  GraphQLIcon,
  JavaScriptIcon,
  MUIIcon,
  RailsIcon,
  ReactIcon,
  RubyIcon,
  TailwindIcon,
  TypeScriptIcon,
  VueIcon,
} from "~/icons";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ikuma-t.com" },
    { name: "description", content: "移行作業中" },
  ];
};

export default function Index() {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <NavBar />
      <div className="container max-w-2xl px-4 py-8 md:py-12 lg:py-16">
        <section className="grid place-content-center place-items-center gap-y-2 my-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800">
            Hi 👋! I'm ikuma-t.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg">
            Tabun... Frontend Engineer
          </p>
        </section>
        <div className="grid gap-12">
          <section className="grid gap-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-800">
              <span className="border-b border-zinc-300">About me</span>
            </h2>
            <div className="grid gap-4 text-zinc-800 text-xs md:text-sm lg:text-md">
              <p>
                都内のFintechスタートアップで働くプログラマです。最近興味があるのは刺繍で、自分でハンカチに動物とか縫えたらいいなと思っています。
              </p>
              <p>
                1年前くらいまではパンをよく焼いていましたが、最近はもっぱらパンケーキを焼いています。豆腐とラムダークをいれるのがこだわりです。
              </p>
            </div>
          </section>
          <section className="grid gap-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-800">
              <span className="border-b border-zinc-300">Technology Stack</span>
            </h2>
            <div className="grid gap-4 text-zinc-800 text-xs md:text-sm lg:text-md">
              <div className="flex gap-2 align-bottom flex-wrap">
                <TypeScriptIcon />
                <JavaScriptIcon />
                <ReactIcon />
                <VueIcon />
                <TailwindIcon />
                <MUIIcon />
                <GraphQLIcon />
                <GoIcon />
                <RubyIcon />
                <RailsIcon />
                <AWSIcon />
              </div>
            </div>
          </section>
          <section className="grid gap-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-zinc-800">
              <span className="border-b border-dotted border-zinc-300">
                Links
              </span>
            </h2>
            <div className="grid gap-4 text-zinc-800 text-xs md:text-sm lg:text-md">
              <ul className="list-disc list-inside">
                <li>
                  <a
                    href="https://twitter.com/ikumatdkr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    X
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/IkumaTadokoro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://bento.me/ikuma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    bento
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

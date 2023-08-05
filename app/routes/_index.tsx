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
import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "@remix-run/react";

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
      <div className="container max-w-2xl px-4 py-8 md:py-10">
        <section className="grid place-content-center place-items-center gap-y-2 my-12 md:my-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800">
            Hi 👋! I'm ikuma-t.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg">
            Tabun... Frontend Engineer
          </p>
        </section>
        <div className="grid gap-12">
          <section className="grid gap-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-800">
              About me
            </h2>
            <div className="grid gap-4 text-zinc-800 text-sm md:text-md">
              <p>
                都内のFintechスタートアップで働くプログラマです。最近興味があるのは刺繍で、自分でハンカチに動物とか縫えたらいいなと思っています。
              </p>
              <p>
                1年前くらいまではパンをよく焼いていましたが、最近はもっぱらパンケーキを焼いています。豆腐とラムダークをいれるのがこだわりです。
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/technology-stack">
                View More
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </section>
          <section className="grid gap-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-800">
              Technology Stack
            </h2>
            <div className="grid gap-4 text-zinc-800 text-sm md:text-md">
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
            <Button variant="outline" asChild>
              <Link to="/technology-stack">
                View More
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

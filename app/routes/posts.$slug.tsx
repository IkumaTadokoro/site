import { TypographyH2 } from "~/components/typography";
import {
  Calendar,
  History,
  ChevronRight,
  Undo2,
  CircleIcon,
} from "lucide-react";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function PostSlug() {
  return (
    <div className="grid gap-x-4 gap-y-4 grid-cols-12 grid-rows-[fit_1fr]">
      <section className="grid gap-2 col-span-12">
        <div className="flex items-center text-xs text-muted-foreground gap-x-1">
          <CircleIcon className="h-3 w-3 fill-sky-400 text-sky-400" />
          TypeScript
        </div>
        <TypographyH2>個人サイトをリニューアルしました！</TypographyH2>
        <div className="flex space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            2023.07.19
          </div>
          <div className="flex items-center">
            <History className="mr-1 h-3 w-3" />
            2023.07.20
          </div>
        </div>
        <article>
          <div className="prose mt-8 prose-p:text-zinc-600">
            <h2>Remixを使って個人サイトをリニューアルしました。</h2>
            <p>
              このサイトは、
              <a href="https://remix.run">Remix</a>
              というフレームワークを使って作られています。
            </p>
            <pre>
              <code className="language-js">
                {`import { Link } from "@remix-run/react";
import { CircleIcon, History, Calendar } from "lucide-react";`}
              </code>
            </pre>
          </div>
        </article>
      </section>
      <div className="grid gap-y-4 col-span-12">
        <Separator />
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link to="/posts">
              前の記事...
              <Undo2 className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/posts">
              次の記事...
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/posts">
            <Undo2 className="w-4 h-4 mr-2" />
            Blog
          </Link>
        </Button>
      </div>
    </div>
  );
}

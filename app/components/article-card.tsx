import { Link } from "@remix-run/react";
import { CircleIcon, History, Calendar } from "lucide-react";

export default function ArticleCard() {
  return (
    <div>
      <Link to="/posts/hoge" className="hover:opacity-60">
        <div className="grid gap-y-2 py-2">
          <div className="flex items-center text-xs text-muted-foreground gap-x-1">
            <CircleIcon className="h-3 w-3 fill-sky-400 text-sky-400" />
            TypeScript
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold leading-none tracking-tight ">
              個人サイトをリニューアルしました！
            </h2>
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
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            Astroでのブログを使っていたのですが、いろいろと不満があったので、Next.jsに移行しました。
          </p>
        </div>
      </Link>
    </div>
  );
}

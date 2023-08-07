import { Link } from "@remix-run/react";
import Time from "./time";
import CategoryBadge from "./category-badge";

type Props = {
  id: string;
  title: string;
  body: string;
  emoji: {
    type: "emoji";
    value: string;
  };
  category: "tech" | "life" | "idea";
  createdAt: string;
  updatedAt: string;
};

export default function ArticleCard({
  id,
  title,
  body,
  emoji,
  category,
  createdAt,
  updatedAt,
}: Props) {
  const markdownExpr =
    /#|##|###|####|#####|######|\[.*?\]\(.*?\)|\*|-|1.| \| |\n/g;

  console.log(emoji);

  return (
    <Link to={id} className="hover:opacity-60">
      <div className="grid md:grid-cols-[80px_1fr] grid-cols-[40px_1fr] gap-x-3 py-2 items-center">
        <div className="bg-white shadow-sm aspect-square w-full rounded-sm grid place-content-center text-xl md:text-4xl">
          {emoji.value}
        </div>
        <div className="grid gap-y-2">
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <CategoryBadge category={category} />
            <Time timeString={createdAt} type="createdAt" />
            <Time timeString={updatedAt} type="updatedAt" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-md sm:text-lg font-semibold leading-6 tracking-tight line-clamp-1">
              {title}
            </h2>
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {body.replace(markdownExpr, "")}
          </p>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "@remix-run/react";
import Time from "./time";
import CategoryBadge from "./category-badge";

type Props = {
  id: string;
  title: string;
  body: string;
  category: "tech" | "life" | "idea";
  createdAt: string;
  updatedAt: string;
};

export default function ArticleCard({
  id,
  title,
  body,
  category,
  createdAt,
  updatedAt,
}: Props) {
  const markdownExpr =
    /#|##|###|####|#####|######|\[.*?\]\(.*?\)|\*|-|1.| \| |\n/g;

  return (
    <div>
      <Link to={id} className="hover:opacity-60">
        <div className="grid gap-y-2 py-2">
          <CategoryBadge category={category} />
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-md sm:text-lg font-semibold leading-none tracking-tight ">
              {title}
            </h2>
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <Time timeString={createdAt} type="createdAt" />
              <Time timeString={updatedAt} type="updatedAt" />
            </div>
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {body.replace(markdownExpr, "")}
          </p>
        </div>
      </Link>
    </div>
  );
}

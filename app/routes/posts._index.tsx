import ArticleCard from "~/components/article-card";
import { TypographyH1, TypographyMuted } from "~/components/typography";

export default function Posts() {
  return (
    <div className="grid gap-x-4 gap-y-4 grid-cols-12 grid-rows-[fit_1fr]">
      <div className="grid gap-2 col-span-12 row-span-1">
        <TypographyH1>Blog</TypographyH1>
        <TypographyMuted>
          日常や技術的な学びを書き溜めた一覧です。
        </TypographyMuted>
      </div>
      <div className="grid gap-2 col-span-12 md:col-span-12">
        {Array.from({ length: 10 }).map((_, i) => (
          <ArticleCard key={i}></ArticleCard>
        ))}
      </div>
    </div>
  );
}

import { Construction, Dices, Gamepad2, Wrench } from "lucide-react";
import { TypographyLead, TypographyMuted } from "./typography";

type Props = {
  type: "maintenance" | "not-found";
};

export default function EmptyState({ type }: Props) {
  switch (type) {
    case "maintenance":
      return (
        <div className="p-12 md:p-20 grid gap-8 place-content-center place-items-center grid-cols-2 w-full mx-auto border-2 border-yellow-400 rounded-md border-dashed">
          <Construction className="h-12 w-12 text-muted-foreground animate-bounce" />
          <Wrench className="h-12 w-12 text-muted-foreground animate-bounce" />
          <TypographyLead className="font-semibold col-span-2">
            こちらのページは現在メンテナンス中です
          </TypographyLead>
          <TypographyMuted className="col-span-2">
            ページが完成するまでお待ちください
          </TypographyMuted>
        </div>
      );
    case "not-found":
      return (
        <div className="p-12 md:p-20 grid gap-8 place-content-center place-items-center grid-cols-2 w-full mx-auto border-2 border-slate-200 rounded-md border-dashed">
          <Dices className="h-12 w-12 text-muted-foreground animate-bounce" />
          <Gamepad2 className="h-12 w-12 text-muted-foreground animate-bounce" />
          <TypographyLead className="font-semibold col-span-2 text-center">
            該当する記事がありませんでした
          </TypographyLead>
          <TypographyMuted className="col-span-2">
            条件を変えて再度お試しください
          </TypographyMuted>
        </div>
      );
    default:
      return null;
  }
}

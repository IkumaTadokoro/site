import { CircleIcon } from "lucide-react";
import { cn } from "~/lib/utils";

type Props = {
  category: "tech" | "life" | "idea";
};

export default function CategoryBadge({ category }: Props) {
  const categoryColorClass = () => {
    switch (category) {
      case "tech":
        return "text-blue-700 fill-blue-700";
      case "life":
        return "text-green-700 fill-green-700";
      case "idea":
        return "text-yellow-400 fill-yellow-400";
    }
  };

  return (
    <div className="flex items-center text-xs text-muted-foreground gap-x-1">
      <CircleIcon className={cn(categoryColorClass(), "h-3 w-3")} />
      {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
    </div>
  );
}

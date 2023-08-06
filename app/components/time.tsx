import { Calendar, History } from "lucide-react";

type Props = {
  timeString: string;
  type?: "createdAt" | "updatedAt";
};

export default function Time({ timeString, type }: Props) {
  switch (type) {
    case "createdAt":
      return (
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          <BasicTime timeString={timeString} />
        </div>
      );
    case "updatedAt":
      return (
        <div className="flex items-center">
          <History className="mr-1 h-3 w-3" />
          <BasicTime timeString={timeString} />
        </div>
      );
    default:
      return <BasicTime timeString={timeString} />;
  }
}

const BasicTime = ({ timeString }: Props) => {
  return (
    <time dateTime={timeString}>
      {new Date(timeString)
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".")}
    </time>
  );
};

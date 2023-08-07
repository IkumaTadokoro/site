import { Tally1, Tally2, Tally3, Tally4, Tally5 } from "lucide-react";
import { cn } from "~/lib/utils";

type Props = {
  number: number;
};

export default function TallyIcon({ number }: Props) {
  const maxTally = 5;
  const quotient = Math.floor(number / maxTally);
  const remainder = number % maxTally;
  const tallyIconClass = "w-5 aspect-square";

  const RemainderTallyIcon = () => {
    switch (remainder) {
      case 1:
        return <Tally1 className={cn(tallyIconClass, "stroke-green-500")} />;
      case 2:
        return <Tally2 className={cn(tallyIconClass, "stroke-green-600")} />;
      case 3:
        return <Tally3 className={cn(tallyIconClass, "stroke-green-700")} />;
      case 4:
        return <Tally4 className={cn(tallyIconClass, "stroke-green-800")} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: quotient }).map((_, index) => {
        return (
          <Tally5
            key={index}
            className={cn(tallyIconClass, "stroke-green-900")}
          />
        );
      })}
      <RemainderTallyIcon />
    </div>
  );
}

import { Link } from "@remix-run/react";
import { TypographyMuted } from "~/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const LatestContentCard = ({
  cardTitle,
  cardDescription,
  backgroundContent,
  title,
  description,
  href,
}: {
  cardTitle: string;
  cardDescription: string;
  backgroundContent:
    | {
        imageUrl: string;
      }
    | {
        emoji: string;
      };
  title: string;
  description: string;
  href: string;
}) => {
  const CardImage = () => {
    if ("imageUrl" in backgroundContent) {
      return (
        <div className="rounded grid place-content-center shadow">
          <img
            src={backgroundContent.imageUrl}
            alt="ogp"
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-full h-40 p-6 rounded grid place-content-center shadow">
        <span className="text-8xl">{backgroundContent.emoji}</span>
      </div>
    );
  };

  return (
    <Tooltip>
      <Card className="hover:brightness-90">
        <Link to={href}>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription>{cardDescription}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CardImage />
            <div className="overflow-auto">
              <TooltipTrigger className="text-left">
                <h3 className="text-md font-bold line-clamp-1">{title}</h3>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{title}</p>
              </TooltipContent>
              <TypographyMuted className="line-clamp-2 mt-2">
                {description}
              </TypographyMuted>
            </div>
          </CardContent>
        </Link>
      </Card>
    </Tooltip>
  );
};

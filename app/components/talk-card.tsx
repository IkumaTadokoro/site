import { Link } from "@remix-run/react";
import Time from "./time";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Award } from "lucide-react";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  eventDate: string;
  eventName: string;
};

export default function TalkCard({
  id,
  title,
  imageUrl,
  eventDate,
  eventName: eventTitle,
}: Props) {
  return (
    <Link to={id} className="flex">
      <Card className="flex flex-col hover:brightness-50">
        <CardContent className="grid gap-4 px-0 pb-0">
          <img
            src={imageUrl}
            alt="ogp"
            className="object-contain rounded-t-lg"
          />
        </CardContent>
        <CardHeader className="p-4 grow">
          <CardTitle className="leading-7 text-md">{title}</CardTitle>
        </CardHeader>
        <CardFooter className="p-4 pt-0 grid gap-y-4">
          <div className="flex flex-wrap gap-2 justify-between text-xs text-muted-foreground items-center">
            <p className="flex items-center gap-x-1">
              <Award className="w-3 h-3" />
              {eventTitle}
            </p>
            <Time timeString={eventDate} type="createdAt" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

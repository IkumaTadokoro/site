import { Megaphone } from "lucide-react";
import Time from "~/components/time";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "~/components/ui/card";
import type {
  getLatestInformation,
  getPinnedInformation,
} from "~/models/information.server";
import parse from "html-react-parser";

export const Information = ({
  pinnedInformation,
  latestInformation,
}: {
  latestInformation: Awaited<ReturnType<typeof getLatestInformation>>;
  pinnedInformation: Awaited<ReturnType<typeof getPinnedInformation>>;
}) => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-wrap flex-row items-center">
        <CardTitle className="flex items-center gap-x-2">
          <Megaphone className="h-6 w-6" />
          個人的なお知らせ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <section>
            <CardDescription className="text-sm font-semibold text-muted-foreground">
              ピックアップ！
            </CardDescription>
            {pinnedInformation && (
              <AccordionItem
                key={`${pinnedInformation._id}_pinned`}
                value={`${pinnedInformation._id}_pinned`}
              >
                <AccordionTrigger>
                  <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-4 gap-y-2 items-center">
                    <Badge variant="default">
                      <Time timeString={pinnedInformation.publishedAt} />
                    </Badge>
                    <span className="text-sm font-semibold">
                      {pinnedInformation.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="prose-sm prose-a:text-blue-700">
                  {parse(pinnedInformation.body)}
                </AccordionContent>
              </AccordionItem>
            )}
          </section>
          <section className="mt-8">
            <CardDescription className="text-sm font-semibold text-muted-foreground">
              最新3件
            </CardDescription>
            {latestInformation.items.map((information) => {
              return (
                <AccordionItem key={information._id} value={information._id}>
                  <AccordionTrigger>
                    <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-4 gap-y-2 items-center">
                      <Badge variant="secondary">
                        <Time timeString={information.publishedAt} />
                      </Badge>
                      <span className="text-sm font-semibold">
                        {information.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose-sm prose-a:text-blue-700">
                    {parse(information.body)}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </section>
        </Accordion>
      </CardContent>
    </Card>
  );
};

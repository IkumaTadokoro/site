import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { Link } from "@remix-run/react";
import { Newspaper, Presentation, Info } from "lucide-react";

export default function NavBar() {
  return (
    <header className="shadow-sm">
      <div className="max-w-full md:max-w-3xl py-3 mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ikuma.png" />
                      <AvatarFallback>ikuma-t</AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[250px] md:w-[400px] lg:w-[450px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="flex gap-2 items-center mb-4">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/ikuma.png" />
                                <AvatarFallback>IT</AvatarFallback>
                              </Avatar>
                              <div className="text-lg font-semibold">
                                ikuma-t
                              </div>
                            </div>
                            <p className="text-xs leading-tight text-muted-foreground">
                              フロントエンドとWeb標準が好きなエンジニアです！
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/about" title="自己紹介">
                        わたしについて
                      </ListItem>
                      <ListItem href="/technology-stack" title="技術スタック">
                        プライベート・個人での使用技術スタックについて
                      </ListItem>
                      <ListItem href="/sns" title="SNS">
                        SNSアカウント一覧
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
          <li>
            <Navigation />
          </li>
        </ul>
      </div>
    </header>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navigation = () => {
  return (
    <TooltipProvider delayDuration={1}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/posts">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex flex-row gap-2">
                      <Newspaper className="h-5 w-5" />
                      <span className="hidden md:inline">Blog</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={20}>
                    <p>ブログです！</p>
                  </TooltipContent>
                </Tooltip>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/talks">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex flex-row gap-2">
                      <Presentation className="h-5 w-5" />
                      <span className="hidden md:inline">Talks</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={20}>
                    <p>登壇資料です！</p>
                  </TooltipContent>
                </Tooltip>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex flex-row gap-2">
                      <Info className="h-5 w-5" />
                      <span className="hidden md:inline">Info</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={20}>
                    <p>個人的なお知らせです！</p>
                  </TooltipContent>
                </Tooltip>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </TooltipProvider>
  );
};

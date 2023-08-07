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
import { Newspaper, Presentation, VenetianMask } from "lucide-react";
import { Badge } from "./ui/badge";

export default function NavBar() {
  return (
    <header className="shadow-sm">
      <div className="max-w-full md:max-w-5xl py-3 mx-auto px-2">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/">
              <Avatar className="h-8 w-8 hover:opacity-70">
                <AvatarImage src="/ikuma.png" />
                <AvatarFallback>ikuma-t</AvatarFallback>
              </Avatar>
            </Link>
          </li>
          <li className="grow" />
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
            <NavigationMenuTrigger>
              <div className="flex flex-row gap-2">
                <VenetianMask className="h-5 w-5" />
                <span className="hidden md:inline">About</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[220px] md:w-[400px] lg:w-[450px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-2">
                  <NavigationMenuLink className="grid place-content-center place-items-center h-full gap-2 rounded-md bg-gradient-to-r from-yellow-200 to-yellow-400 p-3 no-underline outline-none focus:shadow-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ikuma.png" />
                      <AvatarFallback>IT</AvatarFallback>
                    </Avatar>
                    <Badge className="bg-yellow-600">ikuma-t</Badge>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/" title="自己紹介">
                  わたしについて
                </ListItem>
                <ListItem href="/tech-stack" title="技術スタック">
                  プライベート・個人での使用技術スタックについて
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
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
        </NavigationMenuList>
      </NavigationMenu>
    </TooltipProvider>
  );
};

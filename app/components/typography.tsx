import { cn } from "~/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-xl md:text-3xl font-bold tracking-tight transition-colors first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyLead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

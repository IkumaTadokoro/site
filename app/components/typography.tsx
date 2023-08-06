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

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 pb-2 text-xl md:text-3xl font-bold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyLead({ children }: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

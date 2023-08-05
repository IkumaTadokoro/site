type TypographyProps = {
  children: React.ReactNode;
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
    <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyLead({ children }: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

export function TypographyMuted({ children }: TypographyProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

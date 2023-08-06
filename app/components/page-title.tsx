import { TypographyH1, TypographyMuted } from "./typography";

type Props = {
  title: string;
  description: string;
};

export default function PageTitle({ title, description }: Props) {
  return (
    <div className="grid gap-2 row-span-1">
      <TypographyH1>{title}</TypographyH1>
      <TypographyMuted>{description}</TypographyMuted>
    </div>
  );
}

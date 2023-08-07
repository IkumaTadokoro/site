import EmptyState from "~/components/empty-state";
import PageTitle from "~/components/page-title";

export default function TechStack() {
  return (
    <div className="grid gap-x-4 gap-y-4">
      <PageTitle
        title="Tech Stack"
        description="使用している技術スタックです"
      />
      <EmptyState type="maintenance" />
    </div>
  );
}

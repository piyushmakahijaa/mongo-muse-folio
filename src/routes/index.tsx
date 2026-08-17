import { createFileRoute } from "@tanstack/react-router";
import { Workspace } from "@/components/mongo/Workspace";

const title = "Piyush Makhija — Full-Stack Developer, APIs & Applied AI";
const description =
  "Portfolio of Piyush Makhija, built as a live MongoDB console: browse projects, skills and experience as documents, or query them from the shell.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Workspace />;
}

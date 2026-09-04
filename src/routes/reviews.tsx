import { createFileRoute, redirect } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";

export const Route = createFileRoute("/reviews")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      replace: true,
    });
  },
});


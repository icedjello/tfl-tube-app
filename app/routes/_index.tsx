import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TFL Tube App" },
    {
      name: "description",
      content: "Check TFL tube statuses, lines and branches.",
    },
  ];
};

export default function Index() {
  return <div></div>;
}

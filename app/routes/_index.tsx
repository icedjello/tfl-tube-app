import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllStatuses } from "~/data/getAllStatuses";

export const meta: MetaFunction = () => {
  return [
    { title: "TFL Tube App" },
    {
      name: "description",
      content: "Check TFL tube statuses, lines and branches.",
    },
  ];
};

export const loader = async () => {
  const data = await getAllStatuses();
  console.log(data);
  return json({ lines: data });
};

export default function Index() {
  const { lines } = useLoaderData<typeof loader>();
  console.log(lines);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Lines</h1>
    </>
  );
}

import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import LineNav from "~/components/LineNavs";
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
  const allStatuses = await getAllStatuses();
  if (!allStatuses) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ allStatuses });
};

export default function Index() {
  const { allStatuses } = useLoaderData<typeof loader>();

  return (
    <>
      <h2 className="font-sans flex justify-center md:justify-normal md:pl-2">
        Select a line for branch, station & status details.
      </h2>
      <nav>
        <ul className="grid md:grid-cols-2 gap-4">
          {allStatuses.map(({ name, id, lineStatuses }) => (
            <LineNav
              key={id}
              lineId={id}
              lineName={name}
              lineStatuses={lineStatuses}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}

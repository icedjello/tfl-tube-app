import { json, type MetaFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
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
      <h1 className="text-3xl font-bold underline">Lines</h1>
      <nav>
        <ul>
          {allStatuses.map(({ name, id, lineStatuses }) => {
            const severityDescription = lineStatuses
              .map((ls) => ls.statusSeverityDescription)
              .join(", ");

            return (
              <li key={id}>
                <NavLink to={`/${id}`}>
                  {name} - {severityDescription}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

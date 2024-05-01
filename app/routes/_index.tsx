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
  const data = await getAllStatuses();
  return json({ lines: data });
};

export default function Index() {
  const { lines } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Lines</h1>
      <nav>
        <ul>
          {lines.map((line) => {
            return (
              <li key={line.id}>
                <NavLink to={`/${line.id}`}>
                  {line.name} -{" "}
                  {line.lineStatuses
                    .map((ls) => ls.statusSeverityDescription)
                    .join(", ")}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

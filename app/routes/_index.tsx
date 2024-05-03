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
  console.log(allStatuses);
  return (
    <>
      <nav>
        <ul>
          {allStatuses.map(({ name, id, lineStatuses }) => {
            const severityDescription = lineStatuses
              .map((ls) => ls.statusSeverityDescription)
              .join(", ");

            return (
              <li key={id}>
                <NavLink to={`/${id}`}>
                  <div
                    className={
                      "rounded border-2 border-neutral-800 px-4 py-2 m-2" +
                      ` ${id}`
                    }
                  >
                    <h3>
                      {name} - {severityDescription}
                    </h3>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getLineStatus } from "~/data/getLineStatus";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.lineId, "Missing lineId param");
  const { lineId } = params;
  const lineStatus = await getLineStatus(lineId);

  return json({ lineStatus });
};

export default function LineDetails() {
  const { lineStatus } = useLoaderData<typeof loader>();

  return (
    <>
      {/* <h2>Line: {}</h2> */}
      <ol>
        {lineStatus.map((status) =>
          status.lineStatuses.map((ls) => (
            <ul key={ls.id}>
              <p className="font-bold">{ls.statusSeverityDescription}</p>
              <p>{ls.reason}</p>
            </ul>
          ))
        )}
      </ol>
    </>
  );
}

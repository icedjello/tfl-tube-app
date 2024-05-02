import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Branch from "~/components/Branch";
import { getLine } from "~/data/getLine";
import { getLineStatus } from "~/data/getLineStatus";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lineId } = params;
  invariant(lineId, "Missing lineId param");

  const lineStatus = await getLineStatus(lineId);
  const line = await getLine(lineId);

  if (!line || !lineStatus) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ lineStatus, line });
};

export default function LineDetails() {
  const { lineStatus, line } = useLoaderData<typeof loader>();

  return (
    <>
      <h2>Line: {line.lineName}</h2>
      <ol>
        {lineStatus.map((status) =>
          status.lineStatuses.map((ls) => (
            <ul key={`line-status-${ls.id}`}>
              <p className="font-bold">{ls.statusSeverityDescription}</p>
              <p>{ls.reason}</p>
            </ul>
          ))
        )}
      </ol>
      {line.stopPointSequences.map((line) => {
        return (
          <Branch
            key={`branch${line.branchId}-${line.stopPoint.at(0)?.id}`}
            {...line}
          />
        );
      })}
    </>
  );
}

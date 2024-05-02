import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getLine } from "~/data/getLine";
import { getLineStatus } from "~/data/getLineStatus";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.lineId, "Missing lineId param");
  const { lineId } = params;
  const lineStatus = await getLineStatus(lineId);
  const line = await getLine(lineId);

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

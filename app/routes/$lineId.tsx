import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Branch from "~/components/Branch";
import Card from "~/components/Card";
import { getLine } from "~/data/getLine";
import { getLineStatus } from "~/data/getLineStatus";
import lineColors from "~/utils/lineColors";
import severityColors from "~/utils/severityColors";

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

  const severity = Math.min(
    ...lineStatus.flatMap((status) =>
      status.lineStatuses.map((ls) => ls.statusSeverity)
    )
  );

  const lineName = `${line.lineName} Line`;

  const severityReason = lineStatus[0].lineStatuses[0];

  const lineStatusText = severityReason.reason
    ? severityReason.reason.replace(`${lineName}: `, "")
    : severityReason.statusSeverityDescription;

  const colors = lineColors[line.lineId];

  return (
    <>
      <Card styles={`${colors.bg} ${colors.text}`}>
        <h2
          className={
            "text-3xl md:text-4xl font-bold flex justify-center md:justify-normal mb-3 md:mb-4"
          }
        >
          {lineName}
        </h2>

        <Card styles={`${severityColors[severity - 1]}`}>
          <h3 className="font-sans">{lineStatusText}</h3>
        </Card>
        {line.stopPointSequences.map((line) => {
          return (
            <Branch
              key={`${line.branchId}}
              }`}
              {...line}
            />
          );
        })}
      </Card>
    </>
  );
}

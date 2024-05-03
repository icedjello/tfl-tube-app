import { NavLink } from "@remix-run/react";
import { LineStatus } from "~/data/getAllStatuses";
import lineColors from "~/utils/lineColors";
import severityColors from "~/utils/severityColors";
import Card from "./Card";

type Props = {
  lineName: string;
  lineId: string;
  lineStatuses: LineStatus[];
};

export default function LineNav({ lineName, lineId, lineStatuses }: Props) {
  let severityDescription = "";
  let severityNumber = Number.POSITIVE_INFINITY;

  lineStatuses.forEach(({ statusSeverity, statusSeverityDescription }) => {
    if (statusSeverity < severityNumber) {
      severityDescription = statusSeverityDescription;
      severityNumber = statusSeverity;
    }
  });
  const colors = lineColors[lineId];

  return (
    <li>
      <NavLink to={`/${lineId}`}>
        <Card styles={`${colors.bg} ${colors.text}`}>
          <span className="flex flex-row md:flex-row-reverse">
            <h3>{lineName}</h3>
            <div
              className={`rounded-3xl border self-center w-4 h-4 ml-2 md:mr-2 ${
                severityColors[severityNumber - 1]
              } ${colors.border}`}
            ></div>
          </span>
          <p>{severityDescription}</p>
        </Card>
      </NavLink>
    </li>
  );
}

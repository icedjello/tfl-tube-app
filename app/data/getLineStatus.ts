type LineStatus = {
  id: number;
  lineId: string;
  statusSeverity: number;
  statusSeverityDescription: string;
  reason: string;
  created: Date;
  disruption: Disruption;
};

type Disruption = {
  $type: string;
  category: string;
  categoryDescription: string;
  description: string;
  affectedRoutes: unknown[];
  affectedStops: unknown[];
  closureText: string;
};

export type Status = {
  $type: string;
  id: string;
  name: string;
  modeName: string;
  disruptions: unknown[];
  created: Date;
  modified: Date;
  lineStatuses: LineStatus[];
};

export async function getLineStatus(lineId: string) {
  const response = await fetch(`https://api.tfl.gov.uk/line/${lineId}/status`, {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new TypeError("getLineStatus didn't get a JSON!");
  }
  const data = await response.json();
  return data as Status[];
}

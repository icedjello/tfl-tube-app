export interface LineAndStatus {
  $type: string;
  id: string;
  name: string;
  modeName: ModeName;
  disruptions: unknown[];
  created: Date;
  modified: Date;
  lineStatuses: LineStatus[];
  routeSections: unknown[];
  serviceTypes: ServiceType[];
  crowding: Crowding;
}

export interface Crowding {
  $type: string;
}

export interface LineStatus {
  $type: string;
  id: number;
  statusSeverity: number;
  statusSeverityDescription: StatusSeverityDescription;
  created: Date;
  validityPeriods: ValidityPeriod[];
  lineId?: string;
  reason?: string;
  disruption?: Disruption;
}

export interface Disruption {
  $type: string;
  category: string;
  categoryDescription: string;
  description: string;
  affectedRoutes: unknown[];
  affectedStops: unknown[];
  closureText: string;
}

export enum StatusSeverityDescription {
  GoodService = "Good Service",
  MinorDelays = "Minor Delays",
}

export interface ValidityPeriod {
  $type: string;
  fromDate: Date;
  toDate: Date;
  isNow: boolean;
}

export enum ModeName {
  Tube = "tube",
}

export interface ServiceType {
  $type: string;
  name: Name;
  uri: string;
}

export enum Name {
  Night = "Night",
  Regular = "Regular",
}

export async function getAllStatuses() {
  const fetchModeStatus = (mode: string) =>
    fetch(`https://api.tfl.gov.uk/line/mode/${mode}/status`, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

  const allResponses = await Promise.all([
    fetchModeStatus("overground"),
    fetchModeStatus("tube"),
    fetchModeStatus("elizabeth-line"),
  ]);

  // const contentType = response.headers.get("content-type");
  // if (!contentType || !contentType.includes("application/json")) {
  //   throw new TypeError("Oops, we haven't got JSON!");
  // }

  const data = (
    await Promise.all(allResponses.map((r) => r.json()))
  ).flat() as LineAndStatus[];

  return data.sort((a, b) => {
    const aMinSeverity = Math.min(
      ...a.lineStatuses.map(({ statusSeverity }) => statusSeverity)
    );
    const bMinSeverity = Math.min(
      ...b.lineStatuses.map(({ statusSeverity }) => statusSeverity)
    );
    return aMinSeverity - bMinSeverity;
  });
}

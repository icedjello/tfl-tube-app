export interface Status {
  $type: string;
  id: string;
  name: string;
  modeName: string;
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
  lineId: string;
  statusSeverity: number;
  statusSeverityDescription: string;
  reason: string;
  created: Date;
  validityPeriods: ValidityPeriod[];
  disruption: Disruption;
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

export interface ValidityPeriod {
  $type: string;
  fromDate: Date;
  toDate: Date;
  isNow: boolean;
}

export interface ServiceType {
  $type: string;
  name: string;
  uri: string;
}

export async function getLineStatus(lineId: string) {
  const response = await fetch(`https://api.tfl.gov.uk/line/${lineId}/status`);
  const data = (await response.json()) as Status[];
  return data;
}

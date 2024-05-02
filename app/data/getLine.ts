export interface LineDetails {
  $type: string;
  lineId: LineID;
  lineName: LineName;
  direction: Direction;
  isOutboundOnly: boolean;
  mode: Mode;
  lineStrings: string[];
  stations: Station[];
  stopPointSequences: StopPointSequence[];
  orderedLineRoutes: OrderedLineRoute[];
}

export enum Direction {
  Outbound = "outbound",
}

export enum LineID {
  Northern = "northern",
}

export enum LineName {
  Northern = "Northern",
}

export enum Mode {
  Bus = "bus",
  Dlr = "dlr",
  ElizabethLine = "elizabeth-line",
  InternationalRail = "international-rail",
  NationalRail = "national-rail",
  Overground = "overground",
  Tube = "tube",
}

export interface OrderedLineRoute {
  $type: string;
  name: string;
  naptanIds: string[];
  serviceType: ServiceType;
}

export enum ServiceType {
  Regular = "Regular",
}

export interface Station {
  $type: string;
  stationId?: string;
  icsId: string;
  topMostParentId?: string;
  modes: Mode[];
  stopType: StopType;
  zone: string;
  lines: Line[];
  status: boolean;
  id: string;
  name: string;
  lat: number;
  lon: number;
  hasDisruption?: boolean;
  parentId?: string;
}

export interface Line {
  $type: string;
  id: string;
  name: string;
  uri: string;
  type: Type;
  crowding: Crowding;
  routeType: RouteType;
  status: RouteType;
}

export interface Crowding {
  $type: string;
}

export enum RouteType {
  Unknown = "Unknown",
}

export enum Type {
  Line = "Line",
}

export enum StopType {
  NaptanMetroStation = "NaptanMetroStation",
  TransportInterchange = "TransportInterchange",
}

export interface StopPointSequence {
  $type: string;
  lineId: LineID;
  lineName: LineName;
  direction: Direction;
  branchId: number;
  nextBranchIds: number[];
  prevBranchIds: number[];
  stopPoint: Station[];
  serviceType: ServiceType;
}

export async function getLine(lineId: string) {
  const response = await fetch(
    `https://api.tfl.gov.uk/line/${lineId}/route/sequence/outbound`,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = (await response.json()) as LineDetails;
  return data;
}

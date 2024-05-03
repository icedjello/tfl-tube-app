type Line = {
  id: string;
  name: string;
  uri: string;
};

export type Station = {
  stationId?: string;
  icsId: string;
  zone: string;
  lines: Line[];
  id: string;
  name: string;
};

type StopPointSequence = {
  lineId: string;
  lineName: string;
  branchId: number;
  stopPoint: Station[];
};

export type LineDetails = {
  lineId: string;
  lineName: string;
  stations: Station[];
  stopPointSequences: StopPointSequence[];
};

export async function getLine(lineId: string) {
  const response = await fetch(
    `https://api.tfl.gov.uk/line/${lineId}/route/sequence/outbound`,
    {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }
  );
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new TypeError("getLine didn't get a JSON!");
  }
  const data = (await response.json()) as LineDetails;
  return data;
}

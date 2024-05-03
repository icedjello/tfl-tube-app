export type LineAndStatus = {
  id: string;
  name: string;
  lineStatuses: LineStatus[];
};

export type LineStatus = {
  id: number;
  statusSeverity: number;
  statusSeverityDescription: string;
  lineId?: string;
  reason?: string;
};

export async function getAllStatuses() {
  const fetchModeStatus = (mode: string) =>
    fetch(`https://api.tfl.gov.uk/line/mode/${mode}/status`, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

  // dropping overground & elizabeth-line because complexity
  const allResponses = await Promise.all([
    // fetchModeStatus("overground"),
    fetchModeStatus("tube"),
    // fetchModeStatus("elizabeth-line"),
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

import { Station } from "../data/getLine";
import Card from "./Card";

type Props = {
  stopPoint: Station[];
};

export default function Branch({ stopPoint }: Props) {
  const beginningAndEnd = `${stopPoint?.at(0)?.name} & ${
    stopPoint.at(-1)?.name
  }`.replaceAll("Underground Station", "");

  return (
    <Card styles="my-4 bg-neutral-100 text-neutral-950">
      <h3 className={"pb-2 justify-self-start"}>Between: {beginningAndEnd}</h3>
      <ol className="pl-2 justify-self-start">
        {stopPoint.map(
          (
            sp,
            i // see below...
          ) => (
            <li className="font-sans" key={`${i}`}>
              {sp.name}
            </li>
          )
        )}
      </ol>
    </Card>
  );
}

// I know it's wrong to use `i` for a `key`.
// But three hours is three hours.
// If the page was more expensive I wouldn't do this.
// The performance-hit in this case is quite negligible
// because you have to refresh to get new data anyway.

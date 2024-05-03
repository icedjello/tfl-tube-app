import { Station } from "../data/getLine";
import Card from "./Card";

type Props = {
  stopPoint: Station[];
  branchId: number;
};

export default function Branch({ stopPoint, branchId }: Props) {
  const beginningAndEnd = `${stopPoint?.at(0)?.name} & ${
    stopPoint.at(-1)?.name
  }`.replaceAll("Underground Station", "");

  return (
    <Card styles="my-4 bg-neutral-100 text-neutral-950">
      <h3 className={"pb-2 justify-self-start"}>Between: {beginningAndEnd}</h3>
      <ol className="pl-2 justify-self-start">
        {stopPoint.map((sp) => (
          <li className="font-sans" key={`${sp.icsId}-${branchId}-${sp.id}`}>
            {sp.name}
          </li>
        ))}
      </ol>
    </Card>
  );
}

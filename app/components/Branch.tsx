import { Station } from "../data/getLine";

type Props = {
  stopPoint: Station[];
  branchId: number;
};

export default function Branch({ stopPoint, branchId }: Props) {
  const beginningAndEnd = `${stopPoint?.at(0)?.name} - ${
    stopPoint.at(-1)?.name
  }`;

  return (
    <>
      <br />
      <h3>{beginningAndEnd}</h3>
      <ol>
        {stopPoint.map((sp) => {
          return <li key={`${branchId}--${sp.id}`}>{sp.name}</li>;
        })}
      </ol>
    </>
  );
}

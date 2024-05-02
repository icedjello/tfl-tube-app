import { StopPointSequence } from "../data/getLine";

export default function Branch(props: StopPointSequence) {
  return (
    <>
      <br />
      <h3 className="font-bold text-xl">
        {props.stopPoint?.at(0)?.name} - {props.stopPoint.at(-1)?.name}
      </h3>
      <ol>
        {props.stopPoint.map((sp) => (
          <li key={sp.id}>{sp.name}</li>
        ))}
      </ol>
    </>
  );
}

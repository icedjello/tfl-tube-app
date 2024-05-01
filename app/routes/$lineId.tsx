import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.lineId, "Missing lineId param");
  const { lineId } = params;
  return json({ lineId });
};

export default function LineDetails() {
  const { lineId } = useLoaderData<typeof loader>();
  return (
    <>
      <h2>Line: {lineId}</h2>
    </>
  );
}

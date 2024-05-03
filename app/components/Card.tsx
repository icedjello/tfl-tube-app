import { PropsWithChildren } from "react";

type Props = {
  styles?: string;
} & PropsWithChildren;

export default function Card({ styles = "", children }: Props) {
  return (
    <div
      className={`grid justify-items-center md:justify-items-start rounded-2xl border border-neutral-800 py-4 px-6 drop-shadow w-full ${styles}`}
    >
      {children}
    </div>
  );
}

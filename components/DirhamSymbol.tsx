import * as React from "react";

type DirhamSymbolProps = {
  className?: string;
  title?: string;
};

export default function DirhamSymbol({ className, title = "UAE Dirham" }: DirhamSymbolProps) {
  return (
    <span
      aria-hidden="true"
      title={title}
      className={["inline-block align-middle leading-none", className].filter(Boolean).join(" ")}
      style={{ fontSize: "0.95em" }}
    >
      د.إ
    </span>
  );
}

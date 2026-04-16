import * as React from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={["relative w-full", className].filter(Boolean).join(" ")}>
      <div className="mx-auto w-full max-w-7xl px-6">{children}</div>
    </section>
  );
}

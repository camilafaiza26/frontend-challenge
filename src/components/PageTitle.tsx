import React from "react";

type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="text-2xl font-bold text-center text-black m-8">{title}</h1>
  );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  goBack?: boolean;
};

export default function Button({
  text,
  className,
  goBack,
  ...rest
}: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (goBack) {
      router.back();
    }
  };

  const buttonClasses =
    "py-2 rounded font-bold tracking-wide focus:outline-none";

  const buttonStyle =
    rest.type === "submit"
      ? `${buttonClasses} bg-blue-500 text-white hover:bg-blue-600`
      : `${buttonClasses} border border-neutral-200`;

  return (
    <button
      className={`${buttonStyle} ${className}`}
      {...rest}
      onClick={goBack ? handleClick : rest.onClick}
    >
      {text}
    </button>
  );
}

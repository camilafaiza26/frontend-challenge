import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full mt-8">
      <Image src="/images/icon/loader.svg" alt="Loader" width={80} height={80} />
      <span className="text-gray-600 text-lg">Loading...</span>
    </div>
  );
}

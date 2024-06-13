import React from "react";
import Image from "next/image";
import BrandLogo from "./BrandLogo";

export default function HeaderMenu() {
  return (
    <header>
      <nav className="bg-white shadow-md p-4 px-6 flex justify-between items-center">
        <BrandLogo />
        <div className="flex items-center space-x-4 mr-6">
          <Image
            src="/images/Photo Profile.svg"
            alt="Profile Photo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="font-medium"> Cooper Rosser</p>
          <Image
            src="/images/icon/expand_more.svg"
            alt="Expand more"
            width={11}
            height={5}
          />
        </div>
      </nav>
    </header>
  );
}

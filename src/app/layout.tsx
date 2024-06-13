import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import HeaderMenu from "../components/HeaderMenu";
import LeftMenu from "../components/LeftMenu";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Order Management",
  description: "CRUD of Order Management",
};

const menuItems = [
  {
    text: "Order Management",
    icon: "/images/icon/assignment.svg",
    path: "/order-management",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col w-full bg-gray-100`}>
        <HeaderMenu />
        <div className="flex">
          <LeftMenu menuItems={menuItems} />
          <div className="flex flex-col w-full">
            <div className="mx-8 mt-2"> {children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

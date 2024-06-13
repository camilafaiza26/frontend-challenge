"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = {
  text: string;
  icon: string;
  path: string;
};

type LeftMenuProps = {
  menuItems: MenuItem[];
};

export default function LeftMenu({ menuItems }: LeftMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="bg-[#052A49] text-white h-auto w-72 flex flex-col justify-between">
      <div className="mt-6">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-2 hover:bg-[#084577] hover:cursor-pointer transition-colors duration-300 ease-in-out ${
                pathname.startsWith(item.path)
                  ? "bg-[#084577] border-l-2 border-white"
                  : ""
              }`}
              onClick={() => handleClick(item.path)}
            >
              <Image
                src={item.icon}
                alt={item.text}
                width={20}
                height={20}
                className="m-2"
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <hr className="border-gray-300 mb-10" />
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div>
              <Image
                src="/images/icon/email.svg"
                alt="Email Icon"
                width={16}
                height={16}
              />
            </div>

            <div className="ml-4 text-neutral-200">Support</div>
          </div>
          <div className="flex items-center">
            <div style={{ width: "16px", height: "16px" }}></div>
            <div className="ml-4 text-neutral-200">cs@bosnet.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

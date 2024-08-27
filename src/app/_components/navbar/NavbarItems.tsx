"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BaseCollapser,
  BaseCollapserHeader,
  BaseCollapserContent,
} from "../collapser/Collapser";

type Props = {
  navbarItems: NavbarItem[];
  bgColor?: string;
  textColor?: string;
  bgHover?: string;
  className?: string;
  selectedItem?: () => void;
};

export const NavbarItems: FC<Props> = ({
  navbarItems,
  bgColor = "#fff",
  bgHover = "#fff",
  textColor = "",
}) => {
  const patthname = usePathname();
  const [items, setItems] = useState<NavbarItem[]>(navbarItems);

  const clickOnHeader = (i: number): void => {
    items[i].isOpen = !items[i].isOpen;
    setItems([...items]);
  };

  return (
    <>
      <div className="w-full w-[250px]">
        <div className="m-auto text-gray-500 py-3 my-2 sm:my-20 w-11/12 ">
          {items.map((item: NavbarItem, index: number) => {
            const isActive = patthname === item.href;
            if (item.children) {
              return (
                <BaseCollapser key={index}>
                  <BaseCollapserHeader
                    id={index}
                    isOpen={item.isOpen}
                    clickOnHeader={(e) => clickOnHeader(e)}
                  >
                    <div className="flex items-center justify-between rounded-lg px-4 text-sm my-4 cursor-pointer">
                      <span className=""> {item.title}</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        className={`transition-all duration-500 rotate-180 ${
                          item.isOpen ? "rotate-0" : ""
                        }`}
                      >
                        <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path>
                      </svg>
                    </div>
                  </BaseCollapserHeader>
                  <BaseCollapserContent id={index}>
                    <div className="px-4 text-sm rounded-lg last:mb-2">
                      {item.children &&
                        item.children.map((i: NavbarItem, index: number) => {
                          const x = patthname === i.href;
                          return (
                            <Link
                              key={`BaseCollapserContent-${index}`}
                              className={`transition-colors rounded-lg px-4 w-full cursor-pointer text-sm block cursor-pointer mb-2 py-3 ${
                                x &&
                                "text-blue-400 bg-[#4096ff] text-sm text-white"
                              }`}
                              href={i.href}
                            >
                              {i.title}
                            </Link>
                          );
                        })}
                    </div>
                  </BaseCollapserContent>
                </BaseCollapser>
              );
            } else {
              return (
                <div className="w-full" key={`navigation-${item.href}`}>
                  <Link
                    className={`transition-colors rounded-lg px-4 w-full cursor-pointer text-sm block py-3 ${
                      isActive &&
                      "text-blue-400 bg-[#4096ff] text-sm text-white"
                    }`}
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

"use client";

import { FC, useEffect, useState } from "react";
import { NavbarItems } from "./NavbarItems";
import Image from "next/image";

type Props = {
  navbarItems: NavbarItem[];
  bgColor?: string;
  textColor?: string;
  bgHover?: string;
  className?: string;
  selectedItem?: () => void;
};

export const Navbar: FC<Props> = ({ navbarItems }) => {
  const [isNavClose, setIsNavClose] = useState<boolean>(false);

  const openCloseNav = (): void => {
    setIsNavClose(!isNavClose);
  };

  const handelClick = (e: MouseEvent): void => {
    const el = (e.target as HTMLInputElement).id;
    if (el == "openNavbarIcon") setIsNavClose(false);
  };

  useEffect(() => {
    document.addEventListener("click", handelClick);
    return () => document.removeEventListener("click", handelClick);
  }, []);

  return (
    <>
      <div
        className={`bg-white overflow-hidden h-screen  border-l-2 ${
          isNavClose ? "w-[0] transition-[width] duration-400" : "w-[250px]"
        } `}
      >
        <div
          className="text-rose-600 text-2xl text-left pl-6 pt-4 sm:hidden cursor-pointer"
          id="closeNavbarIcon"
          onClick={openCloseNav}
        >
          x
        </div>
        <div className="flex justify-center items-center mt-20">
          <Image
            src="/images/default.jpg"
            width={150}
            height={150}
            alt="logo"
          />
        </div>
        <NavbarItems
          navbarItems={navbarItems}
          bgColor=""
          bgHover=""
          textColor=""
          className=""
          selectedItem={() => console.log()}
        />
      </div>
    </>
  );
};

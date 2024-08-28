"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { NavbarItems } from "./NavbarItems";
import Image from "next/image";

type Props = {
  navbarItems: NavbarItem[];
  containerClass?: string;
  containerItemsClass?: string;
  itemClass?: string;
  iconsClass?: string;
  activeItemClass?: string;
  logoAddress: string;
  logoWidth?: number;
  logoHieght?: number;

  selectedItem?: () => void;
};

export const Navbar: FC<Props> = ({
  navbarItems,
  containerClass = "bg-black",
  containerItemsClass = "bg-white text-gray-500",
  itemClass = "hover:bg-[#309fff] hover:text-white text-gray-500 hover:fill-white fill-gray-500",
  activeItemClass = "bg-[#301fff] text-white",
  iconsClass = "",
  logoAddress,
  logoWidth = 150,
  logoHieght = 150,
}) => {

  const [isNavClose, setIsNavClose] = useState<boolean>(false);

  const openCloseNav = (): void => {
    setIsNavClose(!isNavClose);
  };

  const handelClick = useCallback((e: MouseEvent): void => {
    const el = (e.target as HTMLInputElement).id;
    if (el == "openNavbarIcon") setIsNavClose(false);
  }, []);
  useEffect(() => {
    document.addEventListener("click", handelClick);
    return () => document.removeEventListener("click", handelClick);
  }, [handelClick]);

  return (
    <>
      <div
        className={`bg-white  h-screen  border-l-2 overflow-y-auto ${
          isNavClose
            ? "w-[0] border-l-0 transition-[width] duration-400"
            : "w-[292px]"
        } ${containerClass}`}
      >
        <div
          className="text-rose-600 text-2xl text-left pl-6 pt-4 sm:hidden cursor-pointer"
          id="closeNavbarIcon"
          onClick={openCloseNav}
        >
          x
        </div>
        <div className="flex justify-center items-center mt-10">
          <Image
            src={logoAddress}
            width={logoWidth}
            height={logoHieght}
            alt="logo"
          />
        </div>
        <NavbarItems
          navbarItems={navbarItems}
          containerItemsClass={containerItemsClass}
          itemClass={itemClass}
          iconsClass={iconsClass}
          activeItemClass={activeItemClass}
          selectedItem={() => console.log("gggggg")}
        />
      </div>
    </>
  );
};

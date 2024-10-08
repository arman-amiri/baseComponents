"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { NavbarItems } from "./navbarItems";

type Props = {
  navbarItems: NavbarItem[];
  containerClass?: string;
  containerItemsClass?: string;
  itemClass?: string;
  iconsClass?: string;
  activeItemClass?: string;
  logo?: React.ReactNode;

  selectedItem?: (item: Item) => void;
};

export const Navbar: FC<Props> = ({
  navbarItems,
  containerClass = "bg-black",
  containerItemsClass = "bg-white text-gray-500",
  itemClass = "hover:bg-[#309fff] hover:text-white text-gray-500 hover:fill-white fill-gray-500",
  activeItemClass = "bg-[#301fff] text-white",
  iconsClass = "",
  logo,
  selectedItem,
}) => {
  const [isNavClose, setIsNavClose] = useState<boolean>(false);

  const handelClick = useCallback((e: MouseEvent): void => {
    const el = (e.target as HTMLInputElement).id;
    const svgEl = ((e.target as HTMLInputElement).parentNode as SVGAElement).id;
    console.log(svgEl, "svgEl");
    if (el == "navbar-item" && window.innerWidth < 640) setIsNavClose(true);
    if (el == "darkLayoutNavbar") setIsNavClose(!isNavClose);
    if (
      el == "openCloseNavbarFromHeader" ||
      svgEl == "openCloseNavbarFromHeader"
    ) {
      setIsNavClose((old) => (old = !old));
      console.log(7);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handelClick);
    return () => document.removeEventListener("click", handelClick);
  }, [handelClick]);

  // const onClick = (e: any) => {
  //   if (e.key !== "exit") {
  //     startTransition(() => {
  //       router.push(e.key);
  //     });
  //   } else signOut();
  //   // console.log("click ", e);
  // };


  // const signOut = async () => {
  //   try {
  //     ("use server");
  //     await logOut();
  //     Cookies.remove("accessToken");
  //     Cookies.remove("refreshToken");
  //     router.push(`${logout_uri}api/auth/logout`);
  //   } catch (error) {
  //     router.push(`${logout_uri}api/auth/logout`);
  //   }
  // };
  return (
    <>
      {!isNavClose && (
        <div
          className="fixed w-100 h-screen  min-w-full z-10 sm:hidden"
          id="darkLayoutNavbar"
        ></div>
      )}
      <div
        className={`bg-white fixed top-0 z-40 h-screen sm:static  border-l-2 overflow-y-auto w-[292px] transition-all ${
          isNavClose
            ? "-right-80 border-l-0 transition-all  duration-500 ease-in-out"
            : "right-0 transition-all duration-500 ease-in-out"
        } ${containerClass}`}
      >
        {/* <div
          className="text-rose-600 text-2xl text-left pl-6 pt-4 sm:hidden cursor-pointer"
          id="closeNavbarIcon"
          onClick={openCloseNav}
        >
          x
        </div> */}
        <div></div>
        <div className="flex w-full justify-center items-center  ">
          {/* <Image
            src={logoAddress}
            width={logoWidth}
            height={logoHieght}
            alt="logo"
          /> */}
          {logo}
        </div>
        <NavbarItems
         navbarItems={navbarItems}
          containerItemsClass={containerItemsClass}
          itemClass={itemClass}
          iconsClass={iconsClass}
          activeItemClass={activeItemClass}
          selectedItem={selectedItem}
        />
      </div>
    </>
  );
};

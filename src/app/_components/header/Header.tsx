"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";

export const Header: FC = () => {
  // const handelClick = useCallback((e: MouseEvent) => {
  //   const el = (e.target as HTMLInputElement).id;
  //   if (el == "closeNavbarIcon") setShow(true);
  //   if (el == "openNavbarIcon") setShow(false);
  // }, []);
  // useEffect(() => {
  //   document.addEventListener("click", handelClick);
  //   return () => document.removeEventListener("click", handelClick);
  // }, [handelClick]);

  return (
    <>
      <div
        className={`fixed z-50 w-full bg-black text-white  h-16 px-4 cursor-pointer flex items-center sm:hidden`}
      >
        <div
          className={`inline-block sm:hidden p-2`}
          id="openCloseNavbarFromHeader"
        >
          <FiMenu
            id="openCloseNavbarFromHeader"
            className="font-black text-3xl"
          />
        </div>
      </div>
    </>
  );
};

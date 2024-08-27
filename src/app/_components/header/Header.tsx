"use client";

import React, { FC, useEffect, useState } from "react";

export const Header: FC = () => {
  const [show, setShow] = useState(false);

  const handelClick = (e: MouseEvent) => {
    const el = (e.target as HTMLInputElement).id;
    if (el == "closeNavbarIcon") setShow(true);
    if (el == "openNavbarIcon") setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handelClick);
    return () => document.removeEventListener("click", handelClick);
  }, []);
  
  return (
    <>
      <div
        className={`absolute w-full bg-black text-white text-left h-16 px-4 cursor-pointer flex justify-end items-center sm:hidden ${
          show ? "" : "h-0 transition-[height] duration-400"
        } `}
      >
        <span
          id="openNavbarIcon"
          className={`inline-block rotate-90 ${show ? "" : "hidden"}`}
        >
          |||
        </span>
      </div>
    </>
  );
};

"use client";

import React, { FC } from "react";
import { FiMenu } from "react-icons/fi";

export const Header: FC = () => {
  return (
    <>
      <div
        className={`absolute z-30 w-full bg-black text-white  h-16 px-4 cursor-pointer flex items-center sm:hidden`}
      >
        <div
          className={`inline-block sm:hidden p-2`}
          id="openCloseNavbarFromHeader"
        >
          <FiMenu
            id="openCloseNavbarFromHeader"
            className="font-black text-4xl"
          />
        </div>
      </div>
    </>
  );
};

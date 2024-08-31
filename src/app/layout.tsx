"use client";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { Header } from "./_components/header";
import { Navbar } from "./_components/navbar";
import { ArrowUp } from "./_components/svg-icons/arrowUp";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

const iransans = localFont({
  src: [
    {
      path: "../../public/fonts/iransans/IRANSansWeb(FaNum).woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/iransans/IRANSansWeb(FaNum)_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/iransans/IRANSansWeb(FaNum)_Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/iransans/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/iransans/IRANSansWeb(FaNum)_Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: NavbarItem[] = [
    { label: " اصلی", key: "/" },
    {
      label: "گزارشات",
      key: "/report",
      children: [
        { label: "منو یک", key: "/test" },
        { label: "منو دو", key: "/test1" },
      ],
      iconComponent: <ArrowUp />,
    },

    {
      label: "گزارشات",
      key: "/report",
      children: [
        { label: "منو یک", key: "/test" },
        { label: "منو دو", key: "/test1" },
      ],
    },

    { label: "راهنما", key: "/test6" },
  ];
  return (
    <html dir="rtl" className={`${figtree.variable} ${iransans.variable}`}>
      <body> 
        <Header />
        <div className="flex">
         
          <Navbar
            navbarItems={items}
            // containerClass="absolute"
            // containerItemsClass=""
            // itemClass=""
            // activeItemClass=""
            // iconsClass=""
            // logoWidth={}
            // logoHieght={}
            selectedItem={(item : Item) => console.log(item)}
          />
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}

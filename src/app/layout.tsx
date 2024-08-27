import { Figtree } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { Header } from "./_components/header";
import { Navbar } from "./_components/navbar";

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
  let items = [
    { title: "صفحه اصلی", href: "/" },
    {
      title: "گزارشات",
      href: "/report",
      children: [
        { title: "منو یک", href: "/test" },
        { title: "منو دو", href: "/test1" },
      ],
    },
    { title: "صدور", href: "/test5", isOpen: false },
    {
      title: "تنظیمات",
      href: "/settings",
      isOpen: false,
      children: [
        { title: "منو یک", href: "/test2" },
        { title: "منو دو", href: "/test3" },
      ],
    },
    { title: "راهنما", href: "/test6", isOpen: false },
  ];
  return (
    <html dir="rtl" className={`${figtree.variable} ${iransans.variable}`}>
      <body>
        <div className="flex">
          <Header />
          <Navbar
            navbarItems={items}
            bgColor=""
            bgHover=""
            textColor=""
            className=""
            // selectedItem={() => console.log()}
          />
          <div className="w-full"> {children}</div>
        </div>
      </body>
    </html>
  );
}

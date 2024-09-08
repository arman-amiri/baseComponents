"use client";

import { title } from "process";
import InputSearch from "./_components/search-box/InputSearch";
import SearchBox from "./_components/search-box/InputSearch";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    {
      value: "11111",
      name: "بازرس 1",
      position: "بازرس شعبه مرکزی",
      codeVahed: 1,
      phone: "091265987456",
    },
    {
      value: "11113",
      name: "بازرس 3",
      position: "بازرس شعبه بیهقی",
      codeVahed: 2,
      phone: "091259787456",
    },
    {
      value: "66ae33ddf49896b24e177425",
      name: "بازرس 32",
      position: "کاربر گزارشی بازرس یار",
      codeVahed: 3,
      phone: "091296247456",
    },
    {
      value: "669f5973eaf17d3c9868d37e",
      name: "بازرس 1",
      position: "کاربر بازرس یار",
      codeVahed: 4,
      phone: "091265989124",
    },
    {
      value: "66ae33ddf49896b24e177426",
      name: "بازرس 14",
      position: "کاربر بازرس یار",
      codeVahed: 4,
      phone: "091265989124",
    },
    {
      value: "66ae33ddf49896b24e177427",
      name: "بازرس 32",
      position: "کاربر بازرس یار",
      codeVahed: 4,
      phone: "091265989124",
    },
    {
      value: "66ae33ddf49896b24e177428",
      name: "بازرس 19",
      position: "کاربر بازرس یار",
      codeVahed: 4,
      phone: "091265989124",
    },
    {
      value: "66ae33ddf49896b24e177429",
      name: "بازرس 11",
      position: "کاربر بازرس یار",
      codeVahed: 4,
      phone: "091265989124",
    },
    {
      value: "66ae33ddf49896b24e177430",
      name: "بازرس 8",
      position: "کاربر بازرس یار",
      codeVahed: 4,
      phone: "091265989124",
    },
  ]);

  const selectedItem = [{ id: "2", title: "title" }];

  const handelOnChange = (inputValue: string) => {
    console.log(inputValue, "onChange handelOnChange");
    if (inputValue.length > 2)
      setItems([
        {
          value: "66ae33ddf49896b24e177430",
          name: "بازرس 99",
          position: "کاربر بازرس یار",
          codeVahed: 4,
          phone: "091265989124",
        },
      ]);
    else
      setItems([
        {
          value: "66ae33ddf49896b24e177430",
          name: "بازرس 77",
          position: "کاربر بازرس یار",
          codeVahed: 4,
          phone: "091265989124",
        },
      ]);
  };
  return (
    <div className="flex">
      <section className="flex flex-auto justify-center items-center bg-gray-100 min-h-screen">
        <div className="w-96">
          <InputSearch
            items={items}
            selected={{
              value: "66ae33ddf49896b24e177430",
              name: "بازرس 8",
            }}
            onChange={handelOnChange}
            onSelect={(selected) => console.log(selected, "selected")}
          />
        </div>
      </section>
    </div>
  );
}

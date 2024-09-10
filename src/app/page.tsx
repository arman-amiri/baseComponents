"use client";

import { InputSearch } from "./_components/search-box/InputSearch";
// import SearchBox from "./_components/search-box/InputSearch";
import { memo, useDeferredValue, useState } from "react";
import mockData from "../../mock/data.json";

interface Item {
  name: string;
  value: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedItem = [{ id: "2", title: "title" }];

  const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

  const handelOnChange = async (inputValue: string) => {
    setLoading(true);

    try {
      await delay(1000).then(() => {
        const { data } = mockData;
        const result = data.filter((item: Item) =>
          item.name.includes(inputValue)
        );
        setItems(result);
      });
    } catch (error) {
      console.error(error, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <section className="flex flex-auto justify-center items-center bg-gray-100 min-h-screen">
        <div className="w-96">
          <InputSearch
            uniqeKey="gg"
            items={items}
            selected={{
              value: "66ae33ddf49896b24e177430",
              name: "بازرس 8",
            }}
            placeholder={"جستجو بازرس"}
            loading={loading}
            debounceTime={500}
            onChange={handelOnChange}
            showItemCount={10}
            // itemClass=""
            // inputClass=""
            // containerClass=""
            onSelect={(selected) => console.log(selected, "selected")}
          />
        </div>
      </section>
    </div>
  );
}

"use client";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import { debounce } from "lodash";
import { IoMdClose } from "react-icons/io";

interface Props {
  items: {
    value: string;
    name: string;
    position: string;
    codeVahed: number;
    phone: string;
  }[];

  selected: { value: string; name: string };
  onChange: (inputValue: string) => void;
  onSelect: (selected: string) => void;
}

const InputSearch: FC<Props> = (props) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const [localStorageHistory, setLocalStorageHistory] = useState<any>([]);
  const [resultSearch, setResultSearch] = useState<any>(props.items);
  const debouncedSearch = useRef(
    debounce(async (value) => {
      props.onChange(value);
    }, 400)
  ).current;


  const [form, setForm] = useState<any>({
    name: props.selected.name,
  });

  const handelRemoveInputValue = () => {
    setForm({ name: "" });
    props.onSelect("");
  };

  const handelShowSearchBox = () => {
    setShowSearchBox(true);
    handelFirstContentSearch();
    const html: any = document.getElementById("html");
    html.classList.add("stop-scrolling");
  };

  const handelCloseSearchBox = () => {
    setShowSearchBox(false);
    const html: any = document.getElementById("html");
    html.classList.remove("stop-scrolling");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSearch(value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!form.name) {
    }
    setResultSearch(props.items);
    document.addEventListener("click", handleMouseClick);
    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  }, [form, props.items]);

  const handelFirstContentSearch = () => {
    const searchHistory: any = localStorage.getItem("searchHistory");
    const x = JSON.parse(searchHistory);
    setLocalStorageHistory(x);
  };

  const handelSaveSearchInLocalStorage = (inputValue: any) => {
    props.onSelect(inputValue);
    setForm({
      name: inputValue.name,
    });

    let searchHistory: any = localStorage.getItem("searchHistory");
    if (!searchHistory) {
      localStorage.setItem("searchHistory", JSON.stringify([inputValue]));
    } else {
      const x: any = JSON.parse(searchHistory);
      var index = x.findIndex((item: any) => item.name == inputValue.name);

      if (index == -1) {
        x.unshift(inputValue);
        localStorage.setItem("searchHistory", JSON.stringify(x));
      } else {
        x.splice(index, 1);
        x.unshift(inputValue);
        localStorage.setItem("searchHistory", JSON.stringify(x));
      }
    }
  };

  const handleMouseClick = (event: any) => {
    const elId = event.target.id;

    if (
      elId != "searchInput" &&
      elId != "searchBtn" &&
      elId != "removeOldSearch"
    ) {
      setShowSearchBox(false);
      const html: any = document.getElementById("html");
      html.classList.remove("stop-scrolling");
    }
  };

  const removeOldSearchFromLocalStorage = (e: any, item: any, index: any) => {
    e.stopPropagation();
    e.preventDefault();

    let searchHistory: any = localStorage.getItem("searchHistory");
    const x: any = JSON.parse(searchHistory);
    x.splice(index, 1);
    setLocalStorageHistory([...x]);
    localStorage.setItem("searchHistory", JSON.stringify(x));
  };

  return (
    <>
      <div className="flex flex-row-reverse desktop:flex-row items-center w-full desktop:p-0 rounded relative border-b desktop:border-b-0">
        {form.name && (
          <span onClick={handelRemoveInputValue}>
            <IoMdClose className="absolute left-2 top-3 cursor-pointer hover:text-red-600" />
          </span>
        )}
        <input
          id="searchInput"
          type="text"
          name="name"
          placeholder="جستجو"
          className={`w-full py-2 px-1 outline-none rounded border border-cyan-700 cursor-pointer ${
            showSearchBox ? "bg-white desktop:border" : "bg-stone-100"
          }`}
          onClick={handelShowSearchBox}
          value={form.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
        />

        {showSearchBox && (
          <div
            id="searchBox"
            className="desktop:w-full bg-white absolute left-0 right-0 top-12 desktop:top-10 z-50 border max-h-80 overflow-y-scroll"
          >
            {resultSearch && !!resultSearch?.length && !loading && (
              <div className="flex flex-col p-4">
                {resultSearch.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handelSaveSearchInLocalStorage(item)}
                    >
                      <div className="flex justify-between items-center py-4 px-2 border-b last:border-0 cursor-pointer hover:bg-slate-200 hover:rounded">
                        <div>
                          <div className="text-stone-600">{item.name}</div>
                          <div className="flex gap-1 text-stone-400 text-sm">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!resultSearch?.length &&
              !!localStorageHistory?.length &&
              !loading && (
                <div>
                  {localStorageHistory.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handelSaveSearchInLocalStorage(item)}
                      >
                        <div className="flex justify-between items-center py-6 px-2 border-b last:border-0 cursor-pointer bg-slate-100">
                          <div className="flex gap-1 items-center">
                            <div className="text-stone-600 text-sm">
                              {item.name}
                            </div>
                          </div>
                          <div
                            id="removeOldSearch"
                            className="flex gap-1 text-stone-600 text-xs p-2"
                            onClick={(e) =>
                              removeOldSearchFromLocalStorage(e, item, index)
                            }
                          >
                            <span className="icon-close" id="removeOldSearch">
                              <IoMdClose />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            {!resultSearch?.length &&
              !localStorageHistory?.length &&
              !loading && (
                <div className="py-6">
                  <div className="text-stone-500 px-4">بیشترین جستجو‌ها</div>
                  <div className="flex flex-row flex-wrap px-4 mt-4 text-stone-400">
                    <div className="border px-4 py-2 rounded border-stone-400 w-full">
                      عنوان یک
                    </div>
                  </div>
                </div>
              )}

            {loading && (
              <div>
                <div className="flex flex-col items-center justify-center w-full py-6">
                  <div className="icon-spinner1 animate-spin text-2xl	text-[#FF5C39]"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showSearchBox && (
        <div
          className="fixed bg-[#00000042] z-40 desktop:top-40 left-0 overscroll-none"
          onClick={handelCloseSearchBox}
        ></div>
      )}
    </>
  );
};

export default InputSearch;

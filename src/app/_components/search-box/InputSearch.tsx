"use client";

import { debounce } from "lodash";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

interface Props {
  items: Item[];
  selected?: Item;
  loading: boolean;
  placeholder: string;
  debounceTime?: number;
  showItemCount?: number;
  itemClass?: string;
  inputClass?: string;
  containerClass?: string;
  onSelect?: (selected: Item) => void;
  onChange?: (inputValue: string) => void;
}

interface Item {
  name: string;
  value: string;
}

export const InputSearch: FC<Props> = (props) => {
  const {
    loading,
    placeholder,
    showItemCount = 5,
    items,
    debounceTime = 350,
    itemClass,
    inputClass,
    containerClass,
  } = props;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [resultSearch, setResultSearch] = useState<Item[]>(items);
  const [localStorageHistory, setLocalStorageHistory] = useState<Item[]>([]);
  const debouncedSearch = useRef(
    debounce(async (value: string) => {
      props.onChange!(value);
    }, debounceTime)
  ).current;

  const [form, setForm] = useState<Omit<Item, "value">>({
    name: props.selected?.name || "",
  });

  const handelRemoveInputValue = () => {
    setForm({ name: "" });
    props.onSelect!({ name: "", value: "" });
  };

  const handelShowSearchBox = () => {
    setShowSearchBox(true);
    handelFirstContentSearch();
    const html: HTMLElement | null = document.getElementById("html");
    html?.classList.add("stop-scrolling");
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
    setResultSearch(items.slice(0, showItemCount));
    document.addEventListener("click", handleMouseClick);
    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  }, [items, showItemCount]);

  const handelFirstContentSearch = () => {
    const searchHistory: string = localStorage.getItem("searchHistory") || "";
    const x = JSON.parse(searchHistory).slice(0, showItemCount);
    setLocalStorageHistory(x);
  };

  const handelSaveSearchInLocalStorage = (item: Item) => {
    setShowSearchBox(false);
    props.onSelect!(item);
    setForm({
      name: item.name,
    });

    let searchHistory: string = localStorage.getItem("searchHistory") || "";
    if (!searchHistory) {
      localStorage.setItem("searchHistory", JSON.stringify([item]));
    } else {
      const x: Item[] = JSON.parse(searchHistory);
      var index = x.findIndex((i: Item) => i.name == item.name);

      if (index == -1) {
        x.unshift(item);
        localStorage.setItem("searchHistory", JSON.stringify(x));
      } else {
        x.splice(index, 1);
        x.unshift(item);
        localStorage.setItem("searchHistory", JSON.stringify(x));
      }
    }
  };

  const handleMouseClick = (event: MouseEvent) => {
    const elId = (event.target as HTMLInputElement).id;

    if (
      elId != "searchInput" &&
      elId != "searchBtn" &&
      elId != "removeOldSearch"
    ) {
      setShowSearchBox(false);
      const html: HTMLElement | null = document.getElementById("html");
      html?.classList.remove("stop-scrolling");
    }
  };

  const removeOldSearchFromLocalStorage = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    let searchHistory: string = localStorage.getItem("searchHistory") || "";
    const x: Item[] = JSON.parse(searchHistory);
    x.splice(index, 1);
    setLocalStorageHistory([...x]);
    localStorage.setItem("searchHistory", JSON.stringify(x));
  };

  return (
    <>
      <div
        className={`flex flex-row-reverse items-center w-full  rounded relative border-b  ${containerClass}`}
      >
        <MainInput
          loading={loading}
          form={form}
          inputClass={`w-full py-2 px-1 outline-none rounded  cursor-pointer ${inputClass}`}
          placeholder={placeholder}
          showSearchBox={showSearchBox}
          handelShowSearchBox={handelShowSearchBox}
          handleOnChange={handleOnChange}
          handelRemoveInputValue={handelRemoveInputValue}
        />
        {showSearchBox && (
          <div
            id="searchBox"
            className="bg-white absolute left-0 right-0 top-8 rounded-b-md  shadow-md z-30  max-h-80 overflow-auto transition-all "
          >
            {form.name != "" && (
              <ResultSearch
                form={form}
                itemClass={itemClass}
                resultSearch={resultSearch}
                loading={loading}
                handelClickOnItem={handelSaveSearchInLocalStorage}
              />
            )}

            <History
              localStorageHistory={localStorageHistory}
              form={form}
              itemClass={itemClass}
              handelClickOnItem={handelSaveSearchInLocalStorage}
              removeOldSearchFromLocalStorage={(event, index) =>
                removeOldSearchFromLocalStorage(event, index)
              }
            />

            <NotFound resultSearch={resultSearch} form={form} />
          </div>
        )}
      </div>
    </>
  );
};

function MainInput(props: {
  loading: boolean;
  placeholder: string;
  inputClass?: string;
  showSearchBox: boolean;
  form: Omit<Item, "value">;
  handelShowSearchBox: () => void;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handelRemoveInputValue: () => void;
}) {
  return (
    <>
      {props.form.name && !props.loading && (
        <span onClick={props.handelRemoveInputValue}>
          <IoMdClose className="absolute left-2 top-3 cursor-pointer hover:text-red-600" />
        </span>
      )}
      {props.loading && (
        <div className="absolute left-2">
          <div className="flex flex-col items-center justify-center w-full py-6">
            <div className="icon-spinner1 animate-spin text-base	text-[#494949]">
              <AiOutlineLoading3Quarters />
            </div>
          </div>
        </div>
      )}
      <input
        id="searchInput"
        type="text"
        name="name"
        autoComplete="off"
        placeholder={props.placeholder}
        className={props.inputClass}
        onClick={props.handelShowSearchBox}
        value={props.form.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          props.handleOnChange(event)
        }
      />
    </>
  );
}

function ResultSearch(props: {
  form: Omit<Item, "value">;
  itemClass?: string;
  resultSearch: Item[];
  loading: boolean;
  handelClickOnItem: (item: Item) => void;
}) {
  if (
    props.form.name != "" &&
    props.resultSearch &&
    !!props.resultSearch?.length
  )
    return (
      <div
        className={`flex flex-col p-1 pb-5 transition-all`}
        style={{
          opacity: props.loading ? 0.5 : 1,
          transition: props.loading
            ? "opacity 0.2s 0.2s linear"
            : "opacity 0s 0s linear",
        }}
      >
        {props.resultSearch.map((item: Item, index: number) => {
          return (
            <ItemSection
              item={item}
              key={index}
              itemClass={props.itemClass}
              handelClickOnItem={props.handelClickOnItem}
            />
          );
        })}
      </div>
    );
}

function ItemSection(props: {
  item: Item;
  itemClass?: string;
  handelClickOnItem: (item: Item) => void;
}) {
  return (
    <>
      {/* py-2 px-2  last:border-0 cursor-pointer hover:bg-slate-200 hover:rounded text-sm text-stone-600 */}
      <div
        className={` flex justify-between items-center py-1 px-1 hover:bg-slate-200 cursor-pointer  text-stone-600 ${props.itemClass}`}
        onClick={() => props.handelClickOnItem(props.item)}
      >
        {props.item.name}
      </div>
    </>
  );
}

function NotFound(props: { resultSearch: Item[]; form: Omit<Item, "value"> }) {
  if (props.form.name && props.resultSearch.length == 0)
    return (
      <>
        <div className="text-xs py-2 px-1 text-gray-400">
          نتیجه ای یافت نشد برای :{" "}
          <span className="text-sm text-gray-500">{`"${props.form.name}"`}</span>
        </div>
      </>
    );
}

function History(props: {
  form: Omit<Item, "value">;
  localStorageHistory: Item[];
  itemClass?: string;
  handelClickOnItem: (item: Item) => void;
  removeOldSearchFromLocalStorage: (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
}) {
  if (!!!props.form.name && !!props.localStorageHistory?.length)
    return (
      <>
        {props.localStorageHistory.map((item: Item, index: number) => {
          return (
            <div
              key={index}
              onClick={() => props.handelClickOnItem(item)}
              className={` flex justify-between items-center hover:bg-slate-200 cursor-pointer text-xs text-stone-600 p-1  ${props.itemClass}`}
            >
              {item.name}
              <div
                id="removeOldSearch"
                className="flex gap-1 text-stone-600 text-xs p-2"
                onClick={(event) =>
                  props.removeOldSearchFromLocalStorage(event, index)
                }
              >
                <span id="removeOldSearch">
                  <IoMdClose className="cursor-pointer hover:text-red-600" />
                </span>
              </div>
            </div>
          );
        })}
      </>
    );
}

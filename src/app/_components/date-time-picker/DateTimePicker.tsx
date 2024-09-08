import { FC, useEffect, useMemo, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MultiDatePicker from "react-multi-date-picker";
const jalaali = require("jalaali-js");
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/layouts/mobile.css";

interface DatePicker {
  oldDate: string | undefined;
  placeholder: string;
  onSelectDate: (date: any) => void;
}

const DateTimePicker: FC<DatePicker> = (props) => {
  const { placeholder, oldDate } = props;
  const [value, setValue] = useState<any>();

  const oldDateMemo = useMemo(() => {
    return oldDate;
  }, [oldDate]);

  const onChange = (time: any) => {
    const { gy, gm, gd } = jalaali.toGregorian(
      time.year,
      time.month.number,
      time.day
    );

    props.onSelectDate(
      `${gy}/${gm}/${gd} ${time.hour}:${time.minute}:${time.second}`
    );
  };

  useEffect(() => {
    if (oldDateMemo) {
      setValue(new Date(oldDateMemo));
    }

    // let el: any = document.getElementsByClassName("rmdp-input")[0];
    // el.style.border = "none";
    // el.style.outline = "none";
    // el.style.boxShadow = "none";
    // el.style.width = "100%";
    // el.placeholder = placeholder;

    // let el2: any = document.getElementsByClassName("rmdp-input")[1];
    // el2.style.border = "none";
    // el2.style.outline = "none";
    // el2.style.boxShadow = "none";
    // el2.style.width = "100%";
    // el2.placeholder = placeholder;
  }, [oldDateMemo]);

  return (
    <>
      <MultiDatePicker
        key={55555}
        id="25"
        name="arman"
        hideOnScroll
        format="HH:mm:ss   YYYY/MM/DD"
        value={value}
        calendar={persian}
        locale={persian_fa}
        highlightToday={true}
        showOtherDays={false}
        // placeholder={placeholder}
        containerClassName="w-full"
        // inputClass="w-full border border-[#3F3E3E] py-3 mobile:py-6 px-2 mobile:px-4 text-[#545b77] cursor-pointer"
        onChange={onChange}
        // render={
          // <InputIcon
          //   placeholder={placeholder}
          //   className="w-full rounded border border-[#3F3E3E] py-3 mobile:py-6 px-2 mobile:px-4 text-[#545b77] cursor-pointer"
          // />
        // }
        className="rmdp-mobile"
        plugins={[<TimePicker position="bottom" key={1} />]}
        mobileButtons={[
          {
            label: "رفرش",
            // type: "button",
            className: "rmdp-button rmdp-action-button",
            onClick: () => setValue({}),
          },
        ]}
      />
    </>
  );
};

export default DateTimePicker;
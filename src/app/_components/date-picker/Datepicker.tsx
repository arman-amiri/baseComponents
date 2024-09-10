import { FC, useEffect, useMemo, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MultiDatePicker from "react-multi-date-picker";
const jalaali = require("jalaali-js");
import "react-multi-date-picker/styles/layouts/mobile.css";

interface DatePicker {
  oldDate: string | undefined;
  placeholder: string;
  isShamsi: boolean;
  containerClassName?: string;
  inputClass?: string;
  onSelectDate: (date: string) => void;
}

const DatePicker: FC<DatePicker> = (props) => {
  const { placeholder, oldDate, isShamsi, containerClassName, inputClass } =
    props;
  const [value, setValue] = useState<any>();

  const oldDateMemo = useMemo(() => {
    return oldDate;
  }, [oldDate]);

  const onChange = (time: any) => {
    if (isShamsi) {
      const month = time.month.number.toString();
      const day = time.day.toString();
      const m = month.length === 1 ? `0${month}` : `${month}`;
      const d = day.length === 1 ? `0${day}` : `${day}`;
      props.onSelectDate(`${time.year}${m}${d}`);
    } else {
      const { gy, gm, gd } = jalaali.toGregorian(
        time.year,
        time.month.number,
        time.day
      );
      props.onSelectDate(`${gy}/${gm}/${gd}`);
    }
  };

  useEffect(() => {
    if (oldDateMemo && !isShamsi) {
      const { jy, jm, jd } = jalaali.toJalaali(new Date(oldDateMemo));
      setValue(`${jy}/${jm}/${jd}`);
    } else {
      setValue(
        `${oldDateMemo?.slice(0, 4)}/${oldDateMemo?.slice(4, 6)}/${oldDateMemo?.slice(6, 8)}`
      );
    }
  }, [oldDateMemo, isShamsi]);

  return (
    <>
      {/* rmdp-mobile */}
      <MultiDatePicker
        // hideOnScroll
        value={value}
        format="YYYY/MM/DD"
        calendar={persian}
        locale={persian_fa}
        highlightToday={true}
        showOtherDays={false}
        placeholder={placeholder}
        buttons={false}
        containerClassName={containerClassName}
        inputClass={`py-2 px-4 border border-gray cursor-pointer rounded ${inputClass}`}
        onChange={onChange}
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

export default DatePicker;

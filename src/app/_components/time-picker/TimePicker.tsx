import { FC, useEffect, useMemo, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MultiDatePicker from "react-multi-date-picker";
const jalaali = require("jalaali-js");
import TimePickerPlugin from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";

interface DatePicker {
  oldDate: string | undefined;
  placeholder: string;
  onSelectDate: (date: any) => void;
}

const TimePicker: FC<DatePicker> = (props) => {
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
    props.onSelectDate(`${time.hour}:${time.minute}`);
  };

  useEffect(() => {
    if (oldDateMemo) {
      setValue(new Date(`2023/02/05 ${oldDateMemo}: 00`));
    }

    let el: any = document.getElementsByClassName("rmdp-input")[1];
    el.style.border = "none";
    el.style.outline = "none";
    el.style.boxShadow = "none";
    el.placeholder = placeholder;
  }, [oldDateMemo]);

  return (
    <>
      <MultiDatePicker
        key={15248}
        disableDayPicker
        hideOnScroll
        format="HH:mm:ss"
        value={value}
        calendar={persian}
        locale={persian_fa}
        placeholder={placeholder}
        inputClass="py-4"
        containerClassName="w-full border-b border-[#4B6392] py-1 text-[#4E4E4E]"
        onChange={onChange}
        render={<InputIcon />}
        plugins={[<TimePickerPlugin position="bottom" key={1} />]}
      />
    </>
  );
};

export default TimePicker;
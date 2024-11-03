"use client";
import {
  faCalendar,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { useState } from "react";
// import DatePicker, { registerLocale } from "react-datepicker";
// import { ja } from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
// registerLocale("ja", ja);
type Props = {
  searchDate: {
    startDate: string | Date;
    endDate: string | Date;
  };
  setSearchKeyword: (searchKeyword: string) => void;
  setSearchDate: (dates: { startDate: string; endDate: string }) => void;
};
export const SeachForm: React.FC<Props> = ({
  searchDate,
  setSearchDate,
  setSearchKeyword,
}) => {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchKeyword(keyword);
  };
  const onClear = () => {
    setSearchKeyword("");
    setKeyword("");
  };

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setSearchDate({
      startDate: date[0]?.toString() || "",
      endDate: date[1]?.toString() || "",
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <form className="flex" onSubmit={handleSubmit}>
        <div className="border-[1px] px-2 rounded-lg py-1 flex relative">
          <input
            id="searchWord"
            inputMode="text"
            placeholder="検索"
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className=""
          />
          {keyword && (
            <div className="absolute right-2">
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
              </button>
              <button type="button" onClick={onClear} className="pl-2">
                <FontAwesomeIcon icon={faCircleXmark} className="" />
              </button>
            </div>
          )}
        </div>
      </form>
      <div className="border-[1px] p-1 rounded-md flex items-center relative">
        <DatePicker
          // locale="ja"
          onChange={e => handleDateChange(e)}
          dateFormatCalendar="yyyy年 MM月"
          dateFormat="yyyy/MM/dd"
          startDate={
            searchDate.startDate ? new Date(searchDate.startDate) : undefined
          }
          endDate={
            searchDate.endDate ? new Date(searchDate.endDate) : undefined
          }
          selectsRange
          isClearable
          placeholderText="日付で絞り込み"
        />
        {!searchDate.startDate && (
          <FontAwesomeIcon icon={faCalendar} className="absolute right-1" />
        )}
      </div>
    </div>
  );
};

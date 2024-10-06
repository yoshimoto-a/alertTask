"use client";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { SingleValue } from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { ScheduleType } from "../_types/schedule";

interface Props {
  schedules: ScheduleType[];
  setSchedules: (schedules: ScheduleType[]) => void;
}

export const Schedule: React.FC<Props> = ({ schedules, setSchedules }) => {
  const hourOptions = Array.from({ length: 24 }, (_, hour) => ({
    value: hour,
    label: `${hour}時`,
  }));
  const addSchedule = () => {
    const { daysBefore, hour } = schedules[schedules.length - 1];
    if (daysBefore === "" || hour === null) {
      toast.error("未入力の項目があります");
      return;
    }
    setSchedules([...schedules, { daysBefore: "", hour: null }]);
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const handleDaysChange = (index: number, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index].daysBefore = value;
    setSchedules(newSchedules);
  };

  const handleHourChange = (
    index: number,
    selectedOption: SingleValue<{ value: number; label: string }> | null
  ) => {
    const newSchedules = [...schedules];
    newSchedules[index].hour = selectedOption;
    setSchedules(newSchedules);
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center py-4">
        <p className="pb-2">LINE通知を行うタイミング</p>
        <button
          type="button"
          onClick={addSchedule}
          className="border-solid border-[1px] px-2 rounded-lg py-1 bg-black text-white hover:bg-white hover:text-black"
        >
          追加
        </button>
      </div>
      {schedules.map((schedule, index) => (
        <div className="flex justify-between pb-2" key={index}>
          <div className="flex gap-1 items-end">
            <input
              type="number"
              inputMode="numeric"
              className="border-[1px] rounded-sm w-[50px] h-full px-2"
              value={schedule.daysBefore}
              min="0"
              onChange={e => handleDaysChange(index, e.target.value)}
            />
            <p className="align-baseline">日前</p>
          </div>
          <Select
            options={hourOptions}
            className="w-[100px]"
            value={schedule.hour}
            placeholder="時刻"
            onChange={selectedOption => handleHourChange(index, selectedOption)}
          />
          {index !== 0 ? (
            <button onClick={() => removeSchedule(index)} type="button">
              <FontAwesomeIcon icon={faXmarkCircle} className="w-10" />
            </button>
          ) : (
            <div className="w-10"></div>
          )}
        </div>
      ))}
    </div>
  );
};

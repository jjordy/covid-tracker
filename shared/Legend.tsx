import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { HiChevronDoubleDown, HiOutlineChevronDown } from "react-icons/hi";
import LegendItem from "./LegendItem";

export default function Legend({
  type,
  setType,
  play,
  currentRangePos,
  handleChangeRange,
  range,
  setPlay,
  currentDate,
}) {
  const [show, setShow] = useState(true);
  const toggle = () => setShow(!show);
  return (
    <>
      <div className="mt-6 p-2 bg-blue-900/10 rounded-t-2xl w-full">
        <h2
          className="tracking-tight uppercase text-2xl my-2 font-extrabold text-gray-600 cursor-pointer flex items-center"
          onClick={toggle}
        >
          {type === "positive" ? "Positive Cases" : "Deaths"} <div className="mr-auto"></div>
          <span className="text-gray-600 font-medium">
            {currentDate && format(parseISO(currentDate), "MM/dd/yyyy")}
          </span>
          <HiChevronDoubleDown className="ml-2" />
        </h2>
        <div
          className={` ${
            show ? "grid grid-cols-2 gap-2" : "hidden"
          } transition-all  duration-200 ease-in`}
        >
          <LegendItem color="#000">5 Million +</LegendItem>
          <LegendItem color="#400400">3 Million + </LegendItem>
          <LegendItem color="#800800">1 Million +</LegendItem>
          <LegendItem color="#e60e00">100,000 +</LegendItem>
          <LegendItem color="#FF1343">75,000 + </LegendItem>
          <LegendItem color="#1d1c1c">50,000 +</LegendItem>
          <LegendItem color="#FF5420">40,000 +</LegendItem>
          <LegendItem color="#E86311">30,000 + </LegendItem>
          <LegendItem color="#FF8F13">20,000 +</LegendItem>
          <LegendItem color="purple">10,000 +</LegendItem>
          <LegendItem color="#829FD9">5,000 + </LegendItem>
          <LegendItem color="#3E38F2">1000 +</LegendItem>
        </div>
      </div>
      <div className="p-2 bg-blue-900/10 rounded-b-2xl">
        <div className="flex items-center w-full relative mb-2">
          <label htmlFor="id_select_type" className="sr-only">
            Select Type
          </label>
          <select
            value={type}
            id="id_select_type"
            onChange={(evt) => setType(evt.target.value)}
            className=" appearance-none bg-blue-900/20 rounded w-full h-12 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          >
            <option value="positive">Positive Cases</option>
            <option value="death">Deaths</option>
          </select>
          <div className="absolute right-4 top-4 text-gray-600">
            <HiChevronDoubleDown />
          </div>
        </div>
        <p className="my-2 text-gray-600 text-sm font-medium">Hit the play button or drag the slider to watch the cases by date and state.</p>
        <div className="flex py-2">
          <button
            className={`rounded p-2 mr-2 text-white ${play ? "bg-gray-500" : "bg-green-500"}`}
            title={play ? "Stop" : "Start"}
            onClick={() => {
              if (currentRangePos === range) {
                handleChangeRange({ target: { value: 0 } });
              }
              setPlay(!play);
            }}
          >
            {play ? <FaPause /> : <FaPlay />}
          </button>
          <button
            title="Start"
            className="bg-red-500 rounded p-2 mr-2 text-white"
            onClick={() => {
              setPlay(false);
              handleChangeRange({ target: { value: 0 } });
            }}
          >
            <FaStop />
          </button>
          <label htmlFor="id_change_date" className="sr-only">
            Change Date
          </label>
          <input
            type="range"
            min="0"
            id="id_change_date"
            max={range}
            className="w-full"
            step="1"
            onChange={handleChangeRange}
            value={currentRangePos}
          />
        </div>
      </div>
    </>
  );
}

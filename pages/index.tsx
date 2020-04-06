import { useMemo } from "react";
import { format, parse } from "date-fns";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";
import Legend from "shared/Legend";
import useMap from "hooks/useMap";

export default function IndexPage() {
  const {
    ref,
    toolTipRef,
    currentDate,
    play,
    range,
    setPlay,
    handleChangeRange,
    currentRangePos,
    type,
    setType
  } = useMap();
  return (
    <div className="p-2 md:flex w-full flex-col">
      <h1 className="text-white text-4xl tracking-tight font-extrabold uppercase">
        Covid-19 {type === "positive" ? "Positive Cases" : "Deaths "} By State
      </h1>
      <h2 className="text-white font-medium tracking-tighter uppercase text-2xl">
        {currentDate && format(parse(currentDate, "yyyyMMdd", new Date()), "MM/dd/yyyy")}
      </h2>
      <div className="relative flex-col flex md:flex-row  items-center">
        <svg ref={ref} className="order-last states-map" style={{ maxWidth: "100%" }}></svg>
        <div>
          <Legend type={type} />
          <div className="p-2 bg-gray-100">
            <select
              value={type}
              onChange={(evt) => setType(evt.target.value)}
              className="mb-2 bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option value="positive">Positive Cases</option>
              <option value="death">Deaths</option>
            </select>
            <div className="flex">
              <button
                className={`rounded p-2 mr-2 text-white ${play ? "bg-gray-500" : "bg-green-500"}`}
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
                className="bg-red-500 rounded p-2 mr-2 text-white"
                onClick={() => {
                  setPlay(false);
                  handleChangeRange({ target: { value: 0 } });
                }}
              >
                <FaStop />
              </button>
              <input
                type="range"
                min="0"
                max={range}
                step="1"
                onChange={handleChangeRange}
                value={currentRangePos}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={toolTipRef}
        className="absolute right-0 bg-black w-32 md:w-48 text-white font-medium"
      />
    </div>
  );
}

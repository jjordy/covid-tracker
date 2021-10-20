import { useMemo } from "react";
import { format, parse, parseISO } from "date-fns";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";
import Legend from "shared/Legend";
import useMap from "hooks/useMap";
import StatesViz from "shared/States";
import Head from "next/head";

export default function IndexPage() {
  const {
    data,
    currentDate,
    play,
    range,
    setPlay,
    handleChangeRange,
    currentRangePos,
    type,
    setType,
  } = useMap();
  return (
    <div className="p-2 md:flex w-full flex-col">
      <Head>
        <title>Covid Data by state</title>
      </Head>
      <h1 className="text-3xl text-center md:caret-black md:text-6xl text-gray-700 my-4 tracking-tight font-extrabold uppercase">
        CDC Covid-19 {type === "positive" ? "Positive Cases" : "Deaths "} By State
      </h1>
      <h2 className="text-red-500 text-center font-medium tracking-tighter uppercase text-2xl md:text-4xl">
        States in gray not reporting data.
      </h2>
      <div className="relative flex-col md:flex md:flex-row  items-center">
        <StatesViz data={data} type={type} />
        <div className="md:mt-0 md:w-1/3 md:px-8">
          <Legend
            range={range}
            play={play}
            setPlay={setPlay}
            handleChangeRange={handleChangeRange}
            currentRangePos={currentRangePos}
            currentDate={currentDate}
            setType={setType}
            type={type}
          />
        </div>
      </div>
    </div>
  );
}

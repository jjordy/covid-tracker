import { useEffect, useCallback, useState } from "react";
import us_states from "shared/topo.json";
import useInterval from "hooks/useInterval";
import useWindowSize from "hooks/useWindowSize";
import useSWR from "swr";
import groupBy from "lodash.groupby";
import orderBy from "lodash.orderby";
import { closestTo, isEqual, parseISO } from "date-fns";

export default function useMap() {
  const { data: daily } = useSWR(`https://data.cdc.gov/resource/9mfq-cb36.json`);
  const [range, setRange] = useState(0);
  const [currentRangePos, setCurrentRangePos] = useState(0);
  const [stepSize, setStepSize] = useState(30);
  const [type, setType] = useState<"positive" | "death">("positive");
  const [currentDate, setCurrentDate] = useState(null);
  const [geoData, setData] = useState([]);
  const [play, setPlay] = useState(false);
  const { width = 768 } = useWindowSize();

  const handleChangeRange = useCallback(
    (evt) => {
      setCurrentRangePos(parseInt(evt.target.value));
      const uniqueDates = groupBy(
        orderBy([...daily], ["submission_date"], ["asc"]),
        "submission_date"
      );
      const selectedDate = Object.keys(uniqueDates);
      const d = uniqueDates[selectedDate[parseInt(evt.target.value)]];
      if (selectedDate && d && d[0]) {
        setCurrentDate(d[0]?.submission_date);
        handleSetDate(d[0]?.submission_date);
      }
    },
    [daily, type]
  );

  const handleSetType = useCallback(
    (type) => {
      setType(type);
      handleSetDate(currentDate);
    },
    [currentDate, range, currentRangePos]
  );

  useEffect(() => {
    if (daily) {
      const range = groupBy(daily, "submission_date");
      setRange(Object.keys(range).length);
    }
  }, [daily]);
  useInterval(() => {
    if (play) {
      console.log(range, currentRangePos, stepSize, range)
      if (range && currentRangePos + stepSize < range) {
        handleChangeRange({ target: { value: currentRangePos + stepSize } });
      } else {
        setPlay(false);
      }
    }
  }, 200);
  const handleSetDate = useCallback(
    (selectedDate) => {
      const filtered = [...daily].filter((d) => d?.submission_date === selectedDate);
      const geoData = us_states.features.map((feature) => {
        const allStateData = groupBy(daily, "state");
        const dataByExactDate = filtered.find((d) => d.state === feature.properties.name);
        let stateData = null;
        if (allStateData && allStateData[feature.properties.name]) {
          const datesForState = allStateData[feature.properties.name].map(
            (s) => new Date(s?.submission_date)
          );
          const closestDate = closestTo(new Date(selectedDate), datesForState);
          if (closestDate) {
            stateData = allStateData[feature.properties.name].find((t) => {
              return isEqual(closestDate, parseISO(t.submission_date));
            });
          }
        }
        return {
          ...feature,
          properties: {
            ...feature.properties,
            data: dataByExactDate || stateData,
          },
        };
      });
      setData(geoData);
    },
    [daily, type, currentDate]
  );
  useEffect(() => {
    if (daily) {
      const firstDate = orderBy(daily, "submission_date")[0]?.submission_date;
      setCurrentDate(firstDate);
      handleSetDate(firstDate);
    }
  }, [daily, type]);
  return {
    currentDate,
    currentRangePos,
    setCurrentRangePos,
    setCurrentDate,
    play,
    setPlay,
    handleChangeRange,
    width,
    range,
    type,
    data: geoData,
    setType: handleSetType,
    stepSize,
    setStepSize,
  };
}

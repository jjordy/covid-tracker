import { useRef, useEffect, useCallback, useState } from "react";
import { select, geoAlbersUsa, geoPath, event } from "d3";
import us_states from "shared/topo.json";
import uniqBy from "lodash.uniqby";
import get from "lodash.get";
import useInterval from "hooks/useInterval";
import useWindowSize from "hooks/useWindowSize";
import useSWR from "swr";

export default function useMap() {
  const { data: daily } = useSWR(`https://covidtracking.com/api/states/daily`);
  const [range, setRange] = useState(0);
  const [currentRangePos, setCurrentRangePos] = useState(0);
  const [type, setType] = useState<"positive" | "death">("positive");
  const [currentDate, setCurrentDate] = useState(null);
  const [play, setPlay] = useState(false);
  const { width = 768 } = useWindowSize();
  const ref = useRef();
  const toolTipRef = useRef();
  const handleChangeRange = useCallback(
    (evt) => {
      setCurrentRangePos(evt.target.value);
      const uniqueDates = uniqBy([...daily], "date").reverse();
      const selectedDate = uniqueDates[parseInt(evt.target.value)];
      if (selectedDate) {
        setCurrentDate(selectedDate.date);
        handleSetDate(selectedDate.date);
      }
    },
    [daily, type]
  );

  const handleSetType = useCallback(
    (type) => {
      setType(type);
      handleSetDate(currentDate, type);
    },
    [currentDate, range, currentRangePos]
  );

  useEffect(() => {
    const range = uniqBy(daily, "date").length;
    setRange(range);
  }, [daily]);
  useInterval(() => {
    if (play) {
      if (range && currentRangePos < range) {
        handleChangeRange({ target: { value: currentRangePos + 1 } });
      } else {
        setPlay(false);
      }
    }
  }, 200);
  const handleSetDate = useCallback(
    (selectedDate, selectedType = undefined) => {
      const tooltip = select(toolTipRef.current);
      tooltip
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("background-color", "#000")
        .style("color", "#fff")
        .style("visibility", "hidden");
      const projection = geoAlbersUsa()
        .translate(width > 768 ? [768 / 2, 500 / 2] : [400 / 2, 500 / 2])
        .scale(width > 768 ? 1000 : 300);
      const path = geoPath(projection);
      const filtered = [...daily].filter((d) => d.date === selectedDate);
      const svg = select(ref.current);
      const geoData = us_states.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          data: filtered.find((d) => d.state === feature.properties.name),
        },
      }));

      svg.selectAll("path").remove();
      svg
        .selectAll("path")
        .data(geoData)
        .enter()
        .append("path")
        // @ts-ignore
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", (d) => {
          const positiveCases = get(d, `properties.data[${selectedType || type}]`, 0);
          return getColor(positiveCases);
        })
        .on("mouseover", function (d) {
          const positiveCases = get(d, "properties.data.positive", 0);
          const deaths = get(d, "properties.data.death", 0);
          const state = get(d, "properties.data.state", "");
          return tooltip.style("visibility", "visible").html(`
            <div class="p-2 md:p-4 text-xs md:text-base">
              <p>State: ${state}</p>
              <p>Positive Cases: ${positiveCases}</p>
              <p>Deaths: ${deaths}</p>
            </div>
          `);
        })
        .on("mousemove", function () {
          return tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        });
    },
    [daily, type, currentDate]
  );
  useEffect(() => {
    if (daily) {
      const firstDate = [...daily].reverse()[0].date;
      setCurrentDate(firstDate);
      handleSetDate(firstDate);
    }
  }, [daily, type]);
  return {
    ref,
    currentDate,
    currentRangePos,
    setCurrentRangePos,
    setCurrentDate,
    play,
    setPlay,
    handleChangeRange,
    width,
    range,
    toolTipRef,
    type,
    setType: handleSetType,
  };
}

function getColor(total) {
  if (total > 5000) {
    return "#400400";
  }
  if (total > 4500) {
    return "#800800";
  }
  if (total > 4000) {
    return "#E60E00";
  }
  if (total > 3500) {
    return "#FF1343";
  }
  if (total > 3000) {
    return "#E82411";
  }
  if (total > 2500) {
    return "#FF5420";
  }
  if (total > 2000) {
    return "#E86311";
  }
  if (total > 1500) {
    return "#FF8F13";
  }
  if (total > 1000) {
    return "purple";
  }
  if (total > 500) {
    return "#829FD9";
  }
  if (total > 100) {
    return "#3E38F2";
  }
  return "gray";
}

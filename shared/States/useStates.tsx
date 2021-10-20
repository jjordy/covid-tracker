import { useRef, useEffect } from "react";
import { select, geoAlbersUsa, geoPath, scaleQuantize, scaleThreshold } from "d3";
import get from "lodash.get";

const colors = [
  "lightgray",
  "#829FD9",
  "purple",
  "#FF8F13",
  "#E86311",
  "#FF5420",
  "#1d1c1c",
  "#FF1343",
  "#e60e00",
  "#800800",
  "#400400",
  "#000",
];

var quantizeScale = scaleQuantize()
  .domain([1, 1000000])
  //@ts-ignore
  .range(colors);

export default function useStates({ data, type }) {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const svg = select(svgRef.current);
  const tooltip = select(tooltipRef.current);
  const projection = geoAlbersUsa();
  const path = geoPath(projection);
  useEffect(() => {
    tooltip
      .append("div")
      .style("z-index", "10")

      .style("background-color", "#000")
      .style("color", "#fff")
      .style("visibility", "hidden");
    svg.selectAll("path").remove();

    let map = svg
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      // .style("fill", "white")
      // @ts-ignore
      .attr("d", path)
      .style("stroke", "#555")
      .style("stroke-width", "1")

      .on("mouseover", function (_event, d) {
        const positiveCases = parseInt(get(d, "properties.data.tot_cases", 0));
        const deaths = parseInt(get(d, "properties.data.tot_death", 0));
        const state = get(d, "properties.data.state", "");
        return tooltip.style("visibility", "visible").html(`
      <div class="p-2 md:p-4 text-xs md:text-base">
        <p>State: ${state}</p>
        <p>Positive Cases: ${positiveCases}</p>
        <p>Deaths: ${deaths}</p>
      </div>
    `);
      })
      .on("mousemove", function (event: any, _d) {
        return tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function (event: any, _d) {
        return tooltip.style("visibility", "hidden");
      });
    map

      .transition()
      .duration(75)
      .attr("fill", (d) => {
        const positiveCases = parseInt(
          get(d, type === "death" ? "properties.data.tot_death" : "properties.data.tot_cases", 0),
          10
        );
        return quantizeScale(positiveCases);
      });
  }, [data, type]);
  return {
    svgRef,
    tooltipRef,
  };
}

function getColor(total) {
  if (total > 5000000) {
    return "#000";
  }
  if (total > 3000000) {
    return "#400400";
  }
  if (total > 1000000) {
    return "#800800";
  }
  if (total > 100000) {
    return "#E60E00";
  }
  if (total > 75000) {
    return "#FF1343";
  }
  if (total > 50000) {
    return "#1d1c1c";
  }
  if (total > 40000) {
    return "#FF5420";
  }
  if (total > 30000) {
    return "#E86311";
  }
  if (total > 20000) {
    return "#FF8F13";
  }
  if (total > 10000) {
    return "purple";
  }
  if (total > 5000) {
    return "#829FD9";
  }
  if (total > 1000) {
    return "#3E38F2";
  }
  return "gray";
}

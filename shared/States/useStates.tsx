import { useRef, useEffect } from "react";
import { select, geoAlbersUsa, geoPath } from "d3";
import get from "lodash.get";
import useWindowSize from "hooks/useWindowSize";

export default function useStates({ data, type }) {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const { width } = useWindowSize();
  useEffect(() => {
    const svg = select(svgRef.current);
    const tooltip = select(tooltipRef.current);
    const projection = geoAlbersUsa();
    const path = geoPath(projection);
    tooltip
      .append("div") 
      .style("z-index", "10")
      
      .style("background-color", "#000")
      .style("color", "#fff")
      .style("visibility", "hidden");
    svg.selectAll("path").remove();

    svg
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      // @ts-ignore
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", (d) => {
        const positiveCases = parseInt(
          get(d, type === "death" ? "properties.data.tot_death" : "properties.data.tot_cases", 0),
          10
        );
        return getColor(positiveCases);
      })
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

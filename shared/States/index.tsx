import useStates from "./useStates";

export default function StatesViz({ data, type }) {
  const { svgRef, tooltipRef } = useStates({ data, type });
  return (
    <div className="relative w-full h-auto">
      <svg ref={svgRef} className="order-last states-map" style={{ maxWidth: "100%" }} viewBox="0 0 900 500"></svg>
      <div
        ref={tooltipRef}
        className="absolute -translate-y-48 bg-black w-32 md:w-48 text-white font-medium"
      />
    </div>
  );
}

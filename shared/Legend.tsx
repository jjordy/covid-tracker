export default function Legend({ type }) {
  return (
    <div className="mt-6  md:w-48 md:w-64 p-4 bg-white rounded-t shadow-xl">
      <h2 className="tracking-tight uppercase font-extrabold text-gray-600">
        {type === "positive" ? "Positive Cases" : "Deaths"}
      </h2>
      <div className="flex flex-wrap">
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#400400" }} /> 5000+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#800800" }} /> 4500+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#E60E00" }} /> 4000+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#FF1343" }} /> 3500+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#E82411" }} /> 3000+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#FF5420" }} /> 2500+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#E86311" }} /> 2000+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#FF8F13" }} /> 1500+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "purple" }} /> 1000+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#829FD9" }} /> 500+
        </div>
        <div className="w-1/3 md:w-1/2 flex items-center text-sm text-gray-900 font-medium mb-2">
          <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: "#3E38F2" }} /> 100+
        </div>
      </div>
    </div>
  );
}

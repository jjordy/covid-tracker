export default function LegendItem ({ color, children }) {
  return (
    <div className="flex items-center text-sm text-gray-900 font-medium mb-2">
      <div className="h-8 w-8 rounded-full mr-2" style={{ backgroundColor: color }} /> {children}
    </div>
  );
}
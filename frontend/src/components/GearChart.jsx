import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
  export default function GearChart({ data }) {
    if (!data || data.length === 0) return null;
  
    const formatTime = (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 mt-10">
        <h2 className="text-xl font-semibold mb-4">Gear Change Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Time"
              tickFormatter={formatTime}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 7]}
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              label={{ value: "Gear", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              labelFormatter={formatTime}
              formatter={(value) => [`Gear ${value}`, ""]}
            />
            <Legend />
            <Line
              type="stepAfter"
              dataKey="Gear"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
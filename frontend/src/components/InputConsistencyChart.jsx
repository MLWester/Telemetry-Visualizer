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
  
  export default function InputConsistencyChart({ data }) {
    if (!data || data.length === 0) return null;
  
    const formatTime = (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 mt-10">
        <h2 className="text-xl font-semibold mb-4">Driver Input Consistency</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Time"
              tickFormatter={formatTime}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip labelFormatter={formatTime} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Throttle"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
              name="Throttle"
            />
            <Line
              type="monotone"
              dataKey="Brake"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              name="Brake"
            />
            <Line
              type="monotone"
              dataKey="Steering"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
              name="Steering"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
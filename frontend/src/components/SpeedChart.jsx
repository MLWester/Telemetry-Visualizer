import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
  } from 'recharts';
  
  export default function SpeedChart({ data }) {
    if (!data || data.length === 0) return null;
  
    return (
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold mb-4">Speed vs Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Time" tick={{ fontSize: 12 }} />
            <YAxis dataKey="Speed" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Speed"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
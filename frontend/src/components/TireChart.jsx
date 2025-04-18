import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
  } from "recharts";
  
  export default function TireChart({ data }) {
    if (!data || data.length === 0) return null;
  
    const formatTime = (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="space-y-10 mt-10">
        {/* Tire Pressure Chart */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Tire Pressure (All 4 Tires)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="Time"
                tick={{ fontSize: 12 }}
                tickFormatter={formatTime}
              />
              <YAxis />
              <Tooltip labelFormatter={formatTime} />
              <Legend />
              <Line type="monotone" dataKey="TirePressureFL" stroke="#1d4ed8" dot={false} name="FL" />
              <Line type="monotone" dataKey="TirePressureFR" stroke="#3b82f6" dot={false} name="FR" />
              <Line type="monotone" dataKey="TirePressureRL" stroke="#6366f1" dot={false} name="RL" />
              <Line type="monotone" dataKey="TirePressureRR" stroke="#93c5fd" dot={false} name="RR" />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Tire Temperature Chart */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Tire Temperature (All 4 Tires)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="Time"
                tick={{ fontSize: 12 }}
                tickFormatter={formatTime}
              />
              <YAxis />
              <Tooltip labelFormatter={formatTime} />
              <Legend />
              <Line type="monotone" dataKey="TireTempFL" stroke="#f97316" dot={false} name="FL" />
              <Line type="monotone" dataKey="TireTempFR" stroke="#dc2626" dot={false} name="FR" />
              <Line type="monotone" dataKey="TireTempRL" stroke="#ea580c" dot={false} name="RL" />
              <Line type="monotone" dataKey="TireTempRR" stroke="#b91c1c" dot={false} name="RR" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
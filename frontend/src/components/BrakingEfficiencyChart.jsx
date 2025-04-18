import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceArea,
  } from "recharts";
  
  export default function BrakingEfficiencyChart({ data }) {
    if (!data || data.length === 0) return null;
  
    const coastingZones = [];
    const brakingZones = [];
  
    let currentCoast = null;
    let currentBrake = null;
  
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
  
      // Coasting zone (Throttle 0, Brake 0)
      if (point.Throttle === 0 && point.Brake === 0) {
        if (!currentCoast) {
          currentCoast = { start: point.Time };
        }
      } else {
        if (currentCoast) {
          currentCoast.end = point.Time;
          coastingZones.push(currentCoast);
          currentCoast = null;
        }
      }
  
      // Braking zone (Brake > 50)
      if (point.Brake > 50) {
        if (!currentBrake) {
          currentBrake = { start: point.Time };
        }
      } else {
        if (currentBrake) {
          currentBrake.end = point.Time;
          brakingZones.push(currentBrake);
          currentBrake = null;
        }
      }
    }
  
    const formatTime = (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 mt-10">
        <h2 className="text-xl font-semibold mb-4">Braking & Coasting Efficiency Zones</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Time" tickFormatter={formatTime} />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${value.toFixed(1)}%`, name]}
              labelFormatter={formatTime}
            />
  
            {/* Braking zones (red) */}
            {brakingZones.map((zone, i) => (
              <ReferenceArea
                key={`brake-${i}`}
                x1={zone.start}
                x2={zone.end}
                stroke="none"
                fill="#f87171"
                fillOpacity={0.2}
                label={{
                  position: "top",
                  value: `${(zone.end - zone.start).toFixed(1)}s braking`,
                  fontSize: 10,
                }}
              />
            ))}
  
            {/* Coasting zones (yellow) */}
            {coastingZones.map((zone, i) => (
              <ReferenceArea
                key={`coast-${i}`}
                x1={zone.start}
                x2={zone.end}
                stroke="none"
                fill="#fde68a"
                fillOpacity={0.3}
                label={{
                  position: "top",
                  value: `${(zone.end - zone.start).toFixed(1)}s coasting`,
                  fontSize: 10,
                }}
              />
            ))}
  
            {/* Line for Brake and Throttle */}
            <Line
              type="monotone"
              dataKey="Throttle"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Brake"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
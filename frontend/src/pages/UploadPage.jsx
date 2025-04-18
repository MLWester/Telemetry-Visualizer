import { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import TireChart from '../components/TireChart';
import GearChart from '../components/GearChart';
import InputConsistencyChart from '../components/InputConsistencyChart';
import BrakingEfficiencyChart from '../components/BrakingEfficiencyChart';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const { telemetryData, addTelemetry, clearTelemetry } = useTelemetry();

  const [visible, setVisible] = useState({
    Speed: true,
    Throttle: true,
    Brake: true,
  });

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          addTelemetry({ label: file.name, data });
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
    setFiles([]);
  };

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-3">Sim Racing Telemetry Visualizer</h1>
        <p className="text-gray-500 text-lg">
          Upload iRacing or real car telemetry data to visualize performance across laps
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Upload CSV Files</h2>
        <input
          type="file"
          multiple
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm"
        />
        <div className="flex gap-4">
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Upload
          </button>
          <button
            onClick={clearTelemetry}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
          >
            Clear All
          </button>
        </div>
        {files.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </section>

      {telemetryData.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Telemetry Charts</h2>
          {telemetryData.map((stint, index) => (
            <div key={index} className="mb-12 bg-white p-6 rounded shadow border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">{stint.label}</h3>

              {/* Toggle Buttons */}
              <div className="flex gap-3 mb-4 text-sm">
                {["Speed", "Throttle", "Brake"].map((key) => (
                  <button
                    key={key}
                    onClick={() =>
                      setVisible((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    className={`px-3 py-1 rounded border shadow-sm ${
                      visible[key]
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {visible[key] ? `Hide ${key}` : `Show ${key}`}
                  </button>
                ))}
              </div>

              {/* Speed / Throttle / Brake */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stint.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Time" tickFormatter={formatTime} />
                  <YAxis />
                  <Tooltip labelFormatter={formatTime} />
                  <Legend />
                  {visible.Speed && (
                    <Line type="monotone" dataKey="Speed" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  )}
                  {visible.Throttle && (
                    <Line type="monotone" dataKey="Throttle" stroke="#10b981" strokeWidth={2} dot={false} />
                  )}
                  {visible.Brake && (
                    <Line type="monotone" dataKey="Brake" stroke="#ef4444" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>

              <TireChart data={stint.data} />
              <GearChart data={stint.data} />
              <InputConsistencyChart data={stint.data} />
              <BrakingEfficiencyChart data={stint.data} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

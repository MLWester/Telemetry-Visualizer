import { useState } from 'react';
import SpeedChart from '../components/SpeedChart';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [uploadResults, setUploadResults] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const newResults = [];

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
          newResults.push({
            fileName: file.name,
            data,
          });
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    setUploadResults(newResults);
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
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          Upload
        </button>
        {files.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </section>

      {uploadResults.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upload Summary</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {uploadResults.map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-5">
                <h3 className="text-lg font-semibold mb-1">{result.fileName}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {result.data.length} rows parsed
                </p>

                {/* Data Table Preview */}
                <div className="overflow-x-auto text-sm border rounded mb-6">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        {Object.keys(result.data[0] || {}).slice(0, 6).map((key, idx) => (
                          <th key={idx} className="p-2 text-left border-b font-medium">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(result.data[0] || {}).slice(0, 6).map((val, idx) => (
                          <td key={idx} className="p-2 border-b text-gray-700">
                            {val}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Speed Chart */}
                <SpeedChart data={result.data} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

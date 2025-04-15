import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import TelemetryPage from './pages/TelemetryPage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="hover:underline">Upload</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/telemetry" className="hover:underline">Telemetry</Link>
          <Link to="/analysis" className="hover:underline">Analysis</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/telemetry" element={<TelemetryPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

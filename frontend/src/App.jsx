import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UploadPage from './pages/UploadPage'; // ✅ make sure this is at the top

const Dummy = ({ title }) => (
  <div className="text-center py-10">
    <h2 className="text-3xl font-semibold">{title}</h2>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UploadPage />} /> {/* ✅ only one index route */}
          <Route path="dashboard" element={<Dummy title="Dashboard" />} />
          <Route path="telemetry" element={<Dummy title="Telemetry" />} />
          <Route path="analysis" element={<Dummy title="Analysis" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

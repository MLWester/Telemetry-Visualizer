import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300">
      <header className="p-4 border-b border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Telemetry Visualizer</h1>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-500">Upload</Link>
            <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
            <Link to="/telemetry" className="hover:text-blue-500">Telemetry</Link>
            <Link to="/analysis" className="hover:text-blue-500">Analysis</Link>
          </nav>
        </div>
      </header>

      <main className="p-6 max-w-screen-lg mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

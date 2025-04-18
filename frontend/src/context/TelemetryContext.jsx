import { createContext, useState, useContext } from "react";

const TelemetryContext = createContext();

export function TelemetryProvider({ children }) {
  const [telemetryData, setTelemetryData] = useState([]);

  const addTelemetry = (newData) => {
    setTelemetryData((prev) => [...prev, newData]);
  };

  const clearTelemetry = () => {
    setTelemetryData([]);
  };

  return (
    <TelemetryContext.Provider value={{ telemetryData, addTelemetry, clearTelemetry }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  return useContext(TelemetryContext);
}

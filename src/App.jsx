import Dashboard from "./components/dashboard/dashboard";
import NavbarHorizontal from "./components/navigation/navbarHorizontal";
import NavbarVertical from "./components/navigation/navbarVertical";
import React from "react";

function App() {
  return (
    <div className="App">
      <NavbarHorizontal />
      <div>
        <NavbarVertical />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;

import NavbarHorizontal from "./components/navigation/navbarHorizontal";
import NavbarVertical from "./components/navigation/navbarVertical";
import { Outlet } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <NavbarHorizontal />
      <div>
        <NavbarVertical />
        <Outlet />
      </div>
    </div>
  );
}

export default App;

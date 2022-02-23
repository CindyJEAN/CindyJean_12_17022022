import NavbarHorizontal from "./components/navigation/navbarHorizontal";
import NavbarVertical from "./components/navigation/navbarVertical";
import React from "react";

function App() {
  return (
    <div className="App">
      <NavbarHorizontal />
      <NavbarVertical />
      <main>
        <h1>main component</h1>
      </main>
    </div>
  );
}

export default App;

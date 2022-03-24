import React, { useEffect } from "react";
import { getData, getUserMainData } from "./services/dataManager";
import Dashboard from "./components/dashboard/dashboard";
import NavbarHorizontal from "./components/navigation/navbarHorizontal";
import NavbarVertical from "./components/navigation/navbarVertical";
// import { StoreContext } from "./providers/store";

function App() {
  // const [data, updateData] = React.useContext(StoreContext);

  // const login = () => {
  //   updateStore({ name: "loading" });
  //   getData();
  // };
  useEffect(() => {
    getUserMainData();
  }, []);

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

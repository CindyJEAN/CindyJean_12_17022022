/**
 * contains all global values and method in order to update
 * @typedef  {Object}   storage
 * @property {Object}   get contain all global values
 * @property {Function} set method in order to update values
 */
import React from "react";
import defaultData from "../defaultData";

const StoreContext = React.createContext(undefined);
/**
 * @type {storage}
 */
const store = {
  get: {},
  set: () => {},
};

function StoreProvider({ children }) {
  const [data, setData] = React.useState(defaultData);
  store.get = data;
  store.set = (newData) => update(newData);

  function update(newData) {
    setData({
      ...data,
      ...newData,
    });
  }

  return (
    <StoreContext.Provider value={[data, update]}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreProvider, StoreContext, store };

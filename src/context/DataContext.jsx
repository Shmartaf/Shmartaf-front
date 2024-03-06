import React, { createContext, useContext, useState, useEffect } from "react";
import { getAll } from "../api";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [parents, setParents] = useState([]);

  const fetchParent = (id) => {
    return parents.find((parent) => parent.id === id);
  };

  const fetchBabysitter = (id) => {
    return babysitters.find((babysitter) => babysitter.id === id);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const babysittersData = await getAll("babysitters");
        const parentsData = await getAll("parents");

        setBabysitters(babysittersData);
        setParents(parentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const contextValue = {
    babysitters,
    parents,
    fetchParent,
    fetchBabysitter,
  };

  return (
    <DataContext.Provider value={{ babysitters, parents }}>
      {children}
    </DataContext.Provider>
  );
};

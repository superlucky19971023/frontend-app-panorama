import React, { useState, createContext } from 'react';
import { useTranslation } from 'react-i18next';

export const DashboardTypeContext = createContext({
  dashboardType: "",
  changeDashboardType: () => { },
  changeError: () => { },
  changeLoader: () => { },
  handleDataReceived: () => { },
  itemsMenu: [],
});

export function DashboardTypeProvider({ children }) {
  const [dashboardType, setDashboardType] = useState("");
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
  const { i18n } = useTranslation(["global", "terms"]);

  const changeDashboardType = (value) => {
    setDashboardType(value);
  };

  const handleDataReceived = (data) => {
    setResponse(data);
  };

  const changeError = (error) => {
    setError(error);
  };

  const changeLoader = (loader) => {
    setLoader(loader);
  };

  return (
    <DashboardTypeContext.Provider
      value={{
        dashboardType,
        changeDashboardType,
        handleDataReceived,
        changeError,
        changeLoader,
        loader,
        error,
        response,
      }}
    >
      {children}
    </DashboardTypeContext.Provider>
  );
}

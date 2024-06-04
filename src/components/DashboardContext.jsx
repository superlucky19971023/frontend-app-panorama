import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const DashboardTypeContext = createContext({
  dashboardType: '',
  changeDashboardType: () => { },
  changeError: () => { },
  changeLoader: () => { },
  changeHomeMode : () => {},
  handleDataReceived: () => { },
  itemsMenu: [],
  userRole: 'READER',
  homeMode: 'DEMO',
});

export const DashboardTypeProvider = ({ children }) => {
  const [dashboardType, setDashboardType] = useState('');
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');
  const [dashboardFunction, setDashboardFunction] = useState('READER');
  const [homeMode, setHomeMode] = useState('DEMO')

  const changeDashboardFunction = (value) => {
    setDashboardFunction(value);
  };

  const changeDashboardType = (value) => {
    setDashboardType(value);
  };

  const changeHomeMode = (value) => {
    setHomeMode(value);
  };

  const handleDataReceived = (data) => {
    setResponse(data);
  };

  const changeError = (newError) => {
    setError(newError);
  };

  const changeLoader = (newLoader) => {
    setLoader(newLoader);
  };

  const contextValue = useMemo(
    () => ({
      dashboardType,
      changeDashboardType,
      handleDataReceived,
      changeHomeMode,
      changeError,
      changeLoader,
      loader,
      error,
      response,
      changeDashboardFunction,
      dashboardFunction,
      homeMode,
    }),
    [dashboardType, loader, error, response, dashboardFunction, homeMode,],
  );

  return (
    <DashboardTypeContext.Provider value={contextValue}>
      {children}
    </DashboardTypeContext.Provider>
  );
};

DashboardTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

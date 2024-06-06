import React, { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DashboardTypeContext } from '../DashboardContext';
import Tabs from '../Tabs/Tabs';
import Embed from '../Embed';
import './stylesPanels.css';

const Panels = () => {
  const {
    dashboardType, loader, error, response,
  } = useContext(DashboardTypeContext);

  return (
    <div className="dashboard" id="dashboard">
      {!error && <Embed />}
      <Tabs />
      {!error && loader ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
        <div className="framesContainer" id="framesContainer">
          {response && response.map((item) => (
            <div
              key={item.name}
              style={{
                width: '100%',
                display: dashboardType === item.displayName ? 'flex' : 'none',
              }}
              id={`${item.name}Container`}
            />
          ))}
        </div>
      )}
      {error && (
        <div className="modal-container">
          <div className="warning-modal">
            <p className="modal-title">ERROR</p>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default Panels;

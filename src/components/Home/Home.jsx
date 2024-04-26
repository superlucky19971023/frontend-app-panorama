import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import { DashboardTypeContext } from '../DashboardContext';
import Tabs from '../Tabs/Tabs';
import Embed from '../Embed';

const Home = () => {
  const { dashboardType, loader, error, response } = useContext(DashboardTypeContext);
  const { t } = useTranslation(['global']);

  return (
    <div className="dashboard" id="dashboard">
      {!error && <Embed />}
      <Tabs />
      {!error && loader ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="framesContainer" id="framesContainer">
            {response &&
              response.map((item) => (
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
        </>
      )}
      {error && (
        <div className="home">
          <div className="errorMessage">
            <p>Error: {error} {t('errors.messageError')}</p>
            <a className="button-contact" href="/">
              {t('errors.btnBack')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

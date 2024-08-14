import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';
import { DashboardTypeContext } from '../DashboardContext';

const Home = () => {
  const { homeMode } = useContext(DashboardTypeContext);

  const {
    changeHomeMode, changeError,
  } = useContext(DashboardTypeContext);
  const { config } = useContext(AppContext);
  const [modeHome, setModeHome] = useState();
  const [iframeSrc, setIframeSrc] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${config.LMS_BASE_URL}/panorama/api/get-panorama-mode`;
        const { data } = await getAuthenticatedHttpClient().get(url);
        const enrollmentData = camelCaseObject(data);
        const home = enrollmentData.body;
        setModeHome(home);
        changeHomeMode(modeHome);
      } catch (error) {
        const httpErrorStatus = error?.response?.status;
        changeError(httpErrorStatus);
      }
    };
    fetchData();

    if (homeMode === 'FREE') {
      setIframeSrc('https://panorama-home-pages.s3.amazonaws.com/panorama-free-home.html');
    } else if (homeMode === 'SAAS') {
      setIframeSrc('https://panorama-home-pages.s3.amazonaws.com/panorama-saas-home.html');
    } else if (homeMode === 'CUSTOM') {
      setIframeSrc('https://panorama-home-pages.s3.amazonaws.com/panorama-custom-home.html');
    } else {
      setIframeSrc('https://panorama-home-pages.s3.amazonaws.com/panorama-demo-home.html');
    }
  }, [config.LMS_BASE_URL]);

  return (
    <div className="dashboard" id="dashboard">
      <div className="framesContainerHome" id="framesContainerHome">
        <iframe className="homes-iframe" src={iframeSrc} title="Home Mode" />
      </div>
    </div>
  );
};

export default Home;

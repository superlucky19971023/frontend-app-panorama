import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';
import { DashboardTypeContext } from '../DashboardContext';

const EmbedHome = () => {
  const {
    changeHomeMode, changeError,
  } = useContext(DashboardTypeContext);
  const { config } = useContext(AppContext);
  const [modeHome, setModeHome] = useState();

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
  }, [config.LMS_BASE_URL]);

  return null;
};

export default EmbedHome;

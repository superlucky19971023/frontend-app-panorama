import React, { useState, useEffect, useContext } from 'react';
import { DashboardTypeContext } from './DashboardContext';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk'

function Embed({ dashboardFunction }) {
  const { changeDashboardType, handleDataReceived, changeError, changeLoader } =
    useContext(DashboardTypeContext);

  const { config } = useContext(AppContext);
  const [response, setResponse] = useState(null);
  const [dashboardContainers, setDashboardContainers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = `${config.LMS_BASE_URL}/panorama/api/get-embed-url`;
      try {
        const { data } = await getAuthenticatedHttpClient().get(url);
        const enrollmentData = camelCaseObject(data);
        const urlResponse = await data.body;
        setResponse(urlResponse);
        handleDataReceived(urlResponse);

        const containers = {};
        for (let i = 0; i < urlResponse.length; i++) {
          containers[urlResponse[i].name] = document.createElement("div");
          containers[
            urlResponse[i].name
          ].id = `${urlResponse[i].name}Container`;
        }

        setDashboardContainers(containers);
        changeDashboardType(urlResponse[0].displayName);
        changeLoader(false);


      } catch (error) {
        const httpErrorStatus = error?.response?.status;
        changeError(httpErrorStatus);
        changeLoader(false);
      }
    };
    fetchData();
  }, [config.LMS_BASE_URL]);

  useEffect(() => {
    const embedDashboards = async () => {
      if (response) {
        const embeddingContext = await createEmbeddingContext();
        const { embedDashboard, embedConsole } = embeddingContext;

        for (let i = 0; i < response.length; i++) {
          const containerId = `${response[i].name}Container`;
          let container = document.getElementById(containerId);
          if (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          if (container) {
            const options = {
              url: response[i].url,
              container: container,
              width: "100%"
            };

            if (dashboardFunction === "author") {
              await embedConsole(options);
            } else {
              await embedDashboard(options);
            }
          } else {
            console.log(`El contenedor ${containerId} no existe.`);
          }
        }
        changeDashboardType(response[0]?.displayName || '');
        changeLoader(false);
      }
    };
    embedDashboards();
  }, [response]);

  return null;
}

export default Embed;

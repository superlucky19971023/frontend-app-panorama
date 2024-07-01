import { useState, useEffect, useContext } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';
import { DashboardTypeContext } from './DashboardContext';
 
const Embed = () => {
  const {
    changeDashboardType, handleDataReceived, changeError, changeLoader, dashboardFunction, userRole, changeUserRole,
  } = useContext(DashboardTypeContext);
  const { config, authenticatedUser } = useContext(AppContext);
  const [response, setResponse] = useState(null);
  const [dashboardContainers, setDashboardContainers] = useState({});
 
  useEffect(() => {
    const getUserRole = async () => {
      const response = await getAuthenticatedHttpClient().get(`${config.LMS_BASE_URL}/panorama/api/get-user-role`);
      changeUserRole(response.data.body)
    };
    getUserRole();
  }, []);
 
  useEffect(() => {
    changeLoader(true);
    const fetchData = async () => {
      try {
        const url = `${config.LMS_BASE_URL}/panorama/api/get-embed-url?dashboard_function=${dashboardFunction}`;
        const { data } = await getAuthenticatedHttpClient().get(url);
        const enrollmentData = camelCaseObject(data);
        const urlResponse = await enrollmentData.body;
        setResponse(urlResponse);
        handleDataReceived(urlResponse);
 
        const containers = {};
        for (let i = 0; i < urlResponse.length; i++) {
          containers[urlResponse[i].name] = document.createElement('div');
          containers[
            urlResponse[i].name
          ].id = `${urlResponse[i].name}Container`;
        }
 
        setDashboardContainers(containers);
        changeDashboardType(urlResponse[0].displayName);
        changeLoader(false);
      } catch (error) {
        const httpErrorStatus = error.message;
        changeError(httpErrorStatus);
        changeLoader(false);
      }
    };
    fetchData();
  }, [config.LMS_BASE_URL, dashboardFunction, userRole]);
 
  useEffect(() => {
    const embedDashboards = async () => {
      changeLoader(true);
      if (response) {
        const embeddingContext = await createEmbeddingContext();
        const { embedDashboard, embedConsole, embedQSearchBar } = embeddingContext;
 
        for (let i = 0; i < response.length; i++) {
          const containerId = `${response[i].name}Container`;
          const container = document.getElementById(containerId);
          if (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          if (container) {
            const options = {
              url: response[i].url,
              container: container,
              width: '100%',
            };
 
            if (dashboardFunction === 'AUTHOR') {
              embedConsole(options);
            } else if (dashboardFunction === 'READER') {
              if (userRole == 'STUDENT') {
                const contentOptions = {
                  parameters: [
                    {
                      Name: 'userId',
                      Values: [
                        authenticatedUser.userId,
                      ],
                    },
                    {
                      Name: 'lms',
                      Values: [
                        config.LMS_BASE_URL.split("//")[1],
                      ],
                    },
                    {
                      Name: 'userFullName',
                      Values: [
                        authenticatedUser.name,
                      ],
                    },
                    {
                      Name: 'userEmail',
                      Values: [
                        authenticatedUser.email,
                      ],
                    },
                  ],
                };
                const embededDashboard = await embedDashboard(options, contentOptions);
                embededDashboard.setParameters([
                {
                  Name: 'userId',
                  Values: authenticatedUser.userId,
                },
                {
                  Name: 'lms',
                  Values: config.LMS_BASE_URL.split("//")[1],
                },
                {
                  Name: 'userFullName',
                  Values: authenticatedUser.name,
                },
                {
                  Name: 'userEmail',
                  Values: authenticatedUser.email,
                }
              ]);
              } else {
                embedDashboard(options);
              }
            } else if (dashboardFunction === 'AI_AUTHOR') {
              embedQSearchBar(options);
            }
            changeLoader(false);
          }
        }
      }
    };
    embedDashboards();
  }, [response]);
  return null;
};
 
export default Embed;
import { useState, useEffect, useContext } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';
import { DashboardTypeContext } from './DashboardContext';

const Embed = () => {
  const {
    changeDashboardType, handleDataReceived, changeError, changeLoader, dashboardFunction, changeUserRole, userRole
  } = useContext(DashboardTypeContext);
  const { config, authenticatedUser } = useContext(AppContext);
  const [response, setResponse] = useState(null);
  const [dashboardContainers, setDashboardContainers] = useState({});
  // const [userRole, setUserRole] = useState("");

  const getUserRole = async () => {
    const response = await getAuthenticatedHttpClient().get(`${config.LMS_BASE_URL}/panorama/api/get-user-role`);
    changeUserRole(response.data.body);
  };

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
        getUserRole();
        console.log("user role", userRole )
      } catch (error) {
        const httpErrorStatus = error.message;
        changeError(httpErrorStatus);
        changeLoader(false);
      }
    };
    fetchData();
    const embedDashboards = async () => {
      changeLoader(true);
      if (response) {
        console.log("entre al if de response, userRole: ", userRole);
        const embeddingContext = await createEmbeddingContext();
        const { embedDashboard, embedConsole, embedQSearchBar } = embeddingContext;

        for (let i = 0; i < response.length; i++) {
          const containerId = `${response[i].name}Container`;
          const container = document.getElementById(containerId);
          console.log("container", container);
          if (container.firstChild) {
            console.log("entre al if de container first child")
            container.removeChild(container.firstChild);
          }
          if (container) {
            console.log("entre al if de container, userRole: ", userRole)
            const options = {
              url: response[i].url,
              container: container,
              width: '100%'
            };

            if (dashboardFunction === 'AUTHOR') {
              console.log("entre al if de author, userRole: ", userRole)
              embedConsole(options);
            } else if (dashboardFunction === 'READER') {
              console.log("entre al if de reader, user role: ", userRole)
              if (userRole == 'STUDENT'){
                console.log("entre al if de student, user role: ", userRole)
                const contentOptions = {
                  parameters: [
                    {
                      Name: 'userId',
                      Values: [
                        authenticatedUser.userId
                      ]
                    },
                    {
                      Name: 'lms',
                      Values: [
                        config.LMS_BASE_URL
                      ]
                    }
                  ]
                }  
                const embededDashboard = await embedDashboard(options, contentOptions);
                embededDashboard.setParameters([{
                  Name: 'userId',
                  Values: authenticatedUser.userId
                },
                {
                  Name: 'lms',
                  Values: config.LMS_BASE_URL
                }])
              } else {
                console.log("entre al else de reader")
                embedDashboard(options);
              }
            } else if (dashboardFunction === 'AI_AUTHOR') {
              console.log("entre al if de author ia")
              embedQSearchBar(options);
            }

            changeLoader(false);
          }
        }
      }
    };
    embedDashboards();
  }, [config.LMS_BASE_URL, dashboardFunction, response]);


  console.log("dashboardFunction", dashboardFunction);
  console.log("user role", userRole);
  console.log("authenticated user", authenticatedUser);
  console.log("response", response);
  

  return null;
};




export default Embed;

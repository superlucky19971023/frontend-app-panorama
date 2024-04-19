import { useState, useEffect, useContext } from 'react';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { get } from 'aws-amplify/api';
// import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import { DashboardTypeContext } from './DashboardContext';

function Embed({ dashboardFunction }) {
  const { changeDashboardType, handleDataReceived, changeError, changeLoader } =
    useContext(DashboardTypeContext);

  const [response, setResponse] = useState("");
  const [dashboardContainers, setDashboardContainers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAuthSession();
        console.log("user data", data)
        const jwtToken = data.tokens.idToken.toString();
        const payloadSub = data.tokens.idToken.payload.sub;
        const email = data.tokens.idToken.payload.email;

        const params = {
          headers: {},
          response: true,
          queryParams: {
            jwtToken: jwtToken,
            payloadSub: payloadSub,
            email: email,
            dashboardFunction: dashboardFunction,
          },
        };

        const restOperation = await get({
          apiName: "quicksight",
          path: "/getQuickSightDashboardEmbedURL",
          options: params,
        });
        const { body } = await restOperation.response;
        const urlResponse = await body.json();
        setResponse(urlResponse);

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
        handleDataReceived(urlResponse);
      } catch (error) {
        console.log(error);
        changeError(error?.$metadata?.httpStatusCode);
        changeLoader(false);
      }
    };
    fetchData();
  }, [dashboardFunction]);

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
            if (dashboardFunction == "author") {
              await embedConsole(options);
            } else {
              await embedDashboard(options);
            }
          } else {
            console.log(`El contenedor ${containerId} no existe.`);
          }
        }
      }
    };
    embedDashboards();
  }, [response]);

  return null;
}

export default Embed;

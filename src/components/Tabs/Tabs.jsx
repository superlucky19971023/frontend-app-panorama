import React, { useContext, useState, useEffect } from 'react';
import { DashboardTypeContext } from '../DashboardContext';
import './stylesTabs.css';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';

const Tabs = () => {
  const { changeDashboardType, dashboardType, response, dashboardFunction, changeDashboardFunction } = useContext(DashboardTypeContext);
  const [itemsMenu, setItemsMenu] = useState([]);
  const [showTabs, setShowTabs] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { config } = useContext(AppContext);
  
  const getUserRole = async () =>{
    const response = await getAuthenticatedHttpClient().get(`${config.LMS_BASE_URL}/panorama/api/get-user-role`);
    
    setUserRole(response.data.body);
  }

  useEffect(() => {
    getUserRole();
  }, []);


  const handleMenuClick = (value) => {
    changeDashboardType(value);
  };

  const ChangeShowTabs = (e) => {
    if (e.target.name == "dashboards-button"){
      setShowTabs(!showTabs);
      setShowMenu(true);
    }

    changeDashboardFunction(e.target.value);

  };

  useEffect(() => {
    if (response && response.length > 0 && itemsMenu.length === 0) {
      const updatedItemsMenu = [];
      for (let i = 0; i < response.length; i++) {
        updatedItemsMenu.push(response[i].displayName);
      }
      setItemsMenu(updatedItemsMenu);
    }
  }, [response, itemsMenu]);

  console.log("dashboard function", dashboardFunction);
  console.log("user role", userRole);

  return (
    <div className="content-tabs">
      <div className="sidebar">
        {(userRole == "AUTHOR" || userRole == "AI_AUTHOR") && <button type="button" className={`buttonMenu ${(dashboardFunction == "AUTHOR" ||  dashboardFunction == "AI_AUTHOR") && "disabled"}`} onClick={ChangeShowTabs} value={userRole == "AUTHOR" ? "AUTHOR" : "AI_AUTHOR"}>Studio</button>}
        <button type="button" className={`buttonMenu`} onClick={ChangeShowTabs} name="dashboards-button" value="READER">Dashboards</button>
      </div>

      {(showMenu && dashboardFunction == "READER") && (
        <div className={`tab-container ${showTabs ? 'open' : 'close'}`}>
          {itemsMenu.map((item, index) => (
            <div id={`tab${index}`} className="tab" key={item.id || `item_${index}`}>
              <a
                className={`${item === dashboardType ? 'selected' : ''}`}
                aria-current="page"
                href={`#${item}`}
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </a>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Tabs;

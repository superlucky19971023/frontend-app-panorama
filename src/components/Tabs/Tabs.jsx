import React, { useContext, useState, useEffect } from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { DashboardTypeContext } from '../DashboardContext';
import './stylesTabs.css';

const Tabs = () => {
  const { changeDashboardType, dashboardType, response } = useContext(DashboardTypeContext);
  const [itemsMenu, setItemsMenu] = useState([]);
  const [showTabs, setShowTabs] = useState();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (value) => {
    changeDashboardType(value);
  };

  const ChanngeShowTabs = () => {
    setShowTabs(!showTabs);
    setShowMenu(true);
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

  return (
    <div className="content-tabs">
      <div className="sidebar">
        <button type="button" className="buttonMenu" onClick={ChanngeShowTabs}>Dashboard</button>
      </div>

      {showMenu && (
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

import React from 'react';
import logoPanorama from '../../images/panorama-by-aulasneo.png';
import './stylesHeader.css';

const Header = () => (
  <div className="header">
    <div className="content-header">
      <img src={logoPanorama} alt="Logo" className="logoPanorama" />
      <a href='"".concat(getConfig().LMS_BASE_URL, "/dashboard")'>Courses</a>
    </div>
  </div>
);

export default Header;

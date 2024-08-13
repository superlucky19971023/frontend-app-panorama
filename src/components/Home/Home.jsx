import React, { useContext } from 'react';
import { DashboardTypeContext } from '../DashboardContext';
import EmbedHome from './EmbedHome';

const Home = () => {
  const { homeMode } = useContext(DashboardTypeContext);

  // let iframeSrc;
  // if (homeMode === 'FREE') {
  //   iframeSrc = 'https://panorama-home-pages.s3.amazonaws.com/panorama-free-home.html';
  // } else if (homeMode === 'SAAS') {
  //   iframeSrc = 'https://panorama-home-pages.s3.amazonaws.com/panorama-saas-home.html';
  // } else if (homeMode === 'CUSTOM') {
  //   iframeSrc = 'https://panorama-home-pages.s3.amazonaws.com/panorama-custom-home.html';
  // } else {
  //   iframeSrc = 'https://panorama-home-pages.s3.amazonaws.com/panorama-demo-home.html';
  // }

  let iframeSrc = 'https://panorama-home-pages.s3.amazonaws.com/panorama-home.html';

  return (
    <div className="dashboard" id="dashboard">
      <EmbedHome />
      <div className="framesContainerHome" id="framesContainerHome">
        <iframe className="homes-iframe" src={iframeSrc} title="Home Mode"></iframe>
      </div>
    </div>
  );
};

export default Home;

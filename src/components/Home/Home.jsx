import React, { useContext } from 'react';
import { DashboardTypeContext } from '../DashboardContext';
import EmbedHome from './EmbedHome';

const Home = () => {
    const {
        homeMode,
    } = useContext(DashboardTypeContext);

    return (
        <div className="dashboard" id="dashboard">
            <EmbedHome />
            <div className="framesContainerHome" id="framesContainerHome">
                {
                    (homeMode === 'FREE') ? (
                        <iframe className="homes-iframe" src="https://panorama-home-pages.s3.amazonaws.com/panorama-free-home.html"></iframe>
                    ) : (homeMode === 'SAAS') ? (
                        <iframe className="homes-iframe" src="https://panorama-home-pages.s3.amazonaws.com/panorama-saas-home.html"></iframe>
                    ) : (homeMode === 'CUSTOM') ? (
                        <iframe className="homes-iframe" src="https://panorama-home-pages.s3.amazonaws.com/panorama-custom-home.html"></iframe>
                    ) : (
                        <iframe className="homes-iframe" src="https://panorama-home-pages.s3.amazonaws.com/panorama-demo-home.html"></iframe>
                    )
                }
            </div>
        </div>
    );
};

export default Home;

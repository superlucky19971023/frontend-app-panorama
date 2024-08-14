import { Route, Routes } from 'react-router-dom';
import { DashboardTypeProvider } from './components/DashboardContext';
import Panels from './components/Panels/Panels';
import Home from './components/Home/Home';

const AppPanorama = () => {

  return (
    <main>
      <div className="content-panorama">
        <DashboardTypeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/panels" element={<Panels />} />
          </Routes>
        </DashboardTypeProvider>
      </div>
    </main>
  );
};

export default AppPanorama;

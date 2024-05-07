import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import { DashboardTypeProvider } from './components/DashboardContext';

const AppPanorama = () => (
  <main>
    <div className="content-panorama">
      <DashboardTypeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </DashboardTypeProvider>
    </div>
  </main>
);

export default AppPanorama;

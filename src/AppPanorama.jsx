import { Route, Routes } from 'react-router-dom';
import Init from './components/Init/Init';
import TermsOfUse from './components/TermsOfUse/TermsOfUse';
import Home from './components/Home/Home';

const AppPanorama = () => (
  <main>
    <div className="content-panorama">
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/panels" element={<Home />} />
      </Routes>
    </div>
  </main>
);

export default AppPanorama;

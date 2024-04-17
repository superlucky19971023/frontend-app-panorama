import { Route, Routes } from 'react-router-dom';
import Init from '../../components/Init/Init';
import TermsOfUse from '../../components/TermsOfUse/TermsOfUse';
import Panels from '../../components/Panels/Panels';

const AppPanorama = () => (
  <main>
    <div className="content-panorama">
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/panels" element={<Panels />} />
      </Routes>
    </div>
  </main>
);

export default AppPanorama;

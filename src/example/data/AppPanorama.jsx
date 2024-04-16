import { Container } from '@openedx/paragon';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Init from '../../components/Init/Init';

const AppPanorama = () => (
  <main>
    <Container className="py-5">
      <Header />
      <Init/>
      <Footer />
    </Container>
  </main>
);

export default AppPanorama;

import { Container } from '@openedx/paragon';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AppPanorama = () => (
  <main>
    <Container className="py-5">
      <Header />

      <Footer />
    </Container>
  </main>
);

export default AppPanorama;

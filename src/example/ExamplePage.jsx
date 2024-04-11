import { Container } from '@openedx/paragon';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const ExamplePage = () => (
  <main>
    <Container className="py-5">
      <Header />
      <h1>Welcome</h1>
      <p>to PANORAMA by Aulasneo</p>
      <Footer />
    </Container>
  </main>
);

export default ExamplePage;

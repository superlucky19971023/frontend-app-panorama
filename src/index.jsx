import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import ExamplePage from './example/ExamplePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './index.scss';

ReactDOM.render(
  <>
    <Header />
    <ExamplePage />
    <Footer />
  </>,
  document.getElementById('root'),
);

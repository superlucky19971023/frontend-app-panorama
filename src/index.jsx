import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { AppProvider } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import ExamplePage from './example/ExamplePage';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import './index.scss';

ReactDOM.render(
  <AppProvider>
    <Header />
    <ExamplePage />
    <Footer />
  </AppProvider>,
  document.getElementById('root'),
);

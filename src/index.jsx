import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import AppPanorama from './AppPanorama';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import './index.scss';

ReactDOM.render(
  <AppProvider>
    <Header />
    <AppPanorama />
    <Footer />
  </AppProvider>,
  document.getElementById('root'),
);

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';

import { AppProvider } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import messages from './i18n';
import AppPanorama from './AppPanorama';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Header />
      <AppPanorama />
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

initialize({
  messages,
});


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import AppPanorama from './AppPanorama';

import { IntlProvider } from 'react-intl';
import './index.scss';

const messages = {
  en: {
    someMessageId: 'Hello, World!',
  },
};

ReactDOM.render(

  <IntlProvider locale="en" messages={messages.en}>
    
      <Header />
      <AppPanorama />
      <Footer />
    
  </IntlProvider>,
  document.getElementById('root'),
);

// subscribe(APP_INIT_ERROR, (error) => {
//   ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
// });

initialize({
  messages,
});
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import messages from './i18n';
import AppPanorama from './AppPanorama';
import './index.scss';
subscribe(APP_READY, () => {

  console.log("subscribe", APP_INIT_ERROR, APP_READY, subscribe, initialize)

  ReactDOM.render(
    <>
      <Header />
      <AppPanorama />
      <Footer />
    </>,
    document.getElementById('root'),
  );
});
  subscribe(APP_INIT_ERROR, (error) => {
    ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
  });
initialize({
  messages,
});

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import ReactDOM from 'react-dom';
// import {
//   APP_INIT_ERROR, APP_READY, subscribe, initialize,
//   mergeConfig,
// } from '@edx/frontend-platform';
// import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
// import Header from '@edx/frontend-component-header';
// import Footer from '@edx/frontend-component-footer';
// import AppPanorama from './AppPanorama';

// import { IntlProvider } from 'react-intl';
// import './index.scss';

// const messages = {
//   en: {
//     someMessageId: 'Hello, World!',
//   },
// };

// ReactDOM.render(

//   <IntlProvider locale="en" messages={messages.en}>
//     <AppProvider>
//       <Header />
//       <AppPanorama />
//       <Footer />
//     </AppProvider>
//   </IntlProvider>,
//   document.getElementById('root'),
// );

// // subscribe(APP_INIT_ERROR, (error) => {
// //   ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
// // });

// initialize({
//   messages,
// });
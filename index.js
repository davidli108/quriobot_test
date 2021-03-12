import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App';
import store from './redux/configureStore';
import { API_BASE_URL } from './constants';

axios.defaults.baseURL = API_BASE_URL;

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(RootApp);

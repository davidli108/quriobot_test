import React, { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import axios from 'axios';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from './graphql/Rehydrated';

import App from './App';
import store from './redux/configureStore';
import { API_BASE_URL } from './constants';
import { getAppSyncClient } from './graphql';

axios.defaults.baseURL = API_BASE_URL;

const RootApp = () => {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const getClient = async () => {
      const client = await getAppSyncClient();
      setClient(client);
    };
    getClient();
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <Provider store={store}>
          <App />
        </Provider>
      </Rehydrated>
    </ApolloProvider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(RootApp);

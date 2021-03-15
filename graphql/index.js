import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
// import fetch from 'isomorphic-fetch';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import Auth from '@aws-amplify/auth';
import { getApiConfig } from '../config/api';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const getAppSyncClient = async () => {
  const apiConfig = getApiConfig();
  const graphqlAPIURL = apiConfig.GRAPHQL_API_URL;
  const graphqlAPIRegion = apiConfig.GRAPHQL_API_REGION;
  const graphqlAPICognitoIdentityPoolId =
    apiConfig.GRAPHQL_API_COGNITO_IDENTITIY_POOL_ID;

  Auth.configure({
    region: graphqlAPIRegion,
    identityPoolRegion: graphqlAPIRegion,
    identityPoolId: graphqlAPICognitoIdentityPoolId,
  });

  const getCredential = async () => {
    const URL = 'https://cognito-identity.eu-west-1.amazonaws.com/';
    const {
      data: { IdentityId, Credentials },
    } = await axios.post(
      URL,
      {
        IdentityId: apiConfig.GRAPHQL_API_COGNITO_IDENTITIY_POOL_ID,
      },
      {
        headers: {
          'content-type': 'application/x-amz-json-1.1',
          'x-amz-target': 'AWSCognitoIdentityService.GetCredentialsForIdentity',
        },
      }
    );

    return {
      accessKeyId: Credentials.AccessKeyId,
      secretAccessKey: Credentials.SecretKey,
      sessionToken: Credentials.SessionToken,
      identityId: IdentityId,
      authenticated: true,
    };
  };

  const appSyncClientOptions = {
    url: graphqlAPIURL,
    region: graphqlAPIRegion,
    auth: {
      type: 'AWS_IAM',
      credentials: getCredential(),
    },
    disableOffline: false,
    offlineConfig: {
      callback: (err, succ) => {
        if (err) {
          const { mutation, variables } = err;
          console.warn(
            `ERROR for ${mutation}, ${JSON.stringify(variables)}`,
            err
          );
        } else {
          const { mutation, variables } = succ;
          console.debug(
            `SUCCESS for ${mutation} ${JSON.stringify(variables)}`,
            succ
          );
        }
      },
    },
  };
  const apolloClientOptions = {
    link: createAppSyncLink({
      ...appSyncClientOptions,
      resultsFetcherLink: ApolloLink.from([
        setContext(async (request, previousContext) => {
          const token = await AsyncStorage.getItem('token');
          return {
            headers: {
              ...previousContext.headers,
              xAuthorization: `Bearer ${token || ''}`,
              origin: 'https://control.quriobot.com',
              'content-length': 1227,
            },
          };
        }),
        createHttpLink({
          uri: appSyncClientOptions.url,
          fetch,
        }),
      ]),
    }),
    ssrMode: false,
  };

  const graphqlClient = new AWSAppSyncClient(
    appSyncClientOptions,
    apolloClientOptions
  );

  return graphqlClient;
};

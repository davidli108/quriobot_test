import { put } from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { actions } from '../authSlice';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export function* handleLogin(action) {
  const { captchaMsg, userEmail, userPassword } = action.payload;
  const { setUserInfo } = actions;
  try {
    const response = yield axios.post('/login', {
      password: userPassword,
      username: userEmail,
      recaptcha_response: captchaMsg,
    });
    const { data } = response;
    yield AsyncStorage.setItem('token', data.token);

    yield put(setUserInfo(data.user));
  } catch (error) {
    console.log(error);
  }
}

export function* handleFetchOrgans() {
  const { setOrganisations } = actions;

  try {
    const userData = yield AsyncStorage.getItem('token');
    const response = yield axios.post(
      '/autocomplete/Organisation',
      {
        ids: [],
        page_number: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${userData}`,
        },
      }
    );
    yield put(setOrganisations(response.data.items));
  } catch (err) {
    console.log(err);
  }
}

import { takeLatest } from 'redux-saga/effects';
import { handleFetchOrgans, handleLogin } from './authSaga';
import { actions as authActions } from '../authSlice';
import { handleFetchBotsList, handleFetchBotResponse } from './botSaga';
import { actions as botActions } from '../botSlice';

export function* watcherSaga() {
  const { login, getOrganisations } = authActions;
  const { getBotList, getResponseList } = botActions;

  yield takeLatest(login.type, handleLogin);
  yield takeLatest(getOrganisations.type, handleFetchOrgans);
  yield takeLatest(getBotList.type, handleFetchBotsList);
  yield takeLatest(getResponseList.type, handleFetchBotResponse);
}

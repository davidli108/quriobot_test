import { put } from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { actions } from '../botSlice';
import { PAGE_SIZE } from '../../constants';

export function* handleFetchBotsList(action) {
  const { orgId, pgNum } = action.payload;
  const { setBotList } = actions;
  try {
    const userData = yield AsyncStorage.getItem('token');
    const response = yield axios.post(
      '/bots/list',
      {
        page_number: pgNum + 1,
        page_size: PAGE_SIZE,
        search: null,
        sort_on: 'id',
        sort_order: 'asc',
      },
      {
        headers: {
          Authorization: `Bearer ${userData}`,
          organisation: orgId,
        },
      }
    );

    yield put(setBotList(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleFetchBotResponse(action) {
  const { botId, pgNum, orgId } = action.payload;
  const { setResponseList } = actions;
  try {
    const userData = yield AsyncStorage.getItem('token');
    const response = yield axios.post(
      '/bots/responses/list',
      {
        channel: null,
        contact: null,
        begin: null,
        end: null,
        bot: botId,
        page_number: pgNum + 1,
        is_complete: null,
        page_size: PAGE_SIZE,
        search: null,
        sort_on: 'id',
        sort_order: 'asc',
        time_range: 'one_week',
      },
      {
        headers: {
          Authorization: `Bearer ${userData}`,
          organisation: orgId,
        },
      }
    );

    yield put(setResponseList(response.data));
  } catch (error) {
    console.log(error);
  }
}

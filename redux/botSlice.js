import { createSlice } from '@reduxjs/toolkit';

const botSlice = createSlice({
  name: 'botList',
  initialState: {
    botListInfo: {
      count: 0,
      items: [],
    },
    responseListInfo: {
      count: 0,
      items: [],
    },
    selectedResponse: null,
    loading: false,
  },

  reducers: {
    getBotList(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    setBotList(state, action) {
      return {
        ...state,
        botListInfo: action.payload,
        loading: false,
      };
    },

    getResponseList(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    setResponseList(state, action) {
      return {
        ...state,
        responseListInfo: action.payload,
        loading: false,
      };
    },

    getSelectedResponse() {},
    setSelectedResponse(state, action) {
      return {
        ...state,
        selectedResponse: action.payload,
      };
    },
  },
});

export const actions = botSlice.actions;

export default botSlice.reducer;

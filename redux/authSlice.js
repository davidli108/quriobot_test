import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    userInfo: null,
    organisations: [],
    loading: false,
  },

  reducers: {
    login(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getOrganisations(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    },
    setOrganisations(state, action) {
      return {
        ...state,
        organisations: action.payload,
        loading: false,
      };
    },
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;

import {
  // createEntityAdapter,
  createSlice,
  // nanoid,
  // createSelector,
} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: {
      reducer(state, action) {
        return (state = { ...state, ...action.payload });
      },
      prepare(data) {
        return {
          payload: data,
        };
      },
    },
    resetUser: (state) => (state = initialState),
  },
});

export const { loadUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

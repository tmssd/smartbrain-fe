import {
  createEntityAdapter,
  createSlice,
  nanoid,
  createSelector,
} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  entries: 0,
  joined: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // signInCredentialsAdded: {
    //   reducer(state, action) {
    //     state = action.payload;
    //   },
    //   prepare(email, password) {
    //     return {
    //       payload: {
    //         signInEmailAdded: email,
    //         signInPassword: password,
    //       },
    //     };
    //   },
    // },
    // setUser(state, action) {
    //   // console.log(state);
    //   // console.log(action);
    //   state = action.payload;
    // },
    loadUser(state, action) {
      state = action.payload;
    },
    initUser: (state) => (state = initialState),
  },
});

export const { loadUser, setUser, signInCredentialsAdded, initUser } =
  userSlice.actions;
export default userSlice.reducer;

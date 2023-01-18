// import {
//   createEntityAdapter,
//   createSlice,
//   nanoid,
//   createSelector,
// } from '@reduxjs/toolkit';

// const initialState = {
//   signInEmail: null,
//   signInPassword: null,
// };

// const signinSlice = createSlice({
//   name: 'signin',
//   initialState,
//   reducers: {
//     signInCredentialsAdded: {
//       reducer(state, action) {
//         state = action.payload;
//       },
//       prepare(email, password) {
//         return {
//           payload: {
//             signInEmailAdded: email,
//             signInPassword: password,
//           },
//         };
//       },
//     },
//     signInEmailAdded(state, action) {
//       // console.log(state);
//       // console.log(action);
//       state.signInEmail = action.payload;
//     },
//     signInPasswordAdded(state, action) {
//       state.signInPassword = action.payload;
//     },
//     userLoggedOut: (state) => (state = initialState),
//   },
// });

// export const {
//   signInEmailAdded,
//   signInPasswordAdded,
//   signInCredentialsAdded,
//   userLoggedOut,
// } = signinSlice.actions;
// export default signinSlice.reducer;

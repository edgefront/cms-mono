import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: 0,
  },
  reducers: {
    logIn: (state, action)=> {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.logged = 1;
      state.userName = action.payload.username;
    },
    logOut: state => {
      state.logged = 0;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const logInRequest = user => dispatch => {
  // setTimeout(() => {
  //   dispatch(incrementByAmount(amount));
  // }, 1000);
  fetch('').then(res => {
    dispatch(logIn(user))
  })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLogged = state => state.auth.logged;

export default authSlice.reducer;
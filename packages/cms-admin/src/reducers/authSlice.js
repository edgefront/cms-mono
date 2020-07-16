import { createSlice } from '@reduxjs/toolkit';
import { http } from '../helper'

// see https://github.com/reduxjs/cra-template-redux/tree/v1.0.2/template/src  
// and https://github.com/reduxjs/redux-toolkit/tree/v1.3.6/docs
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: 0,
    username: null,
  },
  reducers: {
    logIn: (state, action)=> {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.logged = 1;
      state.username = action.payload.username;
    },
    logOut: state => {
      state.logged = 0;
      state.username = null
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
  // TODO refactor here, wrap axios or fetch
  http.post('auth/login', {
      name: user.username,
      password: user.password
    }).then(res => {
      console.log(res)
      if (res.data) {
        dispatch(logIn(user))
      } else {
        console.log('login error')
      }
  })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAuth = state => state.auth;

export default authSlice.reducer;
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import AdminLayout from './components/AdminLayout'
import './scss/index.scss';
import loadable from '@loadable/component'
const Login = loadable(() => import('./pages/login'))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/">
          <AdminLayout></AdminLayout>
        </Route>
      </Switch>

    </div>
  );
}

export default App;

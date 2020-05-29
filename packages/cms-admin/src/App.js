import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import AdminLayout from './components/AdminLayout'
import './scss/index.scss';
import AsyncPage from './components/AsyncPage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <AsyncPage file="login" />
        </Route>
        <Route path="/">
          <AdminLayout></AdminLayout>
        </Route>
      </Switch>

    </div>
  );
}

export default App;

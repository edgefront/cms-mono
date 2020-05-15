import { innerHTML } from '../helper'
import React, {Suspense} from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from '../logo.svg';
import routes from '../routes'

const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

function Layout(){
  return (
    <div className="container">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>
          Desc
        </p>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <main className="page-container">
        <Suspense fallback={loading()}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                    <route.component {...props} />
                  )} />
              ) : (null);
            })}
          </Switch>
        </Suspense>
      </main>
      <footer {...innerHTML('&copy; EdgeFront Inc')}></footer>
    </div>
  )
}

export { Layout, Layout as default }

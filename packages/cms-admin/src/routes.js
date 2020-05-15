// import { lazy } from 'react';
import lazy from '@loadable/component'


// https://reacttraining.com/react-router/web/example/route-config
const routes = [
  { path: '/', exact: true, component: lazy(() => import('./pages/home')) },
  { path: '/about', component: lazy(() => import('./pages/about')) },
  { path: '/users', exact: true, component: lazy(() => import('./pages/users')) },
];

export default routes;
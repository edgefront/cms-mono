 import { lazy } from 'react';

const routes = [
  { path: '/', exact: true, component: lazy(() => import('./pages/home')) },
  { path: '/about', component: lazy(() => import('./pages/about')) },
  { path: '/users', exact: true, component: lazy(() => import('./pages/users')) },
];

export default routes;
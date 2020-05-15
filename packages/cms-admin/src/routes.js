import React from 'react';

const Home = React.lazy(() => import('./pages/home'));
const About = React.lazy(() => import('./pages/about'));
const Users = React.lazy(() => import('./pages/users'));

const routes = [
  { path: '/', exact: true, component: Home },
  { path: '/about', component: About },
  { path: '/users', exact: true, component: Users },
];

export default routes;
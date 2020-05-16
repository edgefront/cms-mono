import React from 'react';
import loadable from '@loadable/component'

const DefaultLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
const AsyncPage = loadable(props => import(`./pages/${props.file}`), {
  fallback: <DefaultLoading></DefaultLoading>
})
// https://reacttraining.com/react-router/web/example/route-config
let routes = [
  { path: '/', exact: true, file: 'home' },
  { path: '/about' },
  { path: '/users', exact: true },
];

routes.forEach(v => {
  if (!v.file) {
    v.file = String(v.path).substring(1)
  }
  v.component = AsyncPage;
})

export default routes;
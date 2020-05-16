import AsyncPage from './components/AsyncPage'

// https://reacttraining.com/react-router/web/example/route-config
// https://loadable-components.com/docs/dynamic-import/
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
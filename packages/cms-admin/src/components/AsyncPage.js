import React from 'react';
import loadable from '@loadable/component'

// https://loadable-components.com/docs/dynamic-import/
const DefaultLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
const AsyncPage = loadable(props => import(`../pages/${props.file}`), {
  fallback: <DefaultLoading></DefaultLoading>
})

export {DefaultLoading, AsyncPage, AsyncPage as default}
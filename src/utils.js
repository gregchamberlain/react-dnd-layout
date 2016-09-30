import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RootLayout from './layouts/root_layout';

const renderToString = (items, rootId, comps = {}, info = {}) => ReactDOMServer.renderToString(
  <RootLayout
    items={items}
    components={comps}
    rootId={rootId} />
);



export default renderToString;

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticLayout from './layouts/static_layout';

const renderToString = (items, rootId, comps = {}, info = {}) => ReactDOMServer.renderToString(
  <StaticLayout
    items={items}
    components={comps}
    rootId={rootId} />
);



export default renderToString;

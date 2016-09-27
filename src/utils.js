import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RootLayout } from '../src';

const renderToString = (items, rootId, comps = {}, info = {}) => ReactDOMServer.renderToString(
  <RootLayout
    items={items}
    components={comps}
    rootId={rootId} />
);

export default renderToString;

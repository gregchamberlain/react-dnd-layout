import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { item } from './redux/schema';
import { normalize } from 'normalizr';
import Layout from './stateless_layout_container';

const LayoutProvider = ({ rootItem }) => (
  <Provider store={configureStore(normalize(rootItem, item).entities.items)}>
    <Layout id={rootItem.id}/>
  </Provider>
);

export default LayoutProvider;

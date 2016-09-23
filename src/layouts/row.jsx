import React from 'react';
import Layout from '../stateless_layout_container';

const RowLayout = (props) => (
  <Layout {...props} row />
);

RowLayout.defaultProps = Layout.defaultProps;

export default RowLayout;

import React from 'react';
import Layout from '../stateless_layout_container';

const ColumnLayout = props => (
  <Layout {...props} />
);

ColumnLayout.defaultProps = Layout.defaultProps;

export default ColumnLayout;

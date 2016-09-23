import React from 'react';
import Layout from '../stateless_layout_container';

const RowLayout = (props) => (
  <Layout {...props} row />
);

RowLayout.defaultProps = Layout.defaultProps;
RowLayout.propInputs = Layout.propInputs;

export default RowLayout;

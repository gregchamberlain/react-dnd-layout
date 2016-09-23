import React from 'react';
import Layout from '../stateless_layout_container';

const ColumnLayout = props => (
  <Layout {...props} />
);

ColumnLayout.defaultProps = {...Layout.defaultProps};
ColumnLayout.defaultProps.style = {...Layout.defaultProps.style, ...{display: 'block'}};
ColumnLayout.propInputs = Layout.propInputs;

export default ColumnLayout;

import React from 'react';
import Layout from '../stateless_layout_container';

const Column = props => (
  <Layout {...props} />
);

Column.defaultProps = {...Layout.defaultProps};
Column.defaultProps.style = {...Layout.defaultProps.style, ...{display: 'block'}};
Column.propInputs = Layout.propInputs;

export default Column;

import React from 'react';
import Layout from '../stateless_layout_container';

const Row = (props) => (
  <Layout {...props} row />
);

Row.defaultProps = Layout.defaultProps;
Row.propInputs = Layout.propInputs;
Row.categories = Layout.categories;
Row.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
);

export default Row;

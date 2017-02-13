import React, { PropTypes } from 'react';

import { connect } from '../../../src/utils';

const Layout = ({ id, children, type, layoutState }) => (
  <div style={{
    padding: 10,
    display: type === 'row' ? 'flex' : null,
  }}>
    This is a {type}! ID: {id}
    {children}
  </div>
);

export default connect('layoutState')(Layout);

// export default Layout;
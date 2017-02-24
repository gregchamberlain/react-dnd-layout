import React, { PropTypes } from 'react';

import { connect } from '../../utils';

const Layout = ({ id, children, type, layoutState }) => (
  <div style={{
    boxSizing: 'border-box',
    padding: 10,
    minHeight: children.length ? null : 30,
    minWidth: children.length ? null : 30,
    display: type === 'row' ? 'flex' : null,
  }}>
    {children}
  </div>
);

export default connect('layoutState')(Layout);

// export default Layout;
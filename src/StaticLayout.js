import React, { PropTypes } from 'react';

import LayoutState from './model/LayoutState';
import LayoutProvider from './LayoutProvider';
import RootLayout from './RootLayout';

const StaticLayout = props => (
  <LayoutProvider {...props} readOnly={true} onChange={() => {}}>
    <RootLayout />
  </LayoutProvider>
);

StaticLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  addons: PropTypes.array
};

export default StaticLayout;

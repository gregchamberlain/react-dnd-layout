import React, { PropTypes } from 'react';

import LayoutState from './model/LayoutState';
import LayoutProvider from './LayoutProvider';
import RootWrapper from './wrapper/RootWrapper';

const StaticLayout = props => (
  <LayoutProvider {...props} readOnly={true} onChange={() => {}}>
    <RootWrapper id="root" />
  </LayoutProvider>
);

StaticLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  addons: PropTypes.array
};

export default StaticLayout;

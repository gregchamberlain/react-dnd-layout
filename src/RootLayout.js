import React, { PropTypes } from 'react';

import LayoutState from './model/LayoutState';
import { connect } from './utils';
import wrap from './wrapper';

const RootLayout = ({ layoutState, components, readOnly }) => {
  const rootItem = layoutState.getItemJS('root');
  const RootComp = components[rootItem.type];
  return (
    <RootComp {...rootItem.props} id="root">
      {React.Children.map(rootItem.children, childId => wrap(readOnly, childId))}
    </RootComp>
  );
};

RootLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  readOnly: PropTypes.bool.isRequired
};

export default connect('layoutState', 'components', 'readOnly')(RootLayout);
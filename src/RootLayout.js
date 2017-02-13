import React, { PropTypes } from 'react';

import LayoutState from './model/LayoutState';
import { connect } from './utils';
import wrap from './wrapper';

const RootLayout = ({ layoutState, components, readOnly }) => {
  const rootItem = layoutState.getItemJS('root');
  const RootComp = components[rootItem.type];
  return (
    <div style={rootItem.style} onClick={readOnly ? null : () => layoutState.setSelectedItem('root')}>
      <RootComp {...rootItem.props} id="root">
        {React.Children.map(rootItem.children, childId => wrap(readOnly, childId))}
      </RootComp>
    </div>
  );
};

RootLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  readOnly: PropTypes.bool.isRequired
};

export default connect('layoutState', 'components', 'readOnly')(RootLayout);
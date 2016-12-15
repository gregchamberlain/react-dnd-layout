import React, { PropTypes } from 'react';

import LayoutState from '../model/LayoutState';

const ItemHandler = ({ id }, { layoutState, components }) => {
  const item = layoutState.getItem(id).toJS();
  const Comp = components[item.type];
  return (
    <Comp {...item.props}>
      {React.Children.map(item.children, child => (
        <ItemHandler key={child} id={child} />
      ))}
    </Comp>
  );
};

ItemHandler.contextTypes = {
  layoutState: PropTypes.instanceOf(LayoutState),
  components: PropTypes.object
};

ItemHandler.propTypes = {
  id: PropTypes.string.isRequired
};

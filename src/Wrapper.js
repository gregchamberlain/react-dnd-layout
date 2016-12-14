import React, { Component, PropTypes } from 'react';

import LayoutState from './model/LayoutState';

class Wrapper extends Component {

  render() {

    const { components, layoutState } = this.context;
    const { id } = this.props;
    const item = layoutState.getItem(id).toJS();
    const children = item.props.children || [];
    const Comp = components[item.type];

    return (
      <Comp {...item.props}>
        ID: {id}
        {children.map(child => (
          <Wrapper key={child} id={child} />
        ))}
      </Comp>
    );

  }
}

Wrapper.contextTypes = {
  layoutState: PropTypes.instanceOf(LayoutState),
  components: PropTypes.object
};

Wrapper.propTypes = {
  id: PropTypes.string.isRequired
};

export default Wrapper;

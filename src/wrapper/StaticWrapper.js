import React, { PropTypes } from 'react';

import LayoutState from '../model/LayoutState';

const Wrapper = ({ id }, { components, layoutState }) => {
  const item = layoutState.getItem(id).toJS();
  const Comp = components[item.type];
  return (
    <div style={styles().container}>
      <Comp {...item.props} id={id} >
        {React.Children.map(item.children, child => (
          <Wrapper key={child} id={child} />
        ))}
      </Comp>
    </div>
  );
};

const styles = () => ({
  container: {
    position: 'relative',
  }
});

Wrapper.contextTypes = {
  layoutState: PropTypes.instanceOf(LayoutState),
  components: PropTypes.object
};

Wrapper.propTypes = {
  id: PropTypes.string.isRequired
};

export default Wrapper;

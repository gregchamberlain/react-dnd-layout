import React, { PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';

const StaticWrapper = ({ id, components, layoutState }) => {
  const item = layoutState.getItemJS(id);
  const Comp = components[item.type];
  return (
    <div style={{...item.style, ...{ position: 'relative'}}}>
      <Comp {...item.props} id={id}>
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

StaticWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired
};

const Wrapper = connect('layoutState', 'components')(StaticWrapper);

export default Wrapper;

import React, { Component, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import EditOverlay from './EditOverlay';

class Wrapper extends Component {

  removeChild = idx => () => {
    this.context.layoutState.removeItem(this.props.id, idx);
  }

  render() {

    const { components, layoutState } = this.context;
    const { id } = this.props;
    const item = layoutState.getItem(id).toJS();
    const Comp = components[item.type];

    return (
      <div style={styles().container}>
        <EditOverlay item={item} onRemove={this.props.onRemove}/>
        ID: {id}
        <Comp {...item.props}>
          {React.Children.map(item.children, (child, idx) => (
            <Wrapper key={child} id={child} onRemove={this.removeChild(idx)}/>
          ))}
        </Comp>
      </div>
    );

  }
}

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

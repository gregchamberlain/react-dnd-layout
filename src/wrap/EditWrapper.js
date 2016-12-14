import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import LayoutState from '../model/LayoutState';
import EditOverlay from './EditOverlay';

const wrapperTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop) {
      console.log('dropped here', props.id);
    }
  }
};

class Wrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  toggleHover = bool => () => {
    this.setState({ hovered: bool });
  }

  removeChild = idx => () => {
    this.context.layoutState.removeItem(this.props.id, idx);
  }

  render() {

    const { components, layoutState } = this.context;
    const { id } = this.props;
    const item = layoutState.getItem(id).toJS();
    const Comp = components[item.type];

    return (
      <div
        style={styles().container}
        onMouseEnter={this.toggleHover(true)}
        onMouseLeave={this.toggleHover(false)}
        // onDragEnter={this.toggleHover(true)}
        // onDragLeave={this.toggleHover(false)}
      >
        <EditOverlay item={item} onRemove={this.props.onRemove} isHovered={this.state.hovered}>
          <Comp {...item.props}>
            {React.Children.map(item.children, (child, idx) => (
              <Wrapper key={child} id={child} onRemove={this.removeChild(idx)}/>
            ))}
          </Comp>
        </EditOverlay>
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
  components: PropTypes.object,
};

Wrapper.propTypes = {
  id: PropTypes.string.isRequired
};

export default Wrapper;

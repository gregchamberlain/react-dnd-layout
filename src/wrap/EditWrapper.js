import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import LayoutState from '../model/LayoutState';
import EditOverlay from './EditOverlay';
import DropOverlay from './DropOverlay';

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

  addChild = (idx, item) => {
    this.context.layoutState.addItem(this.props.id, idx, item);
  }

  insertChild = idx => (offset, item) => {
    this.context.layoutState.addItem(this.props.id, idx + offset, item);
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
      >
        <EditOverlay item={item} onRemove={this.props.onRemove} isHovered={this.state.hovered} />
        <DropOverlay direction="column" onDrop={this.props.onInsert}/>
        <div style={{position: 'relative'}}>
          <Comp {...item.props} id={item.id} onAddItem={this.addChild}>
            {React.Children.map(item.children, (child, idx) => (
              <Wrapper key={child} id={child} onRemove={this.removeChild(idx)} onInsert={this.insertChild(idx)}/>
            ))}
          </Comp>
        </div>
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

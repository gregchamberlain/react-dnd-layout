import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import LayoutState from '../model/LayoutState';
import { withLayoutState } from '../utils';

let source = {
  beginDrag(props, monitor) {
    return props.layoutState.getItemJS(props.id);
  }
};

class EditWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  setHover = bool => e => {
    this.setState({ hovered: bool });
  }

  handleClick = e => {
    e.stopPropagation();
    this.context.setSelectedItem(this.props.id)
  }

  render() {

    const { components, addons } = this.context;
    const { id, layoutState, connectDragSource, isDragging } = this.props;
    const { hovered } = this.state;
    const item = layoutState.getItemJS(id);
    const Comp = components[item.type];

    if (isDragging) return null;

    return connectDragSource(
      <div
        style={{position: 'relative', outline: hovered ? '1px solid red' : '1px solid black', outlineOffset: -1}}
        onMouseEnter={this.setHover(true)}
        onMouseLeave={this.setHover(false)}
        onClick={this.handleClick}
      >
        <Comp {...item.props} id={item.id}>
          {React.Children.map(item.children, (child, idx) => (
            <Wrapper
              key={child}
              id={child}
            />
          ))}
        </Comp>
      </div>
    );

  }

}

EditWrapper.contextTypes = {
  components: PropTypes.object,
  setSelectedItem: PropTypes.func,
  addons: PropTypes.array
};

EditWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired
};

const Wrapper = withLayoutState(DragSource('Component', source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(EditWrapper));

export default Wrapper;
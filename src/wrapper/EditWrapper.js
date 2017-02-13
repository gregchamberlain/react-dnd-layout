import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';

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
    this.props.layoutState.setSelectedItem(this.props.id);
  }

  render() {

    const { addons } = this.context;
    const { id, layoutState, connectDragSource, isDragging, components } = this.props;
    const { hovered } = this.state;
    const item = layoutState.getItemJS(id);
    const Comp = components[item.type];

    if (isDragging) return null;

    return connectDragSource(
      <div
        style={{...item.style, ...{position: 'relative', outline: layoutState.selectedItem === id ? '1px solid rgba(25, 230, 240, 1)' : hovered ? '1px solid rgba(0,0,0,0.3)' : '1px solid rgba(0,0,0,0.1)', outlineOffset: -1}}}
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
  addons: PropTypes.array
};

EditWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired
};

const Wrapper = connect('layoutState', 'components')(DragSource('Component', source, (conn, monitor) => ({
  connectDragSource: conn.dragSource(),
  isDragging: monitor.isDragging()
}))(EditWrapper));

export default Wrapper;
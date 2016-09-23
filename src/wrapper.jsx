import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import Radium from 'radium';

import DropZone from './drop_zone';

const wrapperSource = {
  beginDrag(props) {
    props.onDragStart();
    return props.children;
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      props.onDrop(monitor.getDropResult());
      monitor.getDropResult().onDrop(monitor.getItem());
    }
  }
};

const wrapperTarget = {
  drop(props, monitor) {
    console.log('DROP RES', monitor.getDropResult());
  },
  canDrop(props, monitor) {
    return true;
  }
};

class Wrapper extends Component {
  render() {
    const { connectDragPreview, connectDragSource, connectDropTarget, row, ...props } = this.props;
    const hovered = Radium.getState(this.state, 'main', ':hover');
    const style = styles(props, hovered);
    return connectDragPreview(
      <div style={style.container}>
        {connectDragSource(<div style={style.handle}></div>)}
        {/* <div style={style.dropZones}>
          <DropZone pos={row ? "left" : "top"} onDrop={props.addBefore}/>

          <DropZone pos={row ? "right" : "bottom"} onDrop={props.addAfter}/>
        </div> */}
        {props.children}
      </div>
    );
  }
}

const styles = ({ isDragging, isOver, canDrop }, hovered) => ({
  container: {
    flex: 1,
    position: 'relative',
    border: '1px solid #eee',
    ":hover": {
      border: '1px solid #ccc',
    },
    padding: 10,
    // margin: 1,
    boxSizing: 'border-box',
    minHeight: 75,
    background: '#444',
    display: isDragging ? 'none' : 'block'
  },
  dropZones: {
    // display: canDrop ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  handle: {
    display: hovered ? 'block' : 'none',
    cursor: 'move',
    position: 'absolute',
    background: '#eee',
    borderRadius: 5,
    top: -4,
    height: 8,
    width: 50,
    left: '50%',
    transform: 'translateX(-50%)'
  }
});

const WrapperContainer = DragSource('COMPONENT', wrapperSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(Radium(Wrapper));

WrapperContainer.defaultProps = {
  addBefore: () => {},
  addAfter: () => {},
  onDragStart: () => {},
  onDrop: () => {},
};

export default WrapperContainer;

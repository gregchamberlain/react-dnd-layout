import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import Radium from 'radium';

import DropZone from './drop_zone';

const wrapperSource = {
  beginDrag(props) {
    props.onDragStart();
    return props.children.props;
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      props.onDrop(monitor.getDropResult());
      // monitor.getDropResult().onDrop(monitor.getItem());
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
        {connectDragSource(<div style={style.handle}>DRAG</div>)}
        <div style={style.remove} onClick={props.onDragStart}>&times;</div>
        <div style={style.settings} onClick={() => console.log('settings!')}>⚙</div>
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
    border: '1px solid transparent',
    ":hover": {
      border: '1px solid #35b5e5',
    },
    padding: 10,
    margin: 3,
    boxSizing: 'border-box',
    // minHeight: 75,
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
    display: hovered ? 'flex' : 'none',
    cursor: 'move',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    position: 'absolute',
    background: '#eee',
    borderRadius: 2,
    top: -8,
    height: 16,
    width: 50,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  remove: {
    display: hovered ? 'flex' : 'none',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    position: 'absolute',
    background: '#eee',
    borderRadius: 8,
    top: -8,
    height: 16,
    width: 16,
    right: -8,
    zIndex: 1,
  },
  settings: {
    display: hovered ? 'flex' : 'none',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    position: 'absolute',
    background: '#eee',
    borderRadius: 8,
    top: -8,
    height: 16,
    width: 16,
    left: -8,
    zIndex: 1,
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

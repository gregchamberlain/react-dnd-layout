import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';

import DropZone from './drop_zone';

const wrapperSource = {
  beginDrag(props) {
    props.onDragStart();
    return props.children;
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      console.log('DROPPER', monitor.getDropResult());
      props.onDrop();
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
    const { connectDragSource, connectDropTarget, row, ...props } = this.props;
    const style = styles(props);
    return connectDragSource(
      <div style={style.container}>
        {/* <div style={style.dropZones}>
          <DropZone pos={row ? "left" : "top"} onDrop={props.addBefore}/>

          <DropZone pos={row ? "right" : "bottom"} onDrop={props.addAfter}/>
        </div> */}
        {props.children}
      </div>
    );
  }
}

const styles = ({ isDragging, isOver, canDrop }) => ({
  container: {
    flex: 1,
    position: 'relative',
    border: '1px dashed #ccc',
    margin: 5,
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
  }
});

const WrapperContainer = DragSource('COMPONENT', wrapperSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Wrapper);

WrapperContainer.defaultProps = {
  addBefore: () => {},
  addAfter: () => {},
  onDragStart: () => {},
  onDrop: () => {},
};

export default WrapperContainer;

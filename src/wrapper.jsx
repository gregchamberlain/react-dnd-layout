import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';

import DropZone from './drop_zone';

const wrapperSource = {
  beginDrag(props) {
    return {};
  }
};

const wrapperTarget = {
  drop(props, monitor) {
    console.log(props);
  },
  canDrop(props, monitor) {
    return true;
  }
};

class Wrapper extends Component {
  render() {
    const { connectDragSource, connectDropTarget, ...props } = this.props;
    const style = styles(props);
    return connectDragSource(connectDropTarget(
      <div style={style.container}>
        This is a wrapper
        <div style={style.dropZones}>
          <DropZone pos="top" onDrop={() => console.log('add before')}/>

          <DropZone pos="bottom" onDrop={() => console.log('add after')}/>
        </div>
      </div>
    ));
  }
}

const styles = ({ isDragging, isOver, canDrop }) => ({
  container: {
    position: 'relative',
    minHeight: 75,
    opacity: isDragging ? 0 : 1,
    background: canDrop ? isOver ? 'green' : 'yellow' : 'red',
    transition: 'background 0.2s ease-in'
  },
  dropZones: {
    display: canDrop ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});

export default flow(
  DropTarget('COMPONENT', wrapperTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })),
  DragSource('COMPONENT', wrapperSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(Wrapper);

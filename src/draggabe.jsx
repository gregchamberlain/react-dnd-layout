import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const source = {
  beginDrag(props) {
    if (props.onDrag) props.onDrag();
    return {props: props};
  },
  endDrag(props, monitor) {
    if (monitor.didDrop() && props.remove) {
      props.remove();
    }
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const Draggable = ({ connectDragSource, isDragging, background, hideOnDrag, content }) => {
  if (isDragging && hideOnDrag) return null;
  return connectDragSource(
    <div style={{flex: 1, background, cursor: 'move', minHeight: 150}}>
     { content ? (
       <div style={{height: 300}}>
       </div>
     ) : ""}
    </div>
  );
};


Draggable.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

Draggable.defaultProps = {
  hideOnDrag: true,
};

export default DragSource('COMPONENT', source, collect)(Draggable);

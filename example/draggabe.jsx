import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const source = {
  beginDrag(props) {
    return {};
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const Draggable = ({ connectDragSource, isDragging }) => connectDragSource(
  <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
    ♘
  </div>
);


Draggable.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('COMPONENT', source, collect)(Draggable);

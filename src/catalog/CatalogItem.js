import React from 'react';
import { DragSource } from 'react-dnd';
import { generateRandomKey } from '../utils';

const source = {
  beginDrag(props, monitor) {
    return { type: props.type, props: {}, children: [] };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const item = {
        id: generateRandomKey(),
        props: {},
        children: []
      };
      const dropResult = monitor.getDropResult();

    }
  }
};

const CatalogItem = ({ type, component, connectDragSource }) => connectDragSource(
  <div style={{backgroundColor: '#444', color: '#eee', padding: 10}}>
    {type}
  </div>
);

export default DragSource('Component', source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
}))(CatalogItem);

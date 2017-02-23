import React from 'react';
import { DragSource } from 'react-dnd';

const source = {
  beginDrag(props, monitor) {
    return { type: props.type, props: {}, children: [], style: {} };
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

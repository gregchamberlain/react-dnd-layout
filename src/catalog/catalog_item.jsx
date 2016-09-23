import React from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    return generateNewItem(props.Comp);
  }
};

const generateNewItem = comp => ({
  type: comp.name,
  id: Math.random().toString().slice(2),
  props: comp.defaultProps
});

const CatalogItem = ({ Comp, connectDragSource }) => {

  return connectDragSource(
    <div>
      <Comp />
    </div>
  );
};

export default DragSource('COMPONENT', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
}))(CatalogItem);

import React from 'react';
import { DragSource } from 'react-dnd';
import { ObjectID } from 'bson';

const itemSource = {
  beginDrag(props) {
    const item = generateNewItem(props);
    console.log(item);
    return item;
  },
  endDrag() {
  }
};

const generateNewItem = props => ({
  type: props.type,
  id: new ObjectID().toString(),
  props: props.Comp.defaultProps
});

const CatalogItem = ({ type, Comp, connectDragSource, connectDragPreview }) => {

  return connectDragSource(
    <div style={styles.container}>
      {connectDragPreview(<div style={styles.preview}>
        <Comp />
      </div>)}
      {type}
    </div>
  );
};

const styles = {
  container: {
    cursor: 'move',
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'center'
  },
  preview: {
    background: '#333',
  }
};

export default DragSource('COMPONENT', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
}))(CatalogItem);

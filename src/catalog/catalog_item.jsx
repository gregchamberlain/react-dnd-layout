import React from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    return generateNewItem(props);
  }
};

const generateNewItem = props => ({
  type: props.type,
  id: Math.random().toString().slice(2),
  props: props.Comp.defaultProps
});

const CatalogItem = ({ type, Comp, connectDragSource }) => {

  return connectDragSource(
    <div style={styles.container}>
      <div style={styles.preview}>
        <Comp />
      </div>
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
}))(CatalogItem);

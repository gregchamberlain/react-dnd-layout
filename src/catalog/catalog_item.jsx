import React from 'react';
import { DragSource } from 'react-dnd';
import { ObjectID } from 'bson';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../redux/actions';

const itemSource = {
  beginDrag(props) {
    const item = generateNewItem(props);
    props.add(item);
    return item;
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      props.remove(monitor.getItem().id);
    }
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

const mapDispatchToProps = dispatch => ({
  add: item => dispatch(addItem(item)),
  remove: id => dispatch(removeItem(id)),
});

export default connect(null, mapDispatchToProps)(
  DragSource('COMPONENT', itemSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    connectDragPreview: conn.dragPreview()
  })
)(CatalogItem));

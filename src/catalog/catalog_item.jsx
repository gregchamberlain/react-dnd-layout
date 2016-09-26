import React from 'react';
import { DragSource } from 'react-dnd';
import ObjectID from 'bson-objectid';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../redux/actions';

const itemSource = {
  beginDrag(props, monitor) {
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
  id: ObjectID.generate(),
  props: props.Comp.defaultProps
});

const CatalogItem = ({ type, Comp, connectDragSource, connectDragPreview }) => {

  return connectDragSource(
    <div style={styles.container}>
      {connectDragPreview(<div style={styles.preview}>
        { Comp.Icon || <Comp /> }
      </div>)}
      {type}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial',
    cursor: 'move',
    width: '44%',
    margin: 5,
    textAlign: 'center',
    color: '#eee'
  },
  preview: {
    background: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#eee',
    marginBottom: 5,
    borderRadius: 2,
    height: 64
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

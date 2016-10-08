import React from 'react';
import { DragSource } from 'react-dnd';
import generateRandomKey from '../utils/generateRandomKey';
import { connect } from 'react-redux';
import { addItem, removeItem, moveItem } from '../redux/actions';
import { Record, Map, fromJS } from 'immutable';
import Item from '../model/Item';

const itemSource = {
  beginDrag(props, monitor) {
    return props;
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const item = generateNewItem(props);
      console.log(monitor.getDropResult());
      const dropResult = monitor.getDropResult();
      props.add(dropResult.id, dropResult.index, item);
      // props.move(null, monitor.getDropResult(), item.get('id'));
    } else {
      // props.remove(monitor.getItem().id);
    }
  }
};

const generateNewItem = props => new Item({
  type: props.type,
  id: generateRandomKey(),
  props: fromJS(props.Comp.defaultProps)
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
  add: (id, index, item) => dispatch(addItem(id, index, item)),
  remove: id => dispatch(removeItem(id)),
  move: (from, to, item) => dispatch(moveItem(from, to, item))
});

export default connect(null, mapDispatchToProps)(
  DragSource('COMPONENT', itemSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    connectDragPreview: conn.dragPreview()
  })
)(CatalogItem));

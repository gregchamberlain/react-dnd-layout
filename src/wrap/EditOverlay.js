import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import withLayoutState from '../utils/withLayoutState';

const overlayTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      console.log('dropped');
    }
  }
};

const overlaySource = {
  beginDrag(props, monitor, component) {
    // props.onRemove();
    return props.item;
  }
};

class EditOverlay extends Component {

  render() {
    const { item, onRemove, isHovered, isOver, isDragging, connectDragSource, connectDropTarget, children } = this.props;
    if (isDragging) return null;
    const { setSelectedItem } = this.context;
    let styles = styleFunc({ isOver: isOver || isHovered });
    return connectDropTarget(
      <div style={styles.container}>
        <div style={styles.overlay} />
        <div style={styles.edit} onClick={() => setSelectedItem(item.id)}>⚙</div>
        <div style={styles.remove} onClick={onRemove}>&times;</div>
        {connectDragSource(<div style={styles.handle}>{item.type}</div>)}
      </div>
    );
  }
}

const actionStyle = hovered => ({
  fontFamily: 'Arial',
  display: hovered ? 'flex' : 'none',
  boxShadow: '0 0 4px #888',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  position: 'absolute',
  textShadow: 'none',
  background: '#eee',
  borderRadius: 11,
  color: '#333',
  top: -11,
  height: 22,
  width: 22,
  zIndex: 3,
});

const styleFunc = ({ isOver }) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  addons: {
    position: 'absolute',
    top: -10,
    left: -10,
    display: isOver ? 'flex' : 'none',
    zIndex: 3,
  },
  overlay: {
    zIndex: 2,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: isOver ? '1px solid #aaa' : '1px solid #eee'
  },
  handle: {
    ...actionStyle(isOver),
    cursor: 'move',
    fontSize: 16,
    borderRadius: 2,
    minWidth: 60,
    padding: '0 10px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  remove: {
    ...actionStyle(isOver),
    right: -11,
  },
  edit: {
    ...actionStyle(isOver),
    left: -11,
  }
});

EditOverlay.contextTypes = {
  setSelectedItem: PropTypes.func
};

const Draggable = DragSource('Component', overlaySource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(EditOverlay);

export default withLayoutState(DropTarget('Component', overlayTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(Draggable));

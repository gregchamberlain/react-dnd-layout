import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const overlayTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      console.log('dropped');
    }
  }
};

class EditOverlay extends Component {

  render() {
    const { item, onRemove, isHovered, isOver, isOverCurrent, connectDropTarget, children } = this.props;
    let styles = styleFunc({ isOver: isOver || isHovered });
    return connectDropTarget(
      <div style={styles.container}>
        <div style={styles.overlay} />
        <div style={addonsStyle}>
          {children}
        </div>
        <div style={styles.remove} onClick={onRemove}>&times;</div>
        <div style={styles.handle}>{item.type}</div>
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

const buttonStyle = {
  zIndex: 3,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  top: -10,
  minWidth: 20,
  height: 20,
  borderRadius: 5,
  backgroundColor: '#aaa',
  color: '#eee',
};

const addonsStyle = {
  position: 'absolute',
  left: 0,
  top: -10,
  zIndex: 3,
};

const styleFunc = ({ isOver }) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
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
  }
});

export default DropTarget('Component', overlayTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(EditOverlay);

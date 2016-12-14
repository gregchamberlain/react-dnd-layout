import React from 'react';
import { DropTarget } from 'react-dnd';

const overlayTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      console.log('dropped');
    }
  }
};

const EditOverlay = ({ item, onRemove, isHovered, isOver, connectDropTarget, children }) => {

  let styles = styleFunc({ isOver: isOver || isHovered });

  return connectDropTarget(isOver || isHovered ? (
      <div>
        {children}
        <div style={styles.container}>
          <div style={styles.remove} onClick={onRemove}>X</div>
          <div style={styles.handle}>{item.type}</div>
        </div>
      </div>
    ) : (
      <div>
        {children}
        <div style={styles.container} />
      </div>
    )
  );
};

const buttonStyle = {
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

const styleFunc = ({ isOver }) => ({
  container: {
    // pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: isOver ? '1px solid #aaa' : '1px solid #eee'
  },
  handle: {
    ...buttonStyle,
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'move'
  },
  remove: {
    ...buttonStyle,
    right: -10
  }
});

export default DropTarget('Component', overlayTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(EditOverlay);

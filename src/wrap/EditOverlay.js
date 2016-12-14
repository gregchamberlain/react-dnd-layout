import React from 'react';

const EditOverlay = ({ item, onRemove }) => (
  <div style={styles.container}>
    <div style={styles.remove} onClick={onRemove}>X</div>
    <div style={styles.handle}>{item.type}</div>
  </div>
);

const buttonStyle = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  top: -10,
  minWidth: 20,
  padding: 5,
  height: 20,
  borderRadius: 5,
  backgroundColor: '#aaa',
  color: '#eee',
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ccc'
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
};

export default EditOverlay;

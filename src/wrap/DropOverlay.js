import React from 'react';

import DropEdge from './DropEdge';

const DropOverlay = ({ direction, onDrop }) => {
  const styles = stylesCalc(direction);
  return (
    <div style={styles.container}>
      <DropEdge style={styles.edge} pos={ direction === 'row' ? 'left' : 'top' } onDrop={onDrop}/>
      <div style={styles.spacer} />
      <DropEdge style={styles.edge} pos={ direction === 'row' ? 'right' : 'bottom' } onDrop={onDrop}/>
    </div>
  );
};

const stylesCalc = direction => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: direction,
  },
  spacer: {
    flex: 1
  },
  edge: {
    zIndex: 2,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    maxWidth: direction === 'row' ? 30 : '100%',
    maxHeight: direction === 'row' ? '100%' : 30,
    width: direction === 'row' ? '20%' : '100%',
    height: direction === 'row' ? '100%' : '20%'
  }
});

export default DropOverlay;

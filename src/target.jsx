import React from 'react';
import { DropTarget } from 'react-dnd';

const target = {
  drop(props, monitor) {
    console.log(monitor.didDrop());
    props.onDrop(monitor.getItem());
    return props;
  },
  canDrop(props, monitor) {
    return true;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
};

const Target = ({ connectDropTarget, isOver, vertical = false, canDrop }) => connectDropTarget(
  <div style={style({isOver, vertical, canDrop}).container}>
    <div style={style({isOver, vertical, canDrop}).target}>
      <div style={style({isOver, vertical, canDrop}).line}></div>
    </div>
  </div>
);



const style = ({ isOver, vertical, canDrop }) => ({
  container: {
    width: vertical ? null: 0,
    height: vertical ? 0 : null,
    position: 'relative',
    zIndex: 1
  },
  target: {
    position: 'absolute',
    width: vertical ? '100%' : 50,
    height: vertical ? 50 : '100%',
    // background: '#eee',
    // border: '1px solid black',
    // opacity: 0.3,
    transform: vertical ? 'translateY(-50%)' : 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    flexDirection: vertical ? 'column' : 'row'
    // zIndex: 1
  },
  line: {
    display: isOver ? 'block' : 'none',
    width: vertical ? null : 4,
    height: vertical ? 4 : null,
    background: '#35b5e6',
  }
});

export default  DropTarget('COMPONENT', target, collect)(Target);

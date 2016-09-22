import React from 'react';
import { DropTarget } from 'react-dnd';

const target = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

const Target = ({ connectDropTarget, isOver }) => connectDropTarget(
  <div style={style({isOver}).container}>
    <div style={style({isOver}).target}>
      <div style={style({isOver}).line}></div>
    </div>
  </div>
);



const style = ({ isOver }) => ({
  container: {
    width: 0,
    position: 'relative',
  },
  target: {
    position: 'absolute',
    width: 50,
    height: '100%',
    // background: '#eee',
    // border: '1px solid black',
    // opacity: 0.3,
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    // zIndex: 1
  },
  line: {
    display: isOver ? 'block' : 'none',
    width: 10,
    background: '#444'
  }
});

export default  DropTarget('COMPONENT', target, collect)(Target);

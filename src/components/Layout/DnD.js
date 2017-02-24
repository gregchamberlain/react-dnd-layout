import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import Separator from './Separator';
import { connect } from '../../utils';

const target = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.layoutState.insertOrMoveItem(props.id, props.children.length, monitor.getItem());
    }
  }
};

const EditLayout = ({ id, children, isOverCurrent, connectDropTarget, type, layoutState, readOnly }) => {

  // let parsedChildren = [];
  // if (!readOnly && children.length) {
  //   for (let i=0; i<children.length*2+1;i++) {
  //     if (i % 2 === 0) {
  //       parsedChildren.push(
  //         <Separator
  //           key={`${id}-seperator-${i}`}
  //           onDrop={item => layoutState.insertOrMoveItem(id, i / 2, item)}
  //           direction={ type === 'row' ? 'vertical' : 'horizontal' }
  //         />
  //       );
  //     } else {
  //       parsedChildren.push(children[(i-1)/2]);
  //     }
  //   }
  // } else {
  //   parsedChildren = children;
  // }

  return connectDropTarget(
    <div style={{
      boxSizing: 'border-box',
      position: 'relative',
      outline: '1px solid #ccc',
      height: '100%',
      minHeight: children.length > 1 ? null : 30,
      minWidth: children.length > 1? null : 30,
      padding: 10,
      display: type === 'row' ? 'flex' : null
    }}>
      <div style={{
        position: 'absolute',
        pointerEvents: 'none',
        top:0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isOverCurrent ? 'rgba(25, 230, 240, 0.2)' : ''
      }}/>
      {children}
    </div>
  );
};

const LayoutContainer = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(EditLayout);

export default connect('layoutState', 'readOnly')(LayoutContainer);

// export default LayoutContainer;s
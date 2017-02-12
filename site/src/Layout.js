import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import Separator from './Separator';
import { connect } from '../../src/utils';

const target = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.layoutState.addItem(props.id, props.children.length, monitor.getItem());
    }
  }
};

const Layout = ({ id, children, isOverCurrent, isOver, connectDropTarget, type, layoutState, readOnly }) => {

  let parsedChildren = [];
  if (!readOnly && children.length) {
    for (let i=0; i<children.length*2+1;i++) {
      if (i % 2 === 0) {
        parsedChildren.push(
          <Separator
            key={`${id}-seperator-${i}`}
            onDrop={item => layoutState.addItem(id, i / 2, item)}
            direction={ type === 'row' ? 'vertical' : 'horizontal' }
          />
        );
      } else {
        parsedChildren.push(children[(i-1)/2]);
      }
    }
  } else {
    parsedChildren = children;
  }

  const wrap = val => readOnly ? val : connectDropTarget(val);
  
  return wrap(
    <div style={{
      padding: 10,
      display: type === 'row' ? 'flex' : null,
      backgroundColor: isOverCurrent ? 'rgba(25, 230, 240, 0.2)' : 'white'
    }}>
      This is a {type}! ID: {id}
      {parsedChildren}
    </div>
  );
};

const LayoutContainer = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true}),
  isOver: monitor.isOver()
}))(Layout);

export default connect('layoutState', 'readOnly')(LayoutContainer);
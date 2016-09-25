import React from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';

import Wrapper from './wrapper';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.onChange(
        update(props.children , {
          $push: [monitor.getItem()]
        })
      );
      return props;
    }
  }
};

const Layout = (props, { components, editable }) => {
  const { onChange, connectDropTarget, children } = props;

  const removeItem = idx => () => {
    onChange(update(props.children, {$splice: [[idx, 1]]}));
  };
  const addItem = (idx, item) => {
    onChange(update(props.children, {$splice: [[idx, 0, item]]}));
  };
  const renderItems = children.map((item, idx) => {
    const Comp = components[item.type];
    return editable ? (
      <Wrapper
        key={item.id}
        index={idx}
        Form={Comp.propInputs}
        row={props.row}
        addItem={addItem}
        parentId={props.id}
        item={item}
        component={Comp}
        onDragStart={() => setTimeout(removeItem(idx), 50)}>
        <Comp id={item.id} {...item.props} type={item.type} />
      </Wrapper>
    ) : (
      <div key={item.id} style={{flex: item.props.style.flex, display: 'flex'}}>
        <Comp id={item.id} {...item.props} type={item.type} />
      </div>
    );
  });

  const styles = styler(props);

  const wrap = editable ? connectDropTarget : item => item;

  return wrap(
    <div style={styles.container}>
      {renderItems}
    </div>
  );
};

const styler = ({ row, isOverCurrent, children, style, canDrop, root }) => ({
  container: {
    ...style,
    minHeight: children.length ? null : 100,
    flexDirection: row ? 'row' : 'column',
    flexWrap: 'wrap',
    position: 'relative',
    boxSizing: 'border-box',
    paddingBottom: canDrop && root ? 40 : style.padding,
    background: isOverCurrent && canDrop ? 'rgba(53,181,229, 0.3)' : style.background,
    // background: '#333'
  },
});

Layout.contextTypes = {
  components: React.PropTypes.object,
  editable: React.PropTypes.bool
};


const LayoutContainer = DropTarget('COMPONENT', layoutTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true}),
  canDrop: monitor.canDrop()
}))(Layout);

LayoutContainer.defaultProps = {
  children: [],
  onChange: children => {}
};

export default LayoutContainer;

import React, { Component } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { isEqual } from 'lodash';

import Wrapper from './wrapper';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      return {id: props.id, index: 0};
    }
  }
};

class Layout extends Component {

  shouldComponentUpdate(props, state, context) {
    if (isEqual(props.children, this.props.children)) {
      if (
        props.isOverCurrent === this.props.isOverCurrent &&
        context.editable === this.context.editable &&
        isEqual(props.style, this.props.style)
      ) {
        return false;
      } else {
        return true;
      }
    }
    if (isEqual(props, this.props)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
  const { onChange, connectDropTarget, children } = this.props;
  const { components, editable, info } = this.context;
  const renderItems = children.map((item, idx) => {
    const Comp = components[item.get('type')];
    return editable ? (
      <Wrapper
        key={item.id}
        index={idx}
        Form={Comp.propInputs}
        row={this.props.row}
        parentId={this.props.id}
        item={item}
        Comp={Comp}
      />
    ) : (
      <div key={item.id} style={{flex: 1, display: 'flex', ...(item.layout.toJS() || {})}}>
        <Comp id={item.id} {...item.props.toJS()} type={item.type} />
      </div>
    );
  });

  const styles = styler(this.props);

  const wrap = editable && !this.props.children.length ? connectDropTarget : item => item;
  return wrap(
    <div style={styles.container}>
      {renderItems}
    </div>
  );
  }
}

const styler = ({ row, isOverCurrent, children, style, canDrop }) => ({
  container: {
    ...style,
    backgroundColor: isOverCurrent && canDrop ? 'rgba(53,181,229, 0.3)' : style.background,
    minHeight: children.size ? style.minHeight : 400,
    flexDirection: row ? 'row' : 'column',
    flexWrap: 'wrap',
    position: 'relative',
    boxSizing: 'border-box',
  },
});

Layout.contextTypes = {
  components: React.PropTypes.object,
  editable: React.PropTypes.bool,
  info: React.PropTypes.object
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
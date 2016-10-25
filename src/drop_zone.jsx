import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';

const wrapperTarget = {
  drop(props, monitor) {
    if (monitor.isOver({shallow: true})) {
      const index = (props.pos === 'left' || props.pos === 'top') ?
      props.index : props.index + 1;
      props.addItem(
        monitor.getItem()
      );
      return {id: props.parentId, index};
    }
  },
  canDrop(props, monitor) {
    return true;
  }
};

class DropZone extends Component {
  render() {
    const { connectDragSource, connectDropTarget, ...props } = this.props;
    const style = styles(props);
    return connectDropTarget(
      <div style={style.container}>
        <div style={style.line}></div>
      </div>
    );
  }
}

const styles = ({ isOver, canDrop, pos, layout }) => ({
  container: {
    // background: 'rgba(255, 0, 0, 0.6)',
    minHeight: 25,
    // opacity: isOver ? 1 : 0,
    position: 'absolute',
    width: pos === 'left' || pos === 'right' ? layout ? '15%' : '50%' : '100%',
    height: pos === 'left' || pos === 'right' ? '100%' : layout ? '15%' : '50%',
    top: pos === 'top' ? 0 : null,
    left: pos === 'left' ? 0 : null,
    right: pos === 'right' ? 0 : null,
    bottom: pos === 'bottom' ? 0 : null,
    zIndex: 2
  },
  line: {
    background: '#35b5e6',
    opacity: isOver ? 1 : 0,
    position: 'absolute',
    width: pos === 'left' || pos === 'right' ? 4 : '100%',
    height: pos === 'left' || pos === 'right' ? '100%' : 4,
    top: pos === 'top' ? -2 : null,
    left: pos === 'left' ? -2 : null,
    right: pos === 'right' ? -2 : null,
    bottom: pos === 'bottom' ? -2 : null,
  }
});

const DropZoneContainer = DropTarget('COMPONENT', wrapperTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DropZone);

export default DropZoneContainer;
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

const wrapperTarget = {
  drop(props, monitor) {
    return props;
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

const styles = ({ isOver, canDrop, pos }) => ({
  container: {
    minHeight: 25,
    opacity: isOver ? 1 : 0,
    position: 'absolute',
    width: pos === 'left' || pos === 'right' ? '25%' : '100%',
    height: pos === 'left' || pos === 'right' ? '100%' : '25%',
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

DropZoneContainer.defaultProps = {
  onDrop: () => console.log('dropped')
};

export default DropZoneContainer;

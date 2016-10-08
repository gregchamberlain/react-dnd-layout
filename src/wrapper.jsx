import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import Radium from 'radium';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import LayoutForm from './layouts/layout_form';
import * as ACTIONS from './redux/actions';

import DropZone from './drop_zone';

const wrapperSource = {
  beginDrag(props) {
    return {id: props.item.id};
  },
  endDrag(props, monitor, component) {
    const from = { id: props.parentId, index: props.index };
    const to = monitor.getDropResult();
    if (monitor.didDrop()) {
      props.moveItem(from, to, props.item.id);
    }
  }
};

const wrapperTarget = {
  drop(props, monitor, component) {
  },
  canDrop() {
    return false;
  }
};

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state ={
      editorOpen: false,
      props: props.item.get('props'),
      style: {}
    };
  }

  toggleEditor = () => {
    this.setState({editorOpen: !this.state.editorOpen});
  }

  render() {
    const { connectDragSource, Form, connectDropTarget, row, Comp, item, ...props } = this.props;
    const lout = Comp.categories && Comp.categories.includes('layout');
    const hovered = Radium.getState(this.state, 'main', ':hover') || this.state.editorOpen || (props.isOver && Comp.categories && Comp.categories.includes('layout'));
    const childStyle = item.get('props').style || {};
    const style = styles(props, hovered, childStyle, this.state, item.layout);
    return connectDropTarget(
      <div style={style.container} ref={c => {this.container = c;}}>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: this.props.isOver ? 'block' : 'none'}}>
          <DropZone pos={row ? 'left' : 'top'} index={props.index} addItem={() => {}} layout={lout} parentId={props.parentId}/>
          <DropZone pos={row ? 'right' : 'bottom'} index={props.index} addItem={() => {}} layout={lout} parentId={props.parentId}/>
        </div>
        {connectDragSource(<div style={style.handle}>{item.type}</div>)}
        <div style={style.remove} onClick={() => props.removeItem(item.id, props.parentId, props.index)}>&times;</div>
        { Form ? (
          <div style={style.settings} onClick={this.toggleEditor}>⚙</div>
        ) : ""}
        {this.state.editorOpen ? (
          <div style={style.propEditor}>
            <div style={{border: '1px solid #ccc'}}>
              <LayoutForm value={item.layout || {}} onChange={props.updateLayout} />
            </div>
            <Form value={item.get('props')} onChange={props.updateProps}/>
          </div>
        ) : ""}
        <Comp
          id={item.id}
          {...item.get('props')}
          type={item.type}
          onChange={props.updateProps}
        />
        <div style={style.overlay}></div>
      </div>
    );
  }
}

const styles = ({ isDragging, isOver, canDrop }, hovered, child, state, layout = {}) => ({
  container: {
    flex: 1,
    ...layout,
    position: 'relative',
    boxSizing: 'border-box',
    ':hover': {

    },
    display: isDragging ? 'none' : 'flex'
  },
  handle: {
    ...actionStyle(hovered),
    cursor: 'move',
    fontSize: 16,
    borderRadius: 2,
    minWidth: 60,
    padding: '0 10px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  remove: {...actionStyle(hovered),
    right: -11,
  },
  settings: {
    ...actionStyle(hovered),
    left: -11,
  },
  propEditor: {
    position: 'absolute',
    width: 200,
    top: 11,
    left: -11,
    fontSize: 20,
    borderRadius: 5,
    boxShadow: '0 0 4px #888',
    color: '#eee',
    background: '#444',
    padding: 5,
    zIndex: 3
  },
  overlay: {
    position: 'absolute',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    border: hovered ? '2px solid #ccc' : 'none'
  }
});

const actionStyle = hovered => ({
  fontFamily: 'Arial',
  display: hovered ? 'flex' : 'none',
  boxShadow: '0 0 4px #888',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  position: 'absolute',
  textShadow: 'none',
  background: '#eee',
  borderRadius: 11,
  color: '#333',
  top: -11,
  height: 22,
  width: 22,
  zIndex: 2,
});

// const WrapperContainer = DragSource('COMPONENT', wrapperSource, (conn, monitor) => ({
//   connectDragSource: conn.dragSource(),
//   connectDragPreview: conn.dragPreview(),
//   isDragging: monitor.isDragging(),
// }))(Radium(Wrapper));
const WrapperContainer = flow(
  Radium,
  DragSource('COMPONENT', wrapperSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('COMPONENT', wrapperTarget, (conn, monitor) => ({
    connectDropTarget: conn.dropTarget(),
    monitor: monitor,
    isOverCurrent: monitor.isOver({shallow: true}),
    isOver: monitor.isOver()
  })),
)(Wrapper);

WrapperContainer.defaultProps = {
  addBefore: () => {},
  addAfter: () => {},
  onDragStart: () => {},
  onDrop: () => {},
};

const mapDispatchToProps = (dispatch, props) => ({
  moveItem: (from, to, item) => dispatch(ACTIONS.moveItem(from, to, item)),
  updateProps: newProps => dispatch(ACTIONS.updateProps(props.item.id, newProps)),
  updateLayout: newLayout => dispatch(ACTIONS.updateLayout(props.item.id, newLayout)),
  removeItem: (id, parentId, index) => dispatch(ACTIONS.removeItem(id, parentId, index))
});

export default connect(null, mapDispatchToProps)(WrapperContainer);

import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import Radium from 'radium';
import { connect } from 'react-redux';
import * as ACTIONS from './redux/actions';

import DropZone from './drop_zone';

const wrapperSource = {
  beginDrag(props) {
    props.onDragStart();
    return props.children.props;
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      props.onDrop(monitor.getDropResult());
      // monitor.getDropResult().onDrop(monitor.getItem());
    }
  }
};

const wrapperTarget = {
  drop(props, monitor) {
    console.log('DROP RES', monitor.getDropResult());
  },
  canDrop(props, monitor) {
    return false;
  }
};

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state ={
      editorOpen: false,
      props: props.item.props,
    };
  }

  toggleEditor = () => {
    this.setState({editorOpen: !this.state.editorOpen});
  }

  updateProps = props => {
    this.setState({props});
  }

  render() {
    const { connectDragPreview, connectDragSource, Form, connectDropTarget, row, ...props } = this.props;
    const hovered = Radium.getState(this.state, 'main', ':hover') || this.state.editorOpen || props.isOver;
    const childStyle = props.children.props.style || {};
    const style = styles(props, hovered, childStyle);
    return connectDropTarget(connectDragPreview(
      <div style={style.container}>
        {connectDragSource(<div style={style.handle}>{props.children.props.type}</div>)}
        <div style={style.remove} onClick={props.onDragStart}>&times;</div>
        { Form ? (
          <div style={style.settings} onClick={this.toggleEditor}>⚙</div>
        ) : ""}
        {this.state.editorOpen ? (
          <div style={style.propEditor}>
            <Form value={props.item.props} onChange={props.updateProps}/>
          </div>
        ) : ""}
        {/* <Form value={props.item.props} onChange={val => console.log(val)}/> */}
        {props.children}
      </div>
    ));
  }
}

const styles = ({ isDragging, isOver, canDrop }, hovered, child) => ({
  container: {
    flex: child.flex,
    position: 'relative',
    outline: hovered ? '1px solid #35b5e5' : 'none',
    // boxSizing: 'border-box',
    ':hover': {

    },
    // minHeight: 75,
    // background: '#444',
    display: isDragging ? 'none' : 'flex'
  },
  handle: {
    ...actionStyle(hovered),
    cursor: 'move',
    fontSize: 12,
    borderRadius: 2,
    minWidth: 60,
    padding: '0 10px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  remove: {...actionStyle(hovered),
    right: -10,
  },
  settings: {
    ...actionStyle(hovered),
    left: -10,
  },
  propEditor: {
    position: 'absolute',
    top: 10,
    left: -10,
    background: '#444',
    padding: 5,
    zIndex: 1
  }
});

const actionStyle = hovered => ({
  display: hovered ? 'flex' : 'none',
  boxShadow: '0 0 4px #888',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  position: 'absolute',
  background: '#eee',
  borderRadius: 10,
  top: -10,
  height: 20,
  width: 20,
  zIndex: 1,
});

// const WrapperContainer = DragSource('COMPONENT', wrapperSource, (conn, monitor) => ({
//   connectDragSource: conn.dragSource(),
//   connectDragPreview: conn.dragPreview(),
//   isDragging: monitor.isDragging(),
// }))(Radium(Wrapper));
const WrapperContainer = flow(
  DragSource('COMPONENT', wrapperSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    connectDragPreview: conn.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget('COMPONENT', wrapperTarget, (conn, monitor) => ({
    connectDropTarget: conn.dropTarget(),
    isOver: monitor.isOver()
  }))
)(Radium(Wrapper));

WrapperContainer.defaultProps = {
  addBefore: () => {},
  addAfter: () => {},
  onDragStart: () => {},
  onDrop: () => {},
};

const mapDispatchToProps = (dispatch, props) => ({
  updateProps: newProps => dispatch(ACTIONS.updateProps(props.children.props.id, newProps))
});

export default connect(null, mapDispatchToProps)(WrapperContainer);

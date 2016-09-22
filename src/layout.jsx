import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Wrapper from './wrapper';
import Target from './target';
import { merge } from 'lodash';
import { DropTarget } from 'react-dnd';

const layoutTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      return props;
    }
  },
  canDrop(props, monitor) {
    return true;
  }
};

const wrapChildren = (children, props) => (
  children.map((child, idx) => (
    <Wrapper
      key={child.props.id}
      row={this.props.row}>
      {child}
    </Wrapper>
  ))
);

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      children: merge([], props.children),
    };
  }

  onDrop = id => () => {
    console.log(this.props.id);
    const children = this.state.children.filter(child => child.props.id !== id);
    this.setState({children});
  }

  removeAndAdd = idx => item => {
    console.log(this.state.children.includes(item));
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx, 0, item]
        ]
      }
    }));
  }

  renderChildren = () => {
    const children =  this.state.children.map((child, idx) => {
      return (
        <Wrapper
          key={child.props.id}
          row={this.props.row}>
          {child}
        </Wrapper>
      );
    });
    return this.props.isOver ? intersperse(children, idx => (
      <Target key={`target${idx}`} onDrop={this.removeAndAdd(idx)} />)
    ) : children;
  }

  render() {

    const { children, connectDropTarget } = this.props;

    const style = styles(this.props);

    return connectDropTarget(
      <div style={style.container}>
        {this.renderChildren()}
      </div>
    );
  }
}

const styles = ({ row, isOver, isOverCurrent }) => ({
  container: {
    display: row ? 'flex' : 'block',
    // background: isOverCurrent ? '#eee' : '#333'
    background: '#333'
  },
});

const intersperse = (arr, el) => {
    var res = [], i=0;
    if (i < arr.length)
        res.push(arr[i++]);
    while (i < arr.length)
        res.push(el(i), arr[i++]);
    return res;
};

const LayoutContainer = DropTarget('COMPONENT', layoutTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: true}),
  canDrop: monitor.canDrop()
}))(Layout);

LayoutContainer.defaultProps = {
  onDrop: item => console.log('should add', item)
};

export default LayoutContainer;

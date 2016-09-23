import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Wrapper from './wrapper';
import Target from './target';
import { merge } from 'lodash';
import { DropTarget } from 'react-dnd';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      const children = component.state.children.concat(monitor.getItem());
      component.setState({children});
      return props;
    } else {
    }
  },
  canDrop(props, monitor) {
    return true;
  },
  hover(props, monitor) {
    if (monitor.isOver({shallow: true})) {
      console.log(props);
    }
  }
};

const wrapChildren = (children, props) => (
  children.map((child, idx) => (
    <Wrapper
      key={child.props.id}
      onDragStart={() => console.log('dragging...')}
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
    // this.setState({draggingItem: null}, () => console.log(this.state));
    // console.log('removing');
    // const children = this.state.children.filter(child => child.props.id !== id);
    // this.setState({children});
  }

  addBefore = idx => item => {
    console.log('before', idx);
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx, 0, item]
        ]
      }
    }));
  }

  addAfter = idx => item => {
    console.log('after', idx);
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx+1, 0, item]
        ]
      }
    }));
  }

  startDrag = idx => () => {
    const item = this.state.children[idx];
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx, 1]
        ]
      }
    }), () => console.log(this.state));
  }

  removeAndAdd = idx => item => {
    if (this.state.children.includes(item)) return;
    console.log('adding');
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx, 0, item]
        ]
      }
    }));
  }

  renderChildren = () => {
    let children =  this.state.children.map((child, idx) => {
      return (
        <Wrapper
          key={child.props.id}
          row={this.props.row}
          onDragStart={() => setTimeout(this.startDrag(idx), 50)}
          addBefore={this.addBefore(idx)}
          addAfter={this.addAfter(idx)}
          onDrop={this.onDrop(child.props.id)}>
          {child}
        </Wrapper>
      );
    });
    // if (this.props.isOver) {
    //   children = intersperse(children, idx => (
    //     <Target index={idx} key={`target${idx}`} onDrop={(this.removeAndAdd(idx))} vertical={!this.props.row}/>)
    //   );
    //   children.push(<Target key={`target${children.length}`} onDrop={(this.removeAndAdd(children.length))} vertical={!this.props.row}/>);
    //   children.unshift(<Target key={`target${0}`} onDrop={(this.removeAndAdd(0))} vertical={!this.props.row}/>);
    // }
    return children;
  }

  render() {

    const { children, connectDropTarget } = this.props;

    const style = styles(this.props);

    return connectDropTarget(
      <div style={style.container}>
        {this.renderChildren()}
        {this.state.draggingItem ? (
          <div style={{display: 'none'}}>
            <Wrapper>
              {this.state.draggingItem}
            </Wrapper>
          </div>
        ) : ""}
      </div>
    );
  }
}

const styles = ({ row, isOver, isOverCurrent }) => ({
  container: {
    minHeight: 75,
    height: '100%',
    display: row ? 'flex' : 'block',
    background: isOverCurrent ? '#eee' : '#333',
    // background: '#333'
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
  onDrop: item => {}
};

export default LayoutContainer;

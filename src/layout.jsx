import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Wrapper from './wrapper';
import { merge } from 'lodash';
import { DropTarget } from 'react-dnd';

const layoutTarget = {
  drop(props, monitor) {
    return props;
  },
  canDrop(props, monitor) {
    return true;
  }
};

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      children: merge([], props.children),
    };
  }

  onDrop = id => () => {
    const children = this.state.children.filter(child => child.props.id !== id);
    this.setState({children});
  }

  addBefore = idx => child => {
    console.log('before', this.state.children[0]);
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx, 0, child]
        ]
      }
    }));
  }

  addAfter = idx => child => {
    console.log('after', child);
    this.setState(update(this.state, {
      children: {
        $splice: [
          [idx + 1, 0, child]
        ]
      }
    }));
  }

  renderChildren = () => {
    return this.state.children.map((child, idx) => {
      return (
        <Wrapper
          key={child.props.id}
          row={this.props.row}
          onDrop={this.onDrop(child.props.id)}
          addBefore={this.addBefore(idx)}
          addAfter={this.addAfter(idx)}>
          {child}
        </Wrapper>
      );
    });
  }

  render() {

    const { children } = this.props;

    const style = styles(this.props);

    return (
      <div style={style.container}>
        {this.renderChildren()}
      </div>
    );
  }
}

const styles = ({ row }) => ({
  container: {
    display: row ? 'flex' : 'block',
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default Layout;

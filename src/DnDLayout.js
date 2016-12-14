import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutState from './model/LayoutState';
import Catalog from './catalog';
import wrap from './wrap';
import { generateRandomKey } from './utils';

class DnDLayout extends Component {

  constructor(props) {
    super(props);
    props.layoutState.onChange(props.onChange);
  }

  getChildContext() {
    return {
      layoutState: this.props.layoutState,
      components: this.props.components,
      readOnly: this.props.readOnly,
      info: this.props.info
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.layoutState !== this.props.layoutState) {
      nextProps.layoutState.onChange(this.props.onChange);
    }
  }

  addItem = (parent, id) => e => {
    this.props.layoutState.addItem(parent, 0, { id, type: 'Column', props: { }, children: [] });
  }

  render() {

    return (
      <div>
        <Catalog />
        {wrap(this.props.readOnly, 'root')}
        <button onClick={this.addItem('root', 'a')}>A</button>
        <button onClick={this.addItem('a', 'b')}>B</button>
        <button onClick={this.addItem('b', 'c')}>C</button>
        <button onClick={this.addItem('c', generateRandomKey())}>D</button>
        <button onClick={() => this.props.layoutState.removeItem('root', 0)}>Delete A</button>
        <button onClick={() => this.props.layoutState.removeItem('b', 0)}>Delete c</button>
      </div>
    );
  }

}

DnDLayout.childContextTypes = {
  layoutState: PropTypes.instanceOf(LayoutState),
  components: PropTypes.object,
  readOnly: PropTypes.bool,
  info: PropTypes.object
};

DnDLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  info: PropTypes.object
};

export default DragDropContext(HTML5Backend)(DnDLayout);

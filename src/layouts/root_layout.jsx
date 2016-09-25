import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { item } from '../redux/schema';
import { normalize } from 'normalizr';
import ColumnLayout from './column';

class RootLayout extends  Component {

  constructor(props) {
    super(props);
    this.root = { id: 'root', props: { children: props.items }};
    this.store = window.store = configureStore(normalize(this.root, item).entities.items);
  }

  getChildContext() {
    return {
      components: this.props.components,
      editable: false
    };
  }

  render() {

    return (
      <Provider store={this.store}>
        <div style={style}>
            <ColumnLayout
              id={"root"}
              {...this.root.props}
              style={{...ColumnLayout.defaultProps.style, ...{padding: 0}}}/>
        </div>
      </Provider>
    );
  }
}

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  minHeight: '100%',
  background: '#eee',
};

RootLayout.childContextTypes = {
  components: PropTypes.object,
  editable: PropTypes.bool
};

RootLayout.defaultProps = {
  onChange: items => {}
};

export default DragDropContext(HTML5Backend)(RootLayout);

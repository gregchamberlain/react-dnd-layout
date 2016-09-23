import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { item } from './redux/schema';
import { normalize } from 'normalizr';
import Layout from './stateless_layout_container';


class LayoutProvider extends  Component {

  constructor(props) {
    super(props);
    this.store = window.store = configureStore(normalize(props.rootItem, item).entities.items);
  }

  getChildContext() {
    return {
      components: this.props.components
    };
  }

  render() {

    const { rootItem } = this.props;
    const Root = DragDropContext(HTML5Backend)(Layout);
    return (
      <Provider store={this.store}>
        <Root id={rootItem.id}/>
      </Provider>
    );
  }
}

LayoutProvider.childContextTypes = {
  components: PropTypes.object
};

export default LayoutProvider;

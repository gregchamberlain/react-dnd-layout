import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { item } from '../redux/schema';
import { normalize } from 'normalizr';
import Layout from '../stateless_layout_container';
import ColumnLayout from './column';
import CatalogItem from '../catalog/catalog_item';
import Catalog from '../catalog/catalog';
import { isEqual } from 'lodash';
import { replaceState } from '../redux/actions';
import ObjectID from 'bson-objectid';

class LayoutProvider extends  Component {

  constructor(props) {
    super(props);
    this.store = configureStore(props.items);
  }

  getChildContext() {
    return {
      components: this.props.components,
      editable: false,
      info: this.props.info || {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(nextProps.items, this.props.items) ||
      !isEqual(nextProps.info, this.props.info)
    ) {
      this.store.dispatch(replaceState(nextProps.items));
    }
  }

  render() {

    const { rootId, components, items } = this.props;
    const rootItem = items[rootId];
    return (
      <Provider store={this.store}>
        <div style={styles.content}>
          <ColumnLayout
            id={rootId}
            {...rootItem.props}
            style={{...ColumnLayout.defaultProps.style, ...{padding: 0}}}/>
        </div>
      </Provider>
    );
  }
}

const styles = {
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100%'
  }
};

LayoutProvider.childContextTypes = {
  components: PropTypes.object,
  editable: PropTypes.bool,
  info: PropTypes.object,
};

const defaultRootItem = {
  id: ObjectID.generate(),
  props: { children: [] },
};

LayoutProvider.defaultProps = {
  rootId: defaultRootItem.id,
  items: {[defaultRootItem.id]: defaultRootItem},
};

export default DragDropContext(HTML5Backend)(LayoutProvider);

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { item } from './redux/schema';
import { normalize } from 'normalizr';
import Layout from './stateless_layout_container';
import ColumnLayout from './layouts/column';
import CatalogItem from './catalog/catalog_item';

window.PropTypes = PropTypes;


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

    const { rootItem, components } = this.props;
    return (
      <Provider store={this.store}>
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'auto', background: '#eee'}}>
          <div style={styles.sidebar}>
            {Object.keys(components).map(c => {
              const Comp = components[c];
              Comp.type = c;
              return <CatalogItem key={c} type={c} Comp={Comp}/>;
            })}
          </div>
          <div style={styles.content}>
            <ColumnLayout
              id={rootItem.id}
              style={{...ColumnLayout.defaultProps.style, ...{margin: 10, display: 'block', padding: 0, paddingBottom: 40, background: '#fff'}}}/>
          </div>
        </div>
      </Provider>
    );
  }
}

const styles = {
  sidebar: {
    position: 'fixed',
    width: 200,
    top: 0,
    left: 0,
    background: '#444',
    height: '100%'
  },
  content: {
    height: '100%',
    marginLeft: 200
  }
};

LayoutProvider.childContextTypes = {
  components: PropTypes.object
};

export default DragDropContext(HTML5Backend)(LayoutProvider);

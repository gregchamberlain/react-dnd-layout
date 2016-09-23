import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { item } from './redux/schema';
import { normalize } from 'normalizr';
import Layout from './stateless_layout_container';
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
        <div>
          <div style={styles.sidebar}>
            {Object.keys(components).map(c => {
              // if (c === 'Layout') return "";
              const Comp = components[c];
              Comp.type = c;
              return (
                <CatalogItem key={c} type={c} Comp={Comp}/>
              );
            })}
          </div>
          <div style={styles.content}>
            <Layout id={rootItem.id}/>
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
    marginLeft: 200
  }
};

LayoutProvider.childContextTypes = {
  components: PropTypes.object
};

export default DragDropContext(HTML5Backend)(LayoutProvider);

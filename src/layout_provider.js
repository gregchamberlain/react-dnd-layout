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
    this.store.subscribe(() => {
      props.onChange(this.store.getState());
    });
    this.state = {
      locked: false
    };
  }

  getChildContext() {
    return {
      components: this.props.components,
      editable: !this.state.locked
    };
  }

  toggleLock = () => {
    this.setState({locked: !this.state.locked});
  }

  render() {

    const { rootItem, components } = this.props;
    return (
      <Provider store={this.store}>
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#eee'}}>
          <div style={styles.sidebar}>
            {Object.keys(components).map(c => {
              const Comp = components[c];
              Comp.type = c;
              return <CatalogItem key={c} type={c} Comp={Comp}/>;
            })}
          </div>
          <div style={styles.content}>
            <button onClick={this.toggleLock}>{this.state.locked ? "Unlock" : "Lock"}</button>
            <ColumnLayout
              id={rootItem.id}
              root
              style={{...ColumnLayout.defaultProps.style, ...{margin: 20, display: 'block', padding: 0, paddingBottom: 40, background: '#fff'}}}/>
          </div>
        </div>
      </Provider>
    );
  }
}

const styles = {
  sidebar: {
    overflow: 'auto',
    position: 'fixed',
    width: 200,
    top: 0,
    left: 0,
    background: '#444',
    height: '100%'
  },
  content: {
    height: '100%',
    overflow: 'auto',
    marginLeft: 200
  }
};

LayoutProvider.childContextTypes = {
  components: PropTypes.object,
  editable: PropTypes.bool
};

LayoutProvider.defaultProps = {
  onChange: items => {}
};

export default DragDropContext(HTML5Backend)(LayoutProvider);

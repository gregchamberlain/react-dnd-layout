import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { item, arrayOfItems } from './redux/schema';
import { normalize } from 'normalizr';
import Layout from './stateless_layout_container';
import ColumnLayout from './layouts/column';
import CatalogItem from './catalog/catalog_item';
import Catalog from './catalog/catalog';
import { isEqual } from 'lodash';
import { fromObject } from 'react-formulate';
import { replaceState } from './redux/actions';
import ObjectID from 'bson-objectid';

class LayoutProvider extends  Component {

  constructor(props) {
    super(props);
    console.log(props.components);
    Object.keys(props.components).forEach(key => {
      const Comp = props.components[key];
      if (Comp.propInputs) return;
      if (Comp.generateInputs) {
        Comp.propInputs = Comp.generateInputs(props.info);
      } else {
        Comp.propInputs = fromObject(Comp.defaultProps);
      }
    });
    this.store = window.store = configureStore(props.items);
    this.store.subscribe(() => {
      props.onChange(this.store.getState());
    });
  }

  update = () => {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.update);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  getChildContext() {
    return {
      components: this.props.components,
      editable: !this.props.locked,
      info: this.props.info || {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.items, this.props.items)) {
      this.store.dispatch(replaceState(nextProps.items));
    }
  }

  render() {

    const { rootId, components, items } = this.props;
    const rootItem = items[rootId];
    const scale = (window.innerWidth - 250) / window.innerWidth;
    const style = styles(scale);
    return (
      <Provider store={this.store}>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#eee', overflow: 'hidden'}}>
          <div style={style.sidebar}>
            <Catalog components={components} />
          </div>
          <div style={style.content}>
            <div style={style.layout}>
              <ColumnLayout
                id={rootId}
                {...rootId.props}
                style={{...ColumnLayout.defaultProps.style, ...{ padding: 0, background: '#fff'}}}/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

const styles = scale => ({
  sidebar: {
    overflow: 'auto',
    position: 'absolute',
    width: 200,
    top: 0,
    left: 0,
    background: '#444',
    height: '100%'
  },
  content: {
    boxSizing: 'border-box',
    padding: 20,
    height: '100%',
    overflow: 'auto',
    marginLeft: 200
  },
  layout: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // position: 'absolute',
    transformOrigin: '0 0 0',
    transform: `scale(${scale})`,
  }
});

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
  info: {},
  items: {[defaultRootItem.id]: defaultRootItem},
  onChange: items => {}
};

export default DragDropContext(HTML5Backend)(LayoutProvider);

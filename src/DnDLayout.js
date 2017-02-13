import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutState from './model/LayoutState';
import Catalog from './catalog';
import ItemEditor from './editor';
import wrap from './wrapper';
import LayoutEditor from './addons/LayoutEditor';
import { generateRandomKey } from './utils';
import Store from './utils/store';

class DnDLayout extends Component {

  constructor(props) {
    super(props);
    props.layoutState.onChange(props.onChange);
    this.store = new Store({
      layoutState: props.layoutState,
      components: props.components,
      addons: [LayoutEditor],
      readOnly: props.readOnly
    });
  }

  getChildContext() {
    return {
      store: this.store,
      info: this.props.info
    };
  }

  componentWillReceiveProps(nextProps) {
    const watched = ['components', 'addons', 'readOnly'];
    if (nextProps.layoutState !== this.props.layoutState) {
      nextProps.layoutState.onChange(this.props.onChange);
      this.store.update('layoutState', nextProps.layoutState);
    }
    watched.forEach(key => {
      if (nextProps[key] !== this.props[key]) this.store.update(key, nextProps[key]);
    });
  }

  render() {

    return (
      <div style={styles.container}>
        <Catalog />
        <div style={styles.layoutEditor}>
          {wrap(this.props.readOnly, 'root')}
        </div>
        <ItemEditor />
      </div>
    );
  }

}

const styles = {
  container: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  layoutEditor: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 20
  }
};

DnDLayout.childContextTypes = {
  store: PropTypes.instanceOf(Store),
  info: PropTypes.object
};

DnDLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  info: PropTypes.object
};

export default DragDropContext(HTML5Backend)(DnDLayout);

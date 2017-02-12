import React, { Component, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';

class ItemEditor extends Component {

  render() {

    const { selectedItem, layoutState } = this.props;
    const { addons, setSelectedItem } = this.context;

    if (!(selectedItem && layoutState.getItem(selectedItem))) return null;

    return (
      <div style={styles.container}>
        <button onClick={() => setSelectedItem(null)}>x</button>
        { addons.map(addon => (
          <div key={addon.Label}>{addon.Label}</div>
        ))}
        <button onClick={() => layoutState.removeItem(selectedItem)}>Delete</button>
        <pre>
          {JSON.stringify(layoutState.getItem(selectedItem).toJS(), null, 4)}
        </pre>
      </div>
    );
  }

}

const styles = {
  container: {
    backgroundColor: '#ccc',
    width: 300,
    height: '100%',
  }
};

ItemEditor.contextTypes = {
  setSelectedItem: PropTypes.func,
  addons: PropTypes.array
};

export default connect('layoutState', 'selectedItem')(ItemEditor);

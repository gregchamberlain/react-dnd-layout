import React, { Component, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';

class ItemEditor extends Component {

  render() {

    const { layoutState, addons } = this.props;

    let selectedItem = layoutState.getSelectedItem();

    if (!selectedItem) return null;

    return (
      <div style={styles.container}>
        <button onClick={() => layoutState.setSelectedItem(null)}>x</button>
        { addons.map(addon => (
          <div key={addon.Label}>{addon.Label}</div>
        ))}
        <button onClick={() => layoutState.removeItem(layoutState.selectedItem)}>Delete</button>
        <pre>
          {JSON.stringify(selectedItem, null, 4)}
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

ItemEditor.propTypes = {
  addons: PropTypes.array
};

export default connect('layoutState', 'addons')(ItemEditor);

import React, { Component, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';

class ItemEditor extends Component {

  render() {

    const { selectedItem } = this.props;
    const { layoutState, addons } = this.context;

    if (!(selectedItem && layoutState.getItem(selectedItem))) return null;

    return (
      <div style={styles.container}>
        { addons.map(addon => (
          <div key={addon.Label}>{addon.Label}</div>
        ))}
        {JSON.stringify(layoutState.getItem(selectedItem).toJS())}
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
  layoutState: PropTypes.instanceOf(LayoutState),
  addons: PropTypes.array
};

export default ItemEditor;

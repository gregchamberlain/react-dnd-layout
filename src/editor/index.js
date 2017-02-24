import React, { Component, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';
import Breadcrumb from './Breadcrumb';
import JSXRenderer from './JSXRenderer';

class ItemEditor extends Component {

  constructor(props) {
    super(props);
    let item = props.layoutState.getSelectedItem();
    if (item) {
      this.state = {
        currentPlugin: 0
      };
    } else {
      this.state = {
        currentPlugin: 0
      };
    }
  }

  handlePluginChange = e => {
    this.setState({ currentPlugin: e.target.value });
  }

  render() {

    const { layoutState, addons } = this.props;

    let selectedItem = layoutState.getSelectedItem();

    if (!selectedItem) return null;

    let Plugin = addons[this.state.currentPlugin].Interface || (() => null);

    return (
      <div style={styles.container}>
        <button onClick={() => layoutState.setSelectedItem(null)}>x</button>
        <select onChange={this.handlePluginChange} value={this.state.currentPlugin}>
          {addons.map((addon, idx) => addon.Interface ? (
            <option key={addon.Title} value={idx}>{addon.Title}</option>
          ) : null )}
        </select>
        <button onClick={() => layoutState.removeItem(layoutState.selectedItem)}>Delete</button>
        <Breadcrumb />
        <Plugin layoutState={layoutState} />
      </div>
    );
  }

}
//         <JSXRenderer id="root" />

const styles = {
  container: {
    backgroundColor: '#455A64',
    width: 300,
    height: '100%',
    boxSizing: 'border-box',
    padding: 10
  }
};

ItemEditor.propTypes = {
  addons: PropTypes.array
};

export default connect('layoutState', 'addons')(ItemEditor);

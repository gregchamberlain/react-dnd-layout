import React, { Component, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';
import Breadcrumb from './Breadcrumb';
import JSXRenderer from './JSXRenderer';
import { jsToCss, cssToJS } from '../utils/parseCss';

class ItemEditor extends Component {

  constructor(props) {
    super(props);
    let item = props.layoutState.getSelectedItem();
    if (item) {
      this.state = {
        style: jsToCss(item.style, null, 2)
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.layoutState.selectedItem && 
    nextProps.layoutState.selectedItem !== this.props.layoutState.selectedItem) {
      this.setState({ style: jsToCss(nextProps.layoutState.getSelectedItem().style) });
    }
  }

  updateStyle = e => {
    this.setState({ style: e.target.value });
  }

  saveStyle = e => {
    try {
      let nextStyle = cssToJS(this.state.style);
      this.props.layoutState.updateItem(this.props.layoutState.selectedItem)(['style'], () => nextStyle);
    } catch (err) {
      console.log(err.message);
    }
  }

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
        <Breadcrumb />
        <button onClick={() => layoutState.removeItem(layoutState.selectedItem)}>Delete</button>
        <h4>Styling</h4>
        <textarea
          placeholder="Enter css styles here"
          value={this.state.style}
          onChange={this.updateStyle}
          style={{width: '100%', boxSizing: 'border-box', height: 200}}
        />
        <button onClick={this.saveStyle}>Save</button>
        <hr />
        <JSXRenderer id="root" />
      </div>
    );
  }

}

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

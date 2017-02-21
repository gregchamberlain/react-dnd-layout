import React, { Component } from 'react';
import { jsToCss, cssToJS } from './parseCss';

class StylePlugin extends Component {

  constructor(props) {
    super(props);
    let item = props.layoutState.getSelectedItem();
    this.state = {
      style: jsToCss(item.style),
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
    return (
      <div>
        <textarea
          placeholder="Enter css styles here"
          value={this.state.style}
          onChange={this.updateStyle}
          style={{width: '100%', boxSizing: 'border-box', height: 200}}
        />
        <button onClick={this.saveStyle}>Save</button>
      </div>
    );
  }
}

StylePlugin.Title = 'Style';

export default StylePlugin;
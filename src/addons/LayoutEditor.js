import React, { Component } from 'react';
import { fromJS } from 'immutable';

class LayoutEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: JSON.stringify(props.item.layout, null, 4),
      error: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.item.layout !== this.props.item.layout) {
      this.setState({ value: JSON.stringify(props.item.layout, null, 4) });
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  }

  save = () => {
    try {
      const layout = JSON.parse(this.state.value);
      this.props.updateItem(['layout'], l => fromJS(layout));
      this.setState({ error: null });
    } catch (e) {
      this.setState({ error: e.message});
    } finally {
    }
  }

  render() {

    const { updateItem, item } = this.props;

    return (
      <div>
        <div>LayoutEditor</div>
        <div>{this.state.error}</div>
        <textarea onChange={this.onChange} value={this.state.value} />
        <button onClick={this.save}>Save</button>
        <button onClick={() => updateItem(['layout', 'display'], d => 'flex')}>Click me!</button>
      </div>
    );
  }
}

LayoutEditor.Icon = '⇄';

export default LayoutEditor;

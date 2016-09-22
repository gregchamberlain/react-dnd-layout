import React, { Component, PropTypes } from 'react';
import Draggable from './draggabe';
import { merge } from 'lodash';

import Target from './target';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      components: merge([], props.components),
    };
  }

  addComponent = idx => component => {
    const components = merge([], this.state.components);
    components.splice(idx, 0, component);
    this.setState({components, droppedIdx: idx});
  }

  removeComponent = idx => () => {
    if (idx > this.state.droppedIdx) idx += 1;
    const components = merge([], this.state.components);
    components.splice(idx, 1);
    this.setState({components});
  }

  render() {

    const components = intersperse(this.state.components.map((c, idx) => {
      return (
        <Draggable {...c.props} remove={this.removeComponent(idx, c.props)} />
      );
    }), idx => <Target onDrop={this.addComponent(idx)}/>);

    return (
      <div style={{flex: 1, height: 500, background: '#ccc', display: 'flex', margin: '25px 0', position: 'relative', overflow: 'hidden'}}>
        <Target onDrop={this.addComponent(0)}/>
          {components}
        <Target onDrop={this.addComponent(this.state.components.length)}/>
      </div>
    );
  }
}

const intersperse = (arr, el) => {
    var res = [], i=0;
    if (i < arr.length)
        res.push(arr[i++]);
    while (i < arr.length)
        res.push(el(i), arr[i++]);
    return res;
};

Layout.propTypes = {
  components: PropTypes.array
};

export default Layout;

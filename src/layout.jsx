import React, { Component, PropTypes } from 'react';

import Target from './target';

class Layout extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const components = intersperse(this.props.components.map((c, idx) => {
      return (
        <div style={{background: c.props.background, flex: 1}}></div>
      );
    }), <Target />);

    return (
      <div style={{flex: 1, height: 500, background: '#ccc', display: 'flex', margin: '0 100px', position: 'relative'}}>
        <Target />
          {components}
        <Target />
      </div>
    );
  }
}

const intersperse = (arr, el) => {
    var res = [], i=0;
    if (i < arr.length)
        res.push(arr[i++]);
    while (i < arr.length)
        res.push(el, arr[i++]);
    return res;
};

Layout.propTypes = {
  components: PropTypes.array
};

export default Layout;

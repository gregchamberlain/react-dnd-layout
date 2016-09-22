import React, { Component, PropTypes } from 'react';

import Target from './target';

class Layout extends Component {
  render() {

    const components = this.props.components.map((c, idx) => {
      return (
        <div style={{background: c.props.background}}></div>
      );
    });

    return (
      <div style={{width: 300, height: 300, background: '#ccc', display: 'flex', marginLeft: 100, position: 'relative'}}>
        <Target />
        <div style={{width: 300, background: '#b535e5'}}></div>
        <Target />
        <div style={{width: 300, background: '#35b5e5'}}></div>
        <Target />
        <div style={{width: 300, background: '#e5b535'}}></div>
        <Target />
      </div>
    );
  }
}

export default Layout;

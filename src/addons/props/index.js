import React, { Component, PropTypes } from 'react';

class PropsPlugin extends Component {

  render() {
    return(
      <div>Props Plugin!</div>
    );
  }
}

PropsPlugin.Title = 'Props'

export default {
  Title: 'Props',
  Interface: PropsPlugin
};
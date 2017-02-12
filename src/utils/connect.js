import React, { Component, PropTypes } from 'react';
import Store from './store';

const withContext = (...items) => Comp => {

  class Connect extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = context.store.subscribe(items, this.updateState);
    }

    componentWillUnmount() {
      this.context.store.unsubscribe(items, this.updateState);
    }

    updateState = (key, value) => {
      this.setState({ [key]: value });
    }

    render() {
      return (
        <Comp {...this.props} {...this.state} />
      );
    }

  }

  Connect.contextTypes = {
    store: PropTypes.instanceOf(Store)
  };

  return Connect;
  
};

export default withContext;

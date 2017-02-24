import React, { Component, PropTypes } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Store from './store';

const withContext = (...items) => WrappedComponent => {

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
        <WrappedComponent {...this.props} {...this.state} />
      );
    }

  }

  Connect.displayName = `Connect(${getDisplayName(WrappedComponent)})`
  hoistNonReactStatic(Connect, WrappedComponent);


  Connect.contextTypes = {
    store: PropTypes.object
  };

  return Connect;
  
};

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withContext;

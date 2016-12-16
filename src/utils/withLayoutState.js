import React, { Component, PropTypes } from 'react';
import Store from './store';

class Connect extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      layoutState: context.store.subscribe(this.updateLayoutState)
    };
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.updateLayoutState);
  }

  updateLayoutState = layoutState => {
    this.setState({ layoutState });
  }

  render() {

    const Comp = this.prop.component;

    return (
      <Comp layoutState={this.state.layoutState} />
    );
  }

}

Connect.contextTypes = {
  store: PropTypes.instanceOf(Store)
};

const withLayoutState = component => () => <Connect component={component} />;

export default withLayoutState;

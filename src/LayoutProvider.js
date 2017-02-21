import React, { Component, PropTypes } from 'react';

import LayoutState from './model/LayoutState';
import Store from './utils/store';

class LayoutProvider extends Component {

  constructor(props) {
    super(props);
    props.layoutState.onChange(props.onChange);
    this.store = new Store({
      layoutState: props.layoutState,
      components: props.components,
      addons: props.addons,
      readOnly: props.readOnly
    });
  }

  getChildContext() {
    return {
      store: this.store,
    };
  }

  componentWillReceiveProps(nextProps) {
    const watched = ['components', 'addons', 'readOnly'];
    if (nextProps.layoutState !== this.props.layoutState) {
      nextProps.layoutState.onChange(this.props.onChange);
      this.store.update('layoutState', nextProps.layoutState);
    }
    watched.forEach(key => {
      if (nextProps[key] !== this.props[key]) this.store.update(key, nextProps[key]);
    });
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

LayoutProvider.childContextTypes = {
  store: PropTypes.instanceOf(Store)
};

LayoutProvider.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  onChange: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
  addons: PropTypes.array,
  readOnly: PropTypes.bool
};

LayoutProvider.defaultProps = {
  addons: []
}

export default LayoutProvider;
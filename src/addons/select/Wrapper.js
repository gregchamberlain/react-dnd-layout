import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { LayoutState, connect } from '../../';

const HOC = (WrappedComponent, displayName) => {

  class SelectWrapper extends PureComponent {

    componentDidMount() {
      if (this.node) {
        this.node.addEventListener('click', this.handleClick);
      }
    }

    componentWillUnmount() {
      if (this.node) {
        this.node.removeEventListener('click', this.handleClick);
      }
    }

    handleClick = e => {
      this.props.layoutState.setSelectedItem(this.props.id);
    }

    render() {
      const { layoutState, pseudoRef, ...props } = this.props;
      return (
        <WrappedComponent {...props} pseudoRef={instance => {
          this.node = findDOMNode(instance);
          pseudoRef(instance);
        }} />
      )
    }
  }

  SelectWrapper.displayName = `SelectWrapper(${displayName})`;
  hoistNonReactStatic(SelectWrapper, WrappedComponent);

  return connect('layoutState')(SelectWrapper);

};

export default HOC;
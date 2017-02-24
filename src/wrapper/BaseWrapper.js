import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Wrapper = (WrappedComponent, displayName) => {

  const BaseWrapper = ({ pseudoRef, ...props }) => {

    class ClassWrapper extends Component {
      render() {
        return <WrappedComponent {...this.props}/>;
      }
    }

    ClassWrapper.displayName = `ClassWrapper(${displayName})`

    return <ClassWrapper {...props} ref={instance => pseudoRef(instance)} />

  }

  BaseWrapper.getDisplayName = `BaseWrapper(${displayName})`;
  hoistNonReactStatic(BaseWrapper, WrappedComponent);

  return BaseWrapper;

}

export default Wrapper;



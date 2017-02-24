import React from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { LayoutState, connect } from '../../';

const HOC = (WrappedComponent, displayName) => {

  const StyleWrapper = ({ pseudoRef, layoutState, ...props }) => (
    <WrappedComponent {...props} pseudoRef={instance => {
      let node = findDOMNode(instance);
      if (node) {
        let style = layoutState.getItemJS(props.id).style;
        Object.keys(style).forEach(key => {
          if (node.style[key] !== style[key]) {
            console.log('Old:', node.style[key], ', New: ', style[key]);
            node.style[key] = style[key];
          }
        });
      }
      pseudoRef(instance);
    }} />
  )

  StyleWrapper.displayName = `StyleWrapper(${displayName})`;
  hoistNonReactStatic(StyleWrapper, WrappedComponent);

  return connect('layoutState')(StyleWrapper);

};

export default HOC;
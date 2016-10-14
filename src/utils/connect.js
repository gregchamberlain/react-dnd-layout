import React, { PropTypes, Component } from 'react';

const connect = mapStateToProps => WrappedComponent => {
  const LayoutStateContainer = (props, { layoutState, onChange }) => {
    return (
      <WrappedComponent
        {...props}
        {...mapStateToProps({ state: layoutState, dispatch: onChange }, props)}
      />
    );
  };

  LayoutStateContainer.contextTypes = {
    layoutState: PropTypes.object,
    onChange: PropTypes.func,
  };

  return LayoutStateContainer;
};

export default connect;

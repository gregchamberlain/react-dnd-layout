import React, { PropTypes, Component } from 'react';
import { is, fromJS } from 'immutable';

const connect = mapStateToProps => WrappedComponent => {
  class LayoutStateContainer extends Component {
    shouldComponentUpdate(props, state, { layoutState, onChange}) {
      const mapProps = mapStateToProps({ state: this.context.layoutState, dispatch: this.context.onChange}, this.props);
      const nextMapProps = mapStateToProps({ state: layoutState, dispatch: onChange }, props);
      const keys = Object.keys(mapProps);
      for (let i=0;i<keys.length;i++) {
        if (!is(mapProps[keys[i]], nextMapProps[keys[i]])) return true;
      }
      return false;
    }
    render() {
      const { layoutState, onChange } = this.context;
      return (
        <WrappedComponent
          {...(this.props)}
          {...mapStateToProps({ state: layoutState, dispatch: onChange }, this.props)}
        />
      );
    }
  }

  LayoutStateContainer.contextTypes = {
    layoutState: PropTypes.object,
    onChange: PropTypes.func,
  };

  return LayoutStateContainer;
};

export default connect;

import React, { PropTypes, Component } from 'react';
import { is, fromJS } from 'immutable';

const connect = mapStateToProps => WrappedComponent => {
  class LayoutStateContainer extends Component {
    shouldComponentUpdate(props, state, { layoutState, onChange}) {
      const mapProps = mapStateToProps({ state: this.context.layoutState, dispatch: this.context.onChange}, this.props);
      const nextMapProps = mapStateToProps({ state: layoutState, dispatch: onChange }, props);
      if (!is(fromJS(mapProps), fromJS(nextMapProps))) return true;
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

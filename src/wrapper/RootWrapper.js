import React, { PureComponent } from 'react';

import { connect }from '../utils';
import BaseWrapper from './BaseWrapper';

class RootWrapper extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      component: null
    };
  }

  componentWillMount() {
    this.wrap(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id || nextProps.addons !== this.props.addons) {
      this.wrap(nextProps);
    }
  }

  wrap = props => {
    const type = props.layoutState.getItemJS(props.id).type;
    let component = BaseWrapper(props.components[type], type);
    props.addons.forEach(addon => {
      if (addon.Wrapper) {
        component = addon.Wrapper(component, type);
      }
    })
    this.setState({ component });
  }

  render() {
    const { id, layoutState } = this.props;
    const item = layoutState.getItemJS(id);
    const WrappedComponent = this.state.component;
    return (
      <WrappedComponent pseudoRef={() => {}} id={id}>
        {React.Children.map(item.children, childId => (
          <Wrapper key={childId} id={childId} />
        ))}
      </WrappedComponent>
    );
  }

}

const Wrapper = connect('layoutState', 'components', 'addons')(RootWrapper);

export default Wrapper;
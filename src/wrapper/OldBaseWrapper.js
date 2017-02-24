import React, { Component, PropTypes } from 'react';
import { findDOMNode} from 'react-dom';

import LayoutState from '../model/LayoutState';
import { connect } from '../utils';

class BaseWrapper extends Component {

  getWrappedComp = Comp => {
    const { addons } = this.props;
    let wrappedComp = Comp;
    addons.forEach(addon => {
      if (addon.Wrapper) {
        wrappedComp = addon.Wrapper(wrappedComp);
      }
    });
    return wrappedComp;
  }

  render() {

    const { id, layoutState, components } = this.props;
    const item = layoutState.getItemJS(id);
    const Comp = components[item.type];
    class Wrapped extends Component {

      render() {
        return (
            <Comp {...item.props} id={item.id}>
              {React.Children.map(item.children, childId => (
                <Wrapper
                  key={childId}
                  id={childId}
                />
              ))}
            </Comp>
        );
      }
    }
    Wrapped.displayName = item.type;
    const WrappedComp = this.getWrappedComp(Wrapped);

    return (
      <Wrapped id={id} ref={node => console.log(findDOMNode(node))}/>
    );
  }

}

BaseWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  addons: PropTypes.array.isRequired
};

const Wrapper = connect('layoutState', 'components', 'addons')(BaseWrapper);

export default Wrapper;



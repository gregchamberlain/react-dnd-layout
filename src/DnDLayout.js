import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutState from './model/LayoutState';
import Catalog from './catalog';
import wrap from './wrap';
import LayoutEditor from './addons/LayoutEditor';
import { generateRandomKey } from './utils';

class DnDLayout extends Component {

  constructor(props) {
    super(props);
    props.layoutState.onChange(props.onChange);
  }

  getChildContext() {
    return {
      addons: [LayoutEditor],
      layoutState: this.props.layoutState,
      components: this.props.components,
      readOnly: this.props.readOnly,
      info: this.props.info
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.layoutState !== this.props.layoutState) {
      nextProps.layoutState.onChange(this.props.onChange);
    }
  }

  render() {

    return (
      <div>
        <Catalog />
        {wrap(this.props.readOnly, 'root')}
      </div>
    );
  }

}

DnDLayout.childContextTypes = {
  addons: PropTypes.array,
  layoutState: PropTypes.instanceOf(LayoutState),
  components: PropTypes.object,
  readOnly: PropTypes.bool,
  info: PropTypes.object
};

DnDLayout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  info: PropTypes.object
};

export default DragDropContext(HTML5Backend)(DnDLayout);

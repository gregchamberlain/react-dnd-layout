import React, { PropTypes } from 'react';
import Wrapper from '../wrapper';

const ItemWrapper = ({ item }, { editable, components }) => {
  const Comp = components[item.type];
  return editable ? (
    <Wrapper />
  ) : (
    <div></div>
  );
};

ItemWrapper.contextTypes = {
  components: React.PropTypes.object,
  editable: PropTypes.bool,
};

const wrapItems = (items, options) => {
  items.map((item, index) => {

  });
};

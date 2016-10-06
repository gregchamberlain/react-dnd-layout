import React, { PropTypes } from 'react';
import Wrapper from '../wrapper';

const ItemWrapper = ({}, { editable }) => (
  editable ? (
    <div></div>
  ) : (
    <div></div>
  )
);

ItemWrapper.contextTypes = {
  editable: PropTypes.bool
};

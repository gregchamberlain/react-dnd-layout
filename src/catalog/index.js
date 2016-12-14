import React, { PropTypes } from 'react';

import CatalogItem from './CatalogItem';

const Catalog = (props, { components }) => (
  <div>
    { Object.keys(components).map(key => (
      <CatalogItem key={key} type={key} component={components[key]}/>
    ))}
  </div>
);

Catalog.contextTypes = {
  components: PropTypes.object
};

export default Catalog;

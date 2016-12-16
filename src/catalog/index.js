import React, { PropTypes } from 'react';

import CatalogItem from './CatalogItem';

const Catalog = (props, { components }) => (
  <div style={styles.container}>
    { Object.keys(components).map(key => (
      <CatalogItem key={key} type={key} component={components[key]}/>
    ))}
  </div>
);

const styles = {
  container: {
    backgroundColor: '#ccc',
    width: 200,
    height: '100%',
  }
};

Catalog.contextTypes = {
  components: PropTypes.object
};

export default Catalog;

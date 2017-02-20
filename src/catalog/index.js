import React, { PropTypes } from 'react';

import CatalogItem from './CatalogItem';
import { connect } from '../utils';

import TestDrag from './TestComp';

const Catalog = ({ components }) => (
  <div style={styles.container}>
    { Object.keys(components).map(key => (
      <CatalogItem key={key} type={key} component={components[key]}/>
    ))}
    <TestDrag />
  </div>
);

const styles = {
  container: {
    backgroundColor: '#455A64',
    width: 200,
    height: '100%',
  }
};

Catalog.propTypes = {
  components: PropTypes.object.isRequired
};

export default connect('components')(Catalog);

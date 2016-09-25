import React from 'react';
import CatalogItem from './catalog_item';

const Catalog = ({ components }) => (
  <div style={style}>
    {Object.keys(components).map(c => {
      const Comp = components[c];
      Comp.type = c;
      return <CatalogItem key={c} type={c} Comp={Comp}/>;
    })}
  </div>
);

const style = {
  display: 'flex',
  flexWrap: 'wrap',
};

export default Catalog;

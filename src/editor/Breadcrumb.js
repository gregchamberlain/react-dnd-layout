import React from 'react';

import { connect } from '../utils';

const Breadcrumb = ({ layoutState }) => {
  const ancestors = layoutState.getAncestors(layoutState.selectedItem);
  return (
    <div>
      {ancestors.map((item, idx) => (
        <span key={item.id}>
          <span
            style={style(idx === ancestors.length - 1)}
            onClick={() => layoutState.setSelectedItem(item.id)}
          >
            {item.type}
          </span>
          { idx === ancestors.length - 1 ? '' : <span style={{ fontWeight: 'bold', cursor: 'default' }}>></span> }
        </span>
      ))}
    </div>
  );
};

let style = current => ({
  padding: '0 5px',
  cursor: 'pointer',
  fontWeight: current ? 'bold' : 'normal'
});

export default connect('layoutState')(Breadcrumb);
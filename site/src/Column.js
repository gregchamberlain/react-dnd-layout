import React from 'react';

const Column = ({ children }) => (
  <div style={{display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: 5}}>
    This is a column!
    {children}
  </div>
);

export default Column;

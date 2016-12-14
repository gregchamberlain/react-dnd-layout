import React from 'react';

const Column = ({ children }) => (
  <div style={{display: 'flex', flexDirection: 'column', padding: 15}}>
    This is a column!
    {children}
  </div>
);

export default Column;

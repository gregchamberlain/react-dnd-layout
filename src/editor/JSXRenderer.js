import React from 'react';

import { connect } from '../utils';

const Tag = ({ layoutState, id }) => {
  const item = layoutState.getItemJS(id);
  const current = id === layoutState.selectedItem;
  const handleClick = () => layoutState.setSelectedItem(id);
  return item.children.length ? (
    <div>
      <div style={style(current)} onClick={handleClick}>{'<'}{item.type}{'>'}</div>
      {item.children.map(childId => (
        <div key={childId} style={{paddingLeft: 15}}><Renderer id={childId}/></div>
      ))}
      <div style={style(current)} onClick={handleClick}>{'</'}{item.type}{'>'}</div>
    </div>
  ) : (
    <div style={style(current)} onClick={handleClick}>{'<'}{item.type}{' />'}</div>
  );
};

const style = curr => ({
  cursor: 'pointer',
  fontWeight: curr ? 'bold' : 'normal'
});

const Renderer = connect('layoutState')(Tag);

export default Renderer;
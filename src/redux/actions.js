export const CHANGE = 'CHANGE';
export const UPDATE_PROPS = 'UPDATE_PROPS';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REPLACE_STATE = 'REPLACE_STATE';
export const MOVE_ITEM = 'MOVE_ITEM';

export const change = (id, items) => ({
  type: CHANGE,
  id,
  items
});

export const moveItem = (from, to, item) => ({
  type: MOVE_ITEM,
  from,
  to,
  item
});

export const updateProps = (id, props) => ({
  type: UPDATE_PROPS,
  id,
  props
});

export const updateLayout = (id, layout) => ({
  type: UPDATE_LAYOUT,
  id,
  layout
});

export const addItem = (id, item) => ({
  type: ADD_ITEM,
  id,
  item,
});

export const removeItem = (id, parentId, index) => ({
  type: REMOVE_ITEM,
  id,
  parentId,
  index
});

export const replaceState = state =>({
  type: REPLACE_STATE,
  state
});

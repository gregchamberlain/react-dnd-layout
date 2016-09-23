export const CHANGE = 'CHANGE';
export const UPDATE_PROPS = 'UPDATE_PROPS';

export const change = (id, items) => ({
  type: CHANGE,
  id,
  items
});

export const updateProps = (id, props) => ({
  type: UPDATE_PROPS,
  id,
  props
});

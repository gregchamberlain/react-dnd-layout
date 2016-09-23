export const CHANGE = 'CHANGE';

export const change = (id, items) => ({
  type: CHANGE,
  id,
  items
});

import { merge } from 'lodash';

export const mergeItems = (state, id) => state[id].props.children.map(cId => state[cId]);

export const deepMerge = window.deepMerge = (state, id) => {
  let item = merge({}, state[id]);
  let children = item.props.children;
  if (Array.isArray(children)) {
    children = mergeItems(state, id);
    children = children.map(child => deepMerge(state, child.id));
  }
  item.props.children = children;
  return item;
};

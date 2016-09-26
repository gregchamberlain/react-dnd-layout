import { merge } from 'lodash';
import ObjectID from 'bson-objectid';

export const mergeItems = (state, id) => state[id].props.children.map(cId => state[cId]);

export const deepMerge = (state, id) => {
  let item = merge({}, state[id]);
  let children = item.props.children;
  if (Array.isArray(children)) {
    children = mergeItems(state, id);
    children = children.map(child => deepMerge(state, child.id));
  }
  item.props.children = children;
  return item;
};

export const generateEmptyLayout = providedId => {
  const id = providedId || ObjectID.generate();
  return {
    [id]: {
      id,
      props: {
        children: []
      }
    }
  };
};

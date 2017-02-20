import { merge } from 'lodash';
import { Record, Map, fromJS } from 'immutable';

export const mergeItems = (state, id) => state.getIn([id, 'props']).children.map(cId => state[cId]);

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

const ItemRecord = Record({ type: '', id: '', props: Map({}), layout: Map({})});


export const generateEmptyLayout = () => {
  return Map({
    root: new ItemRecord({
      type: 'Column',
      id: 'root',
      props: fromJS({
        children: []
      })
    })
  });
};
import {
  CHANGE, UPDATE_PROPS, ADD_ITEM, REMOVE_ITEM, REPLACE_STATE, UPDATE_LAYOUT, MOVE_ITEM
 } from './actions';
import update from 'react/lib/update';
import { merge } from 'lodash';

let nextState;
const Reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      nextState = update(state, {[action.id]: {
        props: {
          children: {
            $set: action.items.map(item => item.id)
          }
        }
      }});
      return nextState;
    case MOVE_ITEM:
      if (!action.from) {
        return update(state, {
          [action.to.id]: { props: { children: { $splice: [[action.to.index, 0, action.item]]}}},
        });
      }
      if (action.to.id === action.from.id) {
        if (action.from.index <= action.to.index) action.to.index -= 1;
        return update(state, {
          [action.from.id]: { props: { children: { $splice: [[action.from.index, 1],[action.to.index, 0, action.item]]}}},
        });
      }
      return update(state, {
        [action.from.id]: { props: { children: { $splice: [[action.from.index, 1]]}}},
        [action.to.id]: { props: { children: { $splice: [[action.to.index, 0, action.item]]}}}
      });
    case UPDATE_PROPS:
      return update(state, {[action.id]: {
        props: { $set: action.props }
      }});
    case UPDATE_LAYOUT:
      return update(state, {[action.id]: {
        layout: { $set: action.layout }
      }});
    case ADD_ITEM:
      nextState = merge({}, state);
      nextState[action.item.id] = action.item;
      return nextState;
    case REMOVE_ITEM:
      if (action.parentId) {
        const idx = state[action.parentId].props.children.indexOf(action.id);
        nextState = update(state, {[action.parentId]: {
          props: {
            children: {
              $splice: [
                [idx, 1]
              ]
            }
          }
        }});
      } else {
        nextState = merge({}, state);
      }
      return deepRemove(nextState, action.id);
    case REPLACE_STATE:
      return merge({}, action.state);
    default:
      return state;
  }
};

const deepRemove = (state, id) => {
  const item = state[id];
  if (Array.isArray(item.props.children)) {
    item.props.children.forEach(childId => {
      state = deepRemove(state, childId);
    });
  }
  delete state[id];
  return state;
};

export default Reducer;

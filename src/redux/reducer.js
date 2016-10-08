import {
  CHANGE, UPDATE_PROPS, ADD_ITEM, REMOVE_ITEM, REPLACE_STATE, UPDATE_LAYOUT, MOVE_ITEM
} from './actions';
import update from 'react/lib/update';
import { merge } from 'lodash';
import { Map } from 'immutable';

let nextState;
const Reducer = (state = Map({}), action) => {
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
      if (action.to.id === action.from.id && action.from.index <= action.to.index) action.to.index -= 1;
      nextState = state.updateIn([action.from.id, 'props', 'children'], c => c.splice(action.from.index, 1));
      nextState = nextState.updateIn([action.to.id, 'props', 'children'], c => c.splice(action.to.index, 0, action.item));
      return nextState;
      // return update(state, {
      //   [action.from.id]: { props: { children: { $splice: [[action.from.index, 1]]}}},
      //   [action.to.id]: { props: { children: { $splice: [[action.to.index, 0, action.item]]}}}
      // });
    case UPDATE_PROPS:
      return update(state, {[action.id]: {
        props: { $set: action.props }
      }});
    case UPDATE_LAYOUT:
      return update(state, {[action.id]: {
        layout: { $set: action.layout }
      }});
    case ADD_ITEM:
      nextState = state.
        set(action.item.id, action.item).
        updateIn([action.id, 'props', 'children'], c => c.push(action.item.id));
      return nextState;
      // nextState = merge({}, state);
      // return state.set(action.item.get('id'), action.item);
      // nextState[action.item.id] = action.item;
      // return nextState;
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
      return deepRemove(state, action.id);
    case REPLACE_STATE:
      return merge({}, action.state);
    default:
      return state;
  }
};

const deepRemove = (state, id) => {
  const item = state.get(id);
  const children = state.getIn([id, 'props', 'children']);
  if (Array.isArray(children)) {
    children.forEach(c => {
      state = deepRemove(state, c);
    });
  }
  return state.delete(id);
};

export default Reducer;

import {
  CHANGE, UPDATE_PROPS, ADD_ITEM, REMOVE_ITEM, REPLACE_STATE, UPDATE_LAYOUT, MOVE_ITEM
} from './actions';
import update from 'react/lib/update';
import { merge } from 'lodash';
import { Map } from 'immutable';
import deepRemove from '../utils/deepRemove';

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
      return state.setIn([action.id, 'props'], action.props);
    case UPDATE_LAYOUT:
      return state.setIn([action.id, 'layout'], action.layout);
    case ADD_ITEM:
      nextState = state.
        set(action.item.id, action.item).
        updateIn([action.id, 'props', 'children'], c => c.splice(action.index, 0, action.item.id));
      return nextState;
    case REMOVE_ITEM:
      nextState = state.updateIn([action.parentId, 'props', 'children'], c => c.splice(action.index, 1));
      return deepRemove(nextState, action.id);
    case REPLACE_STATE:
      return merge({}, action.state);
    default:
      return state;
  }
};

export default Reducer;

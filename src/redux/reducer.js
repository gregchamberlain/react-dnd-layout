import { CHANGE, UPDATE_PROPS } from './actions';
import update from 'react/lib/update';
import { merge } from 'lodash';

let nextState;
const Reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      console.log(action.items);
      nextState = merge({}, state);
      action.items.forEach(item => {
        if (!nextState[item.id])
          nextState[item.id] = item;
      });
      return update(nextState, {[action.id]: {
        props: {
          children: {
            $set: action.items.map(item => item.id)
          }
        }
      }});
    case UPDATE_PROPS:
      return update(state, {[action.id]: {
        props: { $set: action.props }
      }});
    default:
      return state;
  }
};

export default Reducer;

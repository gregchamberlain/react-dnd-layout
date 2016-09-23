import { CHANGE } from './actions';
import update from 'react/lib/update';
import { merge } from 'lodash';

const Reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      console.log(action.items);
      const nextState = merge({}, state);
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
    default:
      return state;
  }
};

export default Reducer;

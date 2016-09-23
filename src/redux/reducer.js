import { CHANGE } from './actions';
import update from 'react/lib/update';

const Reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      return update(state, {[action.id]: {
        items: {
          $set: action.items
        }
      }});
    default:

  }
};

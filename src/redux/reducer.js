import { CHANGE } from './actions';
import update from 'react/lib/update';

const Reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      console.log(action.items.map(item => item.id));
      return update(state, {[action.id]: {
        items: {
          $set: action.items.map(item => item.id)
        }
      }});
    default:
      return state;
  }
};

export default Reducer;

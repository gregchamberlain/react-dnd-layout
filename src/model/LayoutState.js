import Item from './Item.js';
import { Map, fromJS } from 'immutable';

const LayoutState = () => {};

const RootItem = new Item({type: 'Column', id: 'root', props: fromJS({children: []})});

LayoutState.createEmpty = () => Map({
  root: RootItem
});

LayoutState.fromJS = js => {
  const state = {};
  Object.keys(js).forEach(key => {
    state[key] = new Item(fromJS(js[key]));
  });
  return Map(state);
};

export default LayoutState;

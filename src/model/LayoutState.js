import Item from './Item.js';
import { Record, Map, fromJS } from 'immutable';

// const LayoutState = () => {};
const RootItem = new Item({type: 'Column', id: 'root', props: fromJS({children: []})});
const defaultRecord = {
  items: Map({root: RootItem})
};
const LayoutStateRecord = Record(defaultRecord);
class LayoutState extends LayoutStateRecord {

  addItem(parent, index, item) {
    return this.
      setIn(['items', item.id], item).
      updateIn(
        ['items', parent, 'props', 'children'],
        c => c.splice(index, 0, item.id)
      );
  }

  moveItem(from, to, id) {
    return this.updateIn(
      ['items', from.id, 'props', 'children'],
      c => c.splice(from.index, 1)
    ).updateIn(
      ['items', to.id, 'props', 'children'],
      c => c.splice(to.index, 0, id)
    );
  }
}

LayoutState.createEmpty = () => Map({
  root: RootItem
});

export default LayoutState;

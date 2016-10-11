import Item from './Item.js';
import { Record, Map, fromJS } from 'immutable';
import deepRemove from '../utils/deepRemove';

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

  moveItem(from, to) {
    let id;
    return this.updateIn(
      ['items', from.id, 'props', 'children'],
      c => {
        id = c.get(from.index);
        return c.splice(from.index, 1);
      }
    ).updateIn(
      ['items', to.id, 'props', 'children'],
      c => c.splice(to.index, 0, id)
    );
  }

  removeItem(parentId, index) {
    let id;
    const nextState = this.updateIn(
      ['items', parentId, 'props', 'children'],
      c => {
        id = c.get(index);
        return c.splice(index, 1);
      }
    );
    return nextState.set('items', deepRemove(nextState.get('items'), id));
  }

  updateProps(id, nextProps) {
    return this.setIn(['items', id, 'props'], nextProps);
  }

  updateLayout(id, nextLayout) {
    return this.setIn(['items', id, 'layout'], nextLayout);
  }
}

LayoutState.createEmpty = () => Map({
  root: RootItem
});

export default LayoutState;

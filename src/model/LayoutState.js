import { Record, fromJS } from 'immutable';

import { generateRandomKey } from '../utils';

export const deepRemove = (map, id) => {
  const children = map.getIn(['items', id, 'children']);
  if (children) children.forEach(c => {
    map = deepRemove(map, c);
  });
  return map.deleteIn(['items', id]);
};

class LayoutState extends Record({ items: fromJS({ root: { id: 'root', type: 'Column', props: { },  children: [] } }) }) {

  constructor() {
    super();
    this.dragging = null;
  }

  onChange(listener) {
    this.listener = listener;
  }

  getItem(id) {
    return this.items.get(id);
  }

  getItemJS(id) {
    return this.items.get(id).toJS();
  }

  addItem(parentId, idx, item) {
    let nextState;
    if (item.id) {
      if (parentId === item.parent.id && idx > item.parent.idx) {
        idx--;
      }
      nextState = this
        .updateIn(['items', item.parent.id, 'children'], c => c.filter(id => id !== item.id))
        .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id))
        .setIn(['items', item.id, 'parent'], fromJS({ id: parentId, idx }));
    } else {
      item.id = generateRandomKey();
      item.parent = { id: parentId, idx: idx };
      nextState = this
        .setIn(['items', item.id], fromJS(item))
        .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id));
    }
    this.listener(nextState);
  }

  removeItem(id) {
    if (id === 'root') return;
    let parent = this.getIn(['items', id, 'parent', 'id']);
    let nextState = this.updateIn(['items', parent, 'children'], c => c.filter(cId => cId !== id));
    this.listener(deepRemove(nextState, id));
  }
  
  moveItem(from) {
    return (to) => {
      if (to.id === from.id && from.idx <= to.idx) to.idx -= 1;
      let item;
      const nextState = this.updateIn(['items', from.id, 'children'], c => {
        item = c.get(from.idx);
        return c.splice(from.idx, 1);
      }).updateIn(['items', to.id, 'children'], c => c.splice(to.idx, 0, item));
      this.listener(nextState);
    };
  }

  updateItem(id) {
    return (path, func) => {
      this.listener(this.updateIn(['items', id, ...path], func));
    };
  }

}

export default LayoutState;

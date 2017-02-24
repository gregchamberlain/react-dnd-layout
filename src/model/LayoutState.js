import { Record, fromJS } from 'immutable';

export const deepRemove = (map, id) => {
  const children = map.getIn(['items', id, 'children']);
  if (children) children.forEach(c => {
    map = deepRemove(map, c);
  });
  return map.deleteIn(['items', id]);
};

const defaultItems = fromJS({ root: {
  id: 'root',
  type: 'Column',
  props: { },
  children: [],
  style: { }
}});


class LayoutState extends Record({ items: defaultItems, selectedItem: null }) {

  onChange(listener) {
    this.listener = listener;
  }

  getItemJS(id) {
    const item = this.items.get(id);
    return item && item.toJS();
  }

  generateRandomKey() {
    let key;
    while (key === undefined || this.items.has(key) || !isNaN(Number(key))) {
      key = Math.floor(Math.random() * Math.pow(2, 24)).toString(32);
    }
    return key;
  }

  insertOrMoveItem(parentId, idx, item) {
    return item.id ? this.moveItem(parentId, idx, item) : this.insertItem(parentId, idx, item);
  }

  insertItem(parentId, idx, item) {
    item.id = this.generateRandomKey();
    item.parent = { id: parentId, idx: idx };
    let nextState = this
      .setIn(['items', item.id], fromJS(item))
      .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id));
    this.listener(nextState);
    return item;
  }

  moveItem(parentId, idx, item) {
    if (parentId === item.parent.id && idx > item.parent.idx) {
      idx--;
    }
    let nextState = this
      .updateIn(['items', item.parent.id, 'children'], c => c.filter(id => id !== item.id))
      .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id))
      .setIn(['items', item.id, 'parent'], fromJS({ id: parentId, idx })); 
    this.listener(nextState);
    return item;
  }

  removeItem(id) {
    if (id === 'root') return;
    const item = this.getItemJS(id);
    let parent = item.parent.id;
    let nextState = this.updateIn(['items', parent, 'children'], c => c.filter(cId => cId !== id));
    this.listener(deepRemove(nextState, id));
    return item;
  }

  updateItem(id) {
    return (path, func) => {
      this.listener(this.updateIn(['items', id, ...path], func));
    };
  }

  setSelectedItem(id) {
    if (this.selectedItem === id) return;
    this.listener(this.set('selectedItem', id));
  }

  getSelectedItem() {
    const item = this.items.get(this.selectedItem);
    return item && item.toJS();
  }

  getAncestors(id) {
    let result = [this.getItemJS(id)];
    while (result[0].parent && result.length < 4) {
      result.unshift(this.getItemJS(result[0].parent.id));
    }
    return result;
  }

  toRaw() {
    return this.items.toJS();
  }

}

LayoutState.fromRaw = raw => {
  let layoutState = new LayoutState();
  return layoutState.set('items', fromJS(raw));
};

export default LayoutState;

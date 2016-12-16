import { Record, fromJS } from 'immutable';

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

  addItem(parentId, idx, item) {
    let nextState = this
      .setIn(['items', item.id], fromJS(item))
      .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id));
    this.listener(nextState);
  }

  removeItem(parentId, idx) {
    let id;
    let nextState = this.updateIn(['items', parentId, 'children'], c => {
      id = c.get(idx);
      if (id === 'root') return c;
      return c.splice(idx, 1);
    });
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

import { Record, fromJS } from 'immutable';

export const deepRemove = (map, id) => {
  const children = map.getIn(['items', id, 'props', 'children']);
  if (children) children.forEach(c => {
    map = deepRemove(map, c);
  });
  return map.deleteIn(['items', id]);
};

class LayoutState extends Record({ items: fromJS({ root: { id: 'root', type: 'column', props: { children: [] } } }) }) {

  onChange(listener) {
    this.listener = listener;
  }

  getItem(id) {
    return this.items.get(id);
  }

  addItem(item) {
    this.listener(this.setIn(['items', item.id], fromJS(item)));
  }

  removeItem(parentId, idx) {
    let id;
    let nextState = this.updateIn(['items', parentId, 'props', 'children'], c => {
      id = c.get(idx);
      return c.splice(idx, 1);
    });
    this.listener(deepRemove(nextState, id));
  }

}

export default LayoutState;

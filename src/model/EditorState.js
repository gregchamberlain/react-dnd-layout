// @flow

import { Record, Stack, Map, fromJS } from 'immutable';
import Item from './Item';

const defaultRecord = {
  items: Map({
    root: new Item({
      id: 'root',
      type: 'column',
      props: fromJS({
        children: []
      })
    })
  }),
  selectedItem: null,
};

const LayoutStateRecord = Record(defaultRecord);

class LayoutState {
  _immutable: LayoutStateRecord;

  static createEmpty(): LayoutState {
    return new LayoutState(new LayoutStateRecord());
  }

  static addItem(
    layoutState: LayoutState,
    id: string,
    index: number,
    item: Item
  ): LayoutState {
    return layoutState._immutable.
    setIn(['items', item.id], item).
    updateIn(['items', id, 'props', 'children'], c => (
      c.splice(index, 0, item.id)
    ));
  }

  constructor(immutable: LayoutStateRecord) {
    this._immutable = immutable;
  }

  getImmutable() {
    return this._immutable;
  }
}
window.EditorState = LayoutState;

export default LayoutState;

import LayoutState from '../../src/model/LayoutState';

const rootItem = { id: 'root', type: 'Column', props: {}, style: {}, children: ['item1', 'item2'] };
const item1 = { id: 'item1', type: 'Test', props: {}, style: {}, children: [], parent: { id: 'root', idx: 0 } };
const item2 = { id: 'item2', type: 'Test', props: {}, style: {}, children: [], parent: { id: 'root', idx: 1 } };

const items = {
  root: rootItem,
  item1,
  item2
};

let state = LayoutState.fromRaw(items);
let nextItem = { type: 'Test', props: {}, children: [], style: {} };

describe('LayoutState', () => {

  describe('addItem', () => {
    let nextState;
    let changeListener = jest.fn(s => { nextState = s });
    state.onChange(changeListener);
    let newItem = state.addItem('root', 0, nextItem);
    it('calls onChange with the new state', () => {
      expect(changeListener).toHaveBeenCalled();
    });

    it('inserts item in parents children, at the correct index', () => {
      expect(nextState.getIn(['items', 'root', 'children', 0])).toEqual(newItem.id);
    })

    it('adds the item to nextState', () => {
      expect(nextState.getItem(newItem.id)).not.toBeUndefined();
    });

    it('returns the item', () => {
      expect(newItem).not.toBeUndefined();
    });
    
  });

  describe('moveItem', () => {
    let nextState;
    let changeListener = jest.fn(s => { nextState = s });
    state.onChange(changeListener);
    let newItem = state.moveItem('item1', 0, state.getItemJS('item2'));

    it('calls onChange with the new state', () => {
      expect(changeListener).toHaveBeenCalled();
    });

    it('removes item from old parents children', () => {
      expect(nextState.getIn(['items', 'root', 'children'])).not.toContain('item2');
    });

    it('inserts item in parents children, at the correct index', () => {
      expect(nextState.getIn(['items', 'item1', 'children', 0])).toEqual(newItem.id);
    });

    it('returns the moved item', () => {
      expect(newItem).not.toBeUndefined();
    })

  });

});

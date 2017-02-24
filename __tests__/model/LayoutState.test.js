import { is } from 'immutable';

import LayoutState from '../../src/model/LayoutState';

const rootItem = { id: 'root', type: 'Column', props: {}, style: {}, children: ['item1', 'item2'] };
const item1 = { id: 'item1', type: 'Test', props: {}, style: {}, children: ['item3'], parent: { id: 'root', idx: 0 } };
const item2 = { id: 'item2', type: 'Test', props: {}, style: {}, children: [], parent: { id: 'root', idx: 1 } };
const item3 = { id: 'item3', type: 'Test', props: {}, style: {}, children: [], parent: { id: 'item1', idx: 0 } };

const items = {
  root: rootItem,
  item1,
  item2
};

let state = LayoutState.fromRaw(items);
let referenceState = LayoutState.fromRaw(items);
state.onChange(() => {});
let nextItem = { type: 'Test', props: {}, children: [], style: {} };

describe('LayoutState', () => {

  describe('#insertOrMoveItem', () => {
    let oldInsert = state.insertItem;
    state.insertItem = jest.fn((...args) => oldInsert.call(state, ...args));
    let oldMove = state.moveItem;
    state.moveItem = jest.fn((...args) => oldMove.call(state, ...args));
    state.insertOrMoveItem('root', 0, nextItem);
    it('calls insertItem with a new item', () => {
      expect(state.insertItem).toHaveBeenCalledWith('root', 0, nextItem);
    });
    state.insertOrMoveItem('item1', 0, item2);
    it('calls moveItem with an existing item', () => {
      expect(state.moveItem).toHaveBeenCalledWith('item1', 0, item2)
    })
  });

  describe('#insertItem', () => {
    let nextState;
    let changeListener = jest.fn(s => { nextState = s });
    state.onChange(changeListener);
    let newItem = state.insertItem('root', 0, nextItem);
    it('calls onChange with the new state', () => {
      expect(changeListener).toHaveBeenCalled();
    });

    it('inserts item in parents children, at the correct index', () => {
      expect(nextState.getIn(['items', 'root', 'children', 0])).toEqual(newItem.id);
    })

    it('adds the item to nextState', () => {
      expect(nextState.getItemJS(newItem.id)).not.toBeUndefined();
    });

    it('returns the item', () => {
      expect(newItem).not.toBeUndefined();
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    })
    
  });

  describe('#moveItem', () => {

    describe('same parent', () => {

      let nextState;
      let changeListener = jest.fn(s => { nextState = s });
      state.onChange(changeListener);
      let newItem = state.moveItem('root', 2, state.getItemJS('item1'));

      it('calls onChange with the new state', () => {
        expect(changeListener).toHaveBeenCalled();
      });

      it('inserts item in parents children, at the correct index', () => {
        expect(nextState.getIn(['items', 'root', 'children', 1])).toEqual(newItem.id);
      });

      it('returns the moved item', () => {
        expect(newItem).not.toBeUndefined();
      });

      it('doesnt mutate the original state', () => {
        expect(is(state,referenceState)).toBe(true);
      });

    });

    describe('new parent', () => {
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
      });

      it('doesnt mutate the original state', () => {
        expect(is(state,referenceState)).toBe(true);
      });

    });

  });

  describe('#updateitem', () => {
    let nextState
    let changeListener = jest.fn(s => { nextState = s });
    state.onChange(changeListener);
    state.updateItem('root')(['props', 'test'], () => 1);

    it('updates the item', () => {
      expect(nextState.getItemJS('root').props.test).toEqual(1);
    });

    it('calls onChange with the new state', () => {
      expect(changeListener).toHaveBeenCalledWith(nextState);
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    });

  });

  describe('#removeItem', () => {
    let nextState
    let changeListener = jest.fn(s => { nextState = s });
    state.onChange(changeListener);
    let removedItem = state.removeItem('item1');

    it('calls onChange with the next state', () => {
      expect(changeListener).toHaveBeenCalledWith(nextState);
    });

    it('returns the removed item', () => {
      expect(removedItem).not.toBeUndefined();
    });

    it('removes the item', () => {
      expect(nextState.getItemJS('item1')).toBeUndefined();
    });

    it('removes the items children', () => {
      expect(nextState.getItemJS('item3')).toBeUndefined();
    });

    it('removes the item from parents children', () => {
      expect(nextState.getIn(['items', removedItem.parent.id, 'children'])).not.toContain(removedItem.id);
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    });
  });

  describe('#getitemJS', () => {

    it('with a valid id, returns the item object', () => {
      expect(state.getItemJS('item1')).toEqual(item1);
    });

    it('with invalid id, returns undefined', () => {
      expect(state.getItemJS('non-existent-id')).toBeUndefined();
    })

  });

  describe('#getSelectedItem', () => {

    it('returns undefined when no item is selected', () => {
      expect(state.getSelectedItem()).toBeUndefined();
    });

    let nextState = state.set('selectedItem', 'root');

    it('returns the selected item', () => {
      expect(nextState.getSelectedItem().id).toEqual('root');
    });

  });

  describe('#setSelectedItem', () => {
    let nextState;
    let changeListener = jest.fn(s => { nextState = s });
    state.onChange(changeListener);
    state.setSelectedItem('root');

    it('sets the selected item', () => {
      expect(nextState.get('selectedItem')).toEqual('root');
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    });

  });

  describe('#getAncestors', () => {
    let ancestors = state.getAncestors('item1');
    it('returns an array of the items ancestors', () => {
      expect(ancestors).toEqual([rootItem, item1]);
    });
  });

  describe('#generateRandomKey', () => {
    const key = state.generateRandomKey();
    it('returns a random key', () => {
      expect(key).not.toBeUndefined();
    });
  });

  describe('#toRaw', () => {
    let raw = state.toRaw();
    expect(raw).toEqual(items);
  });

  describe('#onChange', () => {
    let changeListener = jest.fn();
    state.onChange(changeListener);
    it('sets the onChange listener', () => {
      expect(state.listener).toEqual(changeListener);
    });
  });

});

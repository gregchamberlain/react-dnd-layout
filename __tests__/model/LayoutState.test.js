import LayoutState from '../../src/model/LayoutState';

let state = new LayoutState();
let nextState;
state.onChange(s => { nextState = s });

let item = { type: 'Test', props: {}, children: [], style: {} };

describe('LayoutState', () => {

  describe('addItem', () => {
    const changeListener = jest.fn();
    state.onChange(changeListener);
    let newItem = state.addItem('root', 0, item);

    it('calls onChange', () => {
      expect(changeListener).toHaveBeenCalled();
    });

    it('does not mutate original state', () => {
      expect(state.getItem(newItem.id)).toBeUndefined();
    });
  });

});

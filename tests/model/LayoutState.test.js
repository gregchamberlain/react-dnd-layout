import expect from 'expect.js';

import LayoutState from '../../src/model/LayoutState';

let state = new LayoutState();
let nextState;
state.onChange(s => { nextState = s });

let item = { type: 'Test', props: {}, children: [], style: {} };

describe('LayoutState', () => {

  describe('addItem', () => {
    state.addItem('root', 0, item);
    it('does not mutate original state', () => {
      expect(nextState).not.to.equal(state);
    });
  });

});

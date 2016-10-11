import LayoutState from '../LayoutState';
import Item from '../Item';
import { Map, is, fromJS } from 'immutable';
const root = new Item({id: 'root', props: { children: ['asd1'] }});
const asd1 = new Item({id: 'asd1', props: { children: ['asd2'] }});
const asd2 = new Item({id: 'asd2'});
const asd3 = new Item({id: 'asd3'});
const items = Map({
  root,
  asd1,
  asd2
});
let layoutState = new LayoutState({items});

describe('addItem', () => {
  const nextState = layoutState.addItem('root', 0, asd3);
  it('adds an item to the layout', () => {
    expect(nextState.getIn(['items', 'asd3', 'id'])).toBe('asd3');
  });
  it('adds the id to the parents chidren list', () => {
    expect(nextState.getIn(['items', 'root', 'props', 'children', 0])).toBe('asd3');
  });
  it('doesn\'t mutate the original state', () => {
    expect(is(layoutState, new LayoutState({items}))).toBe(true);
  });
});

describe('moveItem', () => {
  const from = { id: 'asd1', index: 0 };
  const to = { id: 'root', index: 1 };
  const nextState = layoutState.moveItem(from, to);
  it('removes the item from the "from" items children', () => {
    expect(nextState.getIn(['items', 'asd1', 'props', 'children', 0])).toBe(undefined);
  });
  it('inserts the item into the "to" items children', () => {
    expect(nextState.getIn(['items', 'root', 'props', 'children', 1])).toBe('asd2');
  });
});

describe('removeItem', () => {
  const nextState = layoutState.removeItem('root', 0);
  it('removes item from parents children', () => {
    expect(nextState.getIn(['items', 'root', 'props', 'children']).size).toBe(0);
  });
  it('removes item from items', () => {
    expect(nextState.getIn(['items', 'asd1'])).toBe(undefined);
  });
  it('removes items children from items', () => {
    expect(nextState.getIn(['items', 'asd2'])).toBe(undefined);
  });
});

describe('updateProps', () => {
  const nextState = layoutState.updateProps('asd2', fromJS({color: 'red'}));
  it('updates the items props', () => {
    expect(nextState.getIn(['items', 'asd2', 'props', 'color'])).toBe('red');
  });
});

describe('updateLayout', () => {
  const nextState = layoutState.updateLayout('asd2', fromJS({flex: 2}));
  it('updates the items layout', () => {
    expect(nextState.getIn(['items', 'asd2', 'layout', 'flex'])).toBe(2);
  });
});

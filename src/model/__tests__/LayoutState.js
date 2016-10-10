import LayoutState from '../LayoutState';
import Item from '../Item';
import { Map, is } from 'immutable';
const layoutState = new LayoutState();
let nextState;
describe('addItem', () => {
  nextState = layoutState.addItem('root', 0, new Item({id: 'asd1', type: 'Row'}));
  it('adds an item to the layout', () => {
    expect(nextState.getIn(['items', 'asd1', 'id'])).toBe('asd1');
  });
  it('adds the id to the parents chidren list', () => {
    expect(nextState.getIn(['items', 'root', 'props', 'children', 0])).toBe('asd1');
  });
  it('doesn\'t mutate the original state', () => {
    expect(is(layoutState, new LayoutState())).toBe(true);
  });
});
// console.log(layoutState);
// let nextState;
// nextState = layoutState.addItem('root', 0, new Item({id: 'asd1', type: 'Row'}));
// console.log('--- ORIGINAL ---');
// console.log(layoutState);
// console.log('--- NEXT ---');
// console.log(nextState);

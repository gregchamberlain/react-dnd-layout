const Immutable = require('immutable');
const LayoutState = require('./lib/model/LayoutState').default;
const dyno = require('js-dyno');

let state = new LayoutState();
state.onChange(nextState => { state = nextState; });
state.addItem('root', 0, { id: 'a', props: { children: [] } });
state.onChange(nextState => { state = nextState; });
state.addItem('a', 0, { id: 'b', props: { children: [] } });
state.onChange(nextState => { state = nextState; });
state.addItem('a', 0, { id: 'c', props: { children: [] } });
state.onChange(nextState => { state = nextState; });
state.addItem('root', 0, { id: 'd', props: { children: [] } });

function remove() {
  state.removeItem('root', 1);
}

dyno(100, remove);

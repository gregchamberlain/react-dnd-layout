import { Record, Map } from 'immutable';

const Item = Record({
  type: '',
  id: '',
  props: Map({}),
  layout: Map({})
});

export default Item;

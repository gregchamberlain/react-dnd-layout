import { Record, Map } from 'immutable';

const Item = Record({
  type: '',
  id: '',
  props: Map({}),
  layout: Map({
    flex: 1
  })
});

export default Item;

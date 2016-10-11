import { Record, Map, fromJS } from 'immutable';

const defaultItem = fromJS({
  id: '',
  type: '',
  props: {
    children: []
  },
  layout: {
    flex: 1
  }
});

const ItemRecord = Record({
  type: '',
  id: '',
  props: fromJS({
    children: []
  }),
  layout: Map({
    flex: 1
  })
});

class Item extends ItemRecord {
  constructor(props) {
    super(fromJS(props));
  }
}

export default Item;

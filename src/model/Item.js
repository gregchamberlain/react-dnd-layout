import { Record, fromJS } from 'immutable';

const Item = Record(fromJS({
  id: '',
  type: '',
  props: {}
}));


export default Item;

import Item from './src/model/Item';
import { fromJS } from 'immutable';

const js = {
  id: 'root',
  props: {
    children: []
  },
};

const item = new Item(js);
console.log(item);

import Item from './src/model/Item';
import { fromJS } from 'immutable';

const js = {
  id: 'root',
  props: {
    children: []
  },
};

const map = fromJS(js);

console.log('--- IMMUTABLE ---');
let startTime = new Date();
for (let i=0;i<1000;i++) {
  map.updateIn(['props','children'], c => c.push(8));
}
console.log(new Date() - startTime);

console.log('--- MUTABLE ---');
startTime = new Date();
for (let i=0;i<1000;i++) {
  js.props.children.push(8);
}
console.log(new Date() - startTime);

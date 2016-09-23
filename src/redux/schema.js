import { Schema, arrayOf } from 'normalizr';

export const item = new Schema('items');
export const arrayOfItems = arrayOf(item);

item.define({
  items: arrayOfItems
});

import { createStore } from 'redux';
import Reducer from './reducer';

const configureStore = (preloadedState) => createStore(
  Reducer,
  preloadedState
);

export default configureStore;

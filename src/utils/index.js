export generateRandomKey from './generateRandomKey';
export connect from './connect';

export const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
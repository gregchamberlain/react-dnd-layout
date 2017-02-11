class Store {

  constructor(layoutState) {
    this.layoutState = layoutState;
    this.listeners = new Set();
  }

  updateLayoutState(layoutState) {
    this.layoutState = layoutState;
    this.listeners.forEach(listener => {
      listener(this.layoutState);
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return this.layoutState;
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

}

export default Store;

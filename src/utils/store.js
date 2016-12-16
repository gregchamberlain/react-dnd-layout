class Store {
  constructor(layoutState) {
    this.layoutState = layoutState;
    this.listeners = [];
  }

  updateLayoutState(layoutState) {
    this.layoutState = layoutState;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return this.layoutState;
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter(list => listener !== list);
  }

}

export default Store;

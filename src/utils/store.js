class Store {

  constructor(state) {
    this.state = state;
    this.listeners = {};
  }

  update(key, value) {
    this.state[key] = value;
    this.listeners[key].forEach(listener => {
      listener(key, value);
    });
  }

  subscribe(keys, listener) {
    let result = {};
    keys.forEach(key => {
      if (this.listeners[key]) {
        this.listeners[key].add(listener);
      } else {
        this.listeners[key] = new Set([listener]);
      }
      result[key] = this.state[key];
    });
    return result;
  }

  unsubscribe(keys, listener) {
    keys.forEach(key => {
      if (this.listeners[key]) {
        this.listeners[key].delete(listener);
      }
    });
  }

}

export default Store;

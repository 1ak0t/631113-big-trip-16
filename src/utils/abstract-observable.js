class AbstractObservable {
  #observers = new Set();

  addObserver(observer) {
    this.#observers.add(observer);
  }

  removeObserver(observer) {
    this.#observers.delete(observer);
  }

  _notify(eventType, payload) {
    this.#observers.forEach((observer) => observer(eventType, payload));
  }
}

export default AbstractObservable;

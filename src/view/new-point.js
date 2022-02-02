import AbstractView from './abstract-view';

const createNewPointButtonTemplate = () => ('<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" data-button-type="new-point">New event</button>');

export default class NewPoint extends AbstractView {

  get template() {
    return createNewPointButtonTemplate();
  }

  setNewPointClickHandler = (callbackFirst, callbackSecond) => {
    this._callback.newPointClickFirst = callbackFirst;
    this._callback.newPointClickSecond = callbackSecond;
    this.element.addEventListener('click', this.#newPointClickHandler);
  }

  #newPointClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.newPointClickFirst(evt.target.dataset.buttonType);
    this._callback.newPointClickSecond();
  }
}

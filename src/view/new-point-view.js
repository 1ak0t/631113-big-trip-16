import AbstractView from './abstract-view';

const createNewPointButtonTemplate = () => ('<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" data-button-type="new-point">New event</button>');

export default class NewPointView extends AbstractView {

  get template() {
    return createNewPointButtonTemplate();
  }

  setNewPointClickHandler = (setMenuType, createNewPoint) => {
    this._callback.setMenuType = setMenuType;
    this._callback.createNewPoint = createNewPoint;
    this.element.addEventListener('click', this.#newPointClickHandler);
  }

  #newPointClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.setMenuType(evt.target.dataset.buttonType);
    this._callback.createNewPoint();
    evt.target.disabled = true;
  }
}

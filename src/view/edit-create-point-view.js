import {makePhotosListTemplate, makeOffersListTemplate, setPhotosClassByAvailable, setOffersClassByAvailable, setDescriptionClassByAvailable} from '../utils/utils';
import SmartView from './smart-view';

const createEventEditTemplate = (data, destinations) => {
  const {type, destination, price, offers, dateFrom, dateTo} = data;
  const dateStart = dateFrom.format('DD/MM/YY HH:mm');
  const dateEnd = dateTo.format('DD/MM/YY HH:mm');

  const makeCityDatalistTemplate = (destinationsList) => {
    const pointCities = [];
    destinationsList.forEach((destinationItem) => pointCities.push(`<option value="${destinationItem.name}"></option>`));
    return pointCities.join('');
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${makeCityDatalistTemplate(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="${setOffersClassByAvailable(offers)}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${makeOffersListTemplate(offers)}
          </div>
        </section>

        <section class="${setDescriptionClassByAvailable(destination.description, destination.pictures)}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="${setPhotosClassByAvailable(destination.pictures)}">
            <div class="event__photos-tape">
              ${makePhotosListTemplate(destination.pictures)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditCreatePointView extends SmartView{
  #choosedOffers = [];
  #offers = [];
  #destinations = [];

  constructor(point, offers, destinations) {
    super();
    this._data = EditCreatePointView.parsePointToData(point);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#setInnerHandlers();
  }

  get template() {
    return createEventEditTemplate(this._data, this.#destinations);
  }

  reset = (point) => {
    this.updateData(EditCreatePointView.parsePointToData(point));
  }

  resetData = () => {
    this._data.choosedOffers.length = 0;
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setSubmitFormHandler(this._callback.submitClick);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
  }

  setSubmitFormHandler = (callback) => {
    this._callback.submitClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #getOffersList = (offers, type) => offers.filter((offer) => offer['type'] === type)[0].offers;

  #getDestination = (destinations, destinationName) => (destinations.filter((destination) => destination.name === destinationName)[0]);

  #setInnerHandlers = () => {
    this.#setTypeInputHandler();
    this.#setDestinationInputHandler();
    this.#setChooseOfferHandler();
  }

  #setTypeInputHandler = () => {
    const typeInput = this.element.querySelectorAll('.event__type-input');
    typeInput.forEach((input) => input.addEventListener('input', this.#typeInputChangeHandler));
  }

  #setDestinationInputHandler =() => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputChangeHandler);
  }

  #setChooseOfferHandler = () => {
    const offerButtons = this.element.querySelectorAll('.event__offer-checkbox');
    if (offerButtons.length > 0) {
      offerButtons.forEach((button) => button.addEventListener('click', this.#offerCheckboxClickHandler));
    }
  }

  #typeInputChangeHandler = (evt) => {
    this.updateData({
      type: evt.target.value,
      offers: this.#getOffersList(this.#offers, evt.target.value),
    });
  }

  #destinationInputChangeHandler = (evt) => {
    this.updateData({
      destination: this.#getDestination(this.#destinations, evt.target.value),
    });
  }

  #offerCheckboxClickHandler = (evt) => {
    const button = evt.target.dataset.id;
    const offerId = Number(button);
    if (this.#choosedOffers.length > 0 && this.#choosedOffers.includes(offerId)) {
      this.#choosedOffers.splice(this.#choosedOffers.indexOf(offerId),1);
      this._data = {...this._data, choosedOffers: this.#choosedOffers};
      return;
    }
    this.#choosedOffers.push(offerId);
    this._data = {...this._data, choosedOffers: this.#choosedOffers};
  }

  #closeButtonClickHandler = () => {
    this._callback.closeClick();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick(EditCreatePointView.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({...point})

  static  parseDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}

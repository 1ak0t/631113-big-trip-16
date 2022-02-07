import {makePhotosListTemplate, makeOffersListTemplate, setPhotosClassByAvailable, setOffersClassByAvailable, setDescriptionClassByAvailable} from '../utils/utils';
import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createEventEditTemplate = (data, destinations, availableOffers) => {
  const {type, destination, price, offers, dateFrom, dateTo, isDisabled, isSaving, isDeleting} = data;
  const startDate = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const endDate = dayjs(dateTo).format('DD/MM/YY HH:mm');

  const makeCityDatalistTemplate = (destinationsItems) => {
    const pointCities = [];
    destinationsItems.forEach((destinationItem) => pointCities.push(`<option value="${destinationItem.name}"></option>`));
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
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${makeCityDatalistTemplate(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" min="1" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="${setOffersClassByAvailable(availableOffers)}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${makeOffersListTemplate(offers, availableOffers)}
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
  #availableOffers = [];
  #destinations = [];
  #offers = [];
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(point, offers, destinations) {
    super();
    this._data = EditCreatePointView.parsePointToData(point);
    this.#destinations = [...destinations];
    this.#offers = [...offers];
    this.#availableOffers = this.#getOffersList(offers, this._data.type);
    this.#setInnerHandlers();
    this.#setInputTypeChecked();
  }

  get template() {
    return createEventEditTemplate(this._data, this.#destinations, this.#availableOffers);
  }

  #getOffersList = (offersList, type) => offersList.find((offer) => offer['type'] === type).offers;

  #getDestination = (destinations, destinationName) => (destinations.find((destination) => destination.name === destinationName));

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
  }

  setSubmitFormHandler = (callback) => {
    this._callback.submitClick = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonClickHandler);
  }

  #setInputTypeChecked = () => {
    const typeInput = this.element.querySelectorAll('.event__type-input');
    typeInput.forEach((input) => {
      if (input.value === this._data.type) {
        input.checked = true;
      }
    });
  }

  #setInnerHandlers = () => {
    this.#setTypeInputHandler();
    this.#setDestinationChangeHandler();
    this.#setDestinationClickHandler();
    this.#setPriceInputHandler();
    this.#setChooseOfferHandler();
    this.#setStartDatePicker();
    this.#setEndDatePicker();
  }

  #setTypeInputHandler = () => {
    const typeInput = this.element.querySelectorAll('.event__type-input');
    typeInput.forEach((input) => input.addEventListener('input', this.#typeInputChangeHandler));
  }

  #setDestinationChangeHandler =() => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputChangeHandler);
  }

  #setDestinationClickHandler =() => {
    this.element.querySelector('.event__input--destination').addEventListener('click', this.#destinationInputClickHandler);
  }

  #setPriceInputHandler =() => {
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputHandler);
  }

  #setChooseOfferHandler = () => {
    const offerButtons = this.element.querySelectorAll('.event__offer-checkbox');
    if (offerButtons.length > 0) {
      offerButtons.forEach((button) => button.addEventListener('click', this.#offerCheckboxClickHandler));
    }
  }

  #setStartDatePicker = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: this._data.dateTo,
      }
    );
  }

  #setEndDatePicker = () => {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._data.dateFrom,
      }
    );
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset = (point) => {
    this.updateData(EditCreatePointView.parsePointToData(point));
  }

  resetData = () => {
    if (this._data.length > 0) {
      this._data.offers.length = 0;
    }
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setSubmitFormHandler(this._callback.submitClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  restoreInputTypeChecked = () => {
    this.#setInputTypeChecked();
  }

  #typeInputChangeHandler = (evt) => {
    this.#availableOffers = this.#getOffersList(this.#offers, evt.target.value);
    this.updateData({
      type: evt.target.value,
      offers: [],
    });
    this.#setInputTypeChecked();
  }

  #destinationInputChangeHandler = (evt) => {
    const datalist = evt.target.list.options;
    let optionFound = false;
    for (const dataItem of datalist) {
      if (evt.target.value === dataItem.value) {
        optionFound = true;
        break;
      }
    }

    if (optionFound) {
      evt.target.setCustomValidity('');
      this.updateData({
        destination: this.#getDestination(this.#destinations, evt.target.value),
      });
    } else {
      evt.target.setCustomValidity('Выберите пункт назначения из возможных вариантов');
    }
  }

  #destinationInputClickHandler = (evt) => {
    evt.target.value = '';
  }

  #priceInputHandler = (evt) => {
    this.updateData({
      price: evt.target.valueAsNumber,
    });
  }

  #offerCheckboxClickHandler = (evt) => {
    const button = evt.target.dataset.id;
    const offerId = Number(button);
    if (this._data.offers.length > 0 && this._data.offers.some((offer) => offer.id === offerId)) {
      this._data.offers = this._data.offers.filter((offer) => offer.id !== offerId);
      return;
    }
    this._data.offers.push(this.#availableOffers.find((offer) => offer.id === offerId));
  }

  #closeButtonClickHandler = () => {
    this._callback.closeClick();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitClick(EditCreatePointView.parseDataToPoint(this._data));
  }

  #deleteButtonClickHandler = () => {
    this._callback.deleteClick(EditCreatePointView.parseDataToPoint(this._data));
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  static parsePointToData = (point) => ({...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  })

  static  parseDataToPoint = (data) => {
    const point = {...data};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}

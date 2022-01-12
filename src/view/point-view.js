import AbstractView from './abstract-view';

const createEventTemplate = (point) => {
  const {type, destination, price, offers, isFavorite, dateFrom, dateTo, selectedOffers} = point;
  const createOfferListTemplate = (currentOffers) => {
    const offerListFragment = [];
    currentOffers.forEach((offer) => {
      if (selectedOffers.includes(offer.id)){
        const offerTemplate = `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
          </li>`;
        offerListFragment.push(offerTemplate);
      }
    });
    return offerListFragment.join('');
  };
  const likeState = isFavorite ? 'event__favorite-btn  event__favorite-btn--active' : 'event__favorite-btn';

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom.toISOString()}">${dateFrom.format('D MMM')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.toISOString()}">${dateFrom.format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.toISOString()}">${dateTo.format('HH:mm')}</time>
        </p>
        <p class="event__duration">${dateTo.subtract(dateFrom).format('DD[D] HH[H] mm[M]')}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOfferListTemplate(offers)}
      </ul>
      <button class="${likeState}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class PointView extends AbstractView{
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editButtonClickHandler);
  }

  setLikeClickHandler = (callback) => {
    this._callback.likeClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#likeClickHandler);
  }

  #editButtonClickHandler = () => {
    this._callback.editClick();
  }

  #likeClickHandler = () => {
    this._callback.likeClick();
  }
}
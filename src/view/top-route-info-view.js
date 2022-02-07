import AbstractView from './abstract-view';
import {getCitiesListOnTopTemplate, sortByTime} from '../utils/utils';
import dayjs from 'dayjs';

const createRouteInfoTemplate = (points) => {
  const sortPoints = points.slice().sort(sortByTime);
  const tripCities = [];
  let tripTotalPrice = 0;
  sortPoints.forEach((point) => {
    tripCities.push(point.destination.name);
    tripTotalPrice += point.price;
    point.offers.forEach((offer) => {
      tripTotalPrice += offer.price;
    });
  });

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getCitiesListOnTopTemplate(tripCities)}</h1>

      <p class="trip-info__dates">${dayjs(points[0].dateFrom).format('D MMM')} &mdash; ${dayjs(points[points.length - 1].dateFrom).format('D MMM')}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripTotalPrice}</span>
    </p>
  </section>`;
};

class TopRouteInfoView extends AbstractView{
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createRouteInfoTemplate(this.#points);
  }
}

export default TopRouteInfoView;

import AbstractView from './abstract-view';
import {getCitiesListOnTopTemplate, sortByTime} from '../utils/utils';
import dayjs from 'dayjs';

const createRouteInfoTemplate = (points) => {
  points.sort(sortByTime);
  const tripCities = [];
  let tripTotalPrice = 0;
  points.forEach((point) => {
    tripCities.push(point.destination.name);
    tripTotalPrice += point.price;
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

export default class TopRouteInfoView extends AbstractView{
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createRouteInfoTemplate(this.#points);
  }
}

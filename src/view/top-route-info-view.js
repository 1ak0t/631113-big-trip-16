import AbstractView from './abstract-view';
import {setCitiesListOnTop, sortByTime} from '../utils/utils';

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
      <h1 class="trip-info__title">${setCitiesListOnTop(tripCities)}</h1>

      <p class="trip-info__dates">${points[0].dateFrom.format('D MMM')} &mdash; ${points[points.length - 1].dateFrom.format('D MMM')}</p>
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

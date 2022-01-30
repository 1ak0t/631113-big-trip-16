import AbstractView from './abstract-view';
import {FilterType} from '../utils/consts';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future tasks',
  [FilterType.PAST]: 'There are no past tasks',
};

const createEmptyListTemplate = (filterType) => (`<p class="trip-events__msg">${NoPointsTextType[filterType]}</p>`);

export default class ListEmptyView extends AbstractView{
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}

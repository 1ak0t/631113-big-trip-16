import {render} from '../render';
import FilterView from '../view/filter-view';
import {RenderPosition} from '../render';
import {UpdateType} from '../utils/consts';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = new FilterView();
  #filterModels = null;

  constructor(filterContainer, filterModels) {
    this.#filterContainer = filterContainer;
    this.#filterModels = filterModels;
  }

  init = () => {
    this.#filterComponent.setFilterTypeChangeHandler(this.#changeFilterType);
    render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFORE_END);
  }

  #changeFilterType = (filterType) => {
    this.#filterModels.setFilter(UpdateType.MINOR, filterType);
  }
}

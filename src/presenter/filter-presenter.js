import {remove, render} from '../render';
import FilterView from '../view/filter-view';
import {RenderPosition} from '../render';
import {UpdateType} from '../utils/consts';

class FilterPresenter {
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

  destroy = () => {
    remove(this.#filterComponent);
  }

  #changeFilterType = (filterType) => {
    this.#filterModels.setFilter(UpdateType.MINOR, filterType);
  }
}

export default FilterPresenter;

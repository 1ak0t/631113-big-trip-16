import {remove, render, RenderPosition} from '../render';
import TopRouteInfoView from '../view/top-route-info-view';

class TopRouteInfoPresenter {
  #topRouteInfoContainer = null;
  #topRouteInfoComponent = null;
  #pointsModel = null;

  constructor(topRouteInfoContainer, pointsModel) {
    this.#topRouteInfoContainer = topRouteInfoContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    return this.#pointsModel.points;
  }

  init = () => {
    this.#topRouteInfoComponent = new TopRouteInfoView(this.points);
    render(this.#topRouteInfoContainer, this.#topRouteInfoComponent, RenderPosition.AFTER_BEGIN);
    this.#pointsModel.addObserver(this.#handlePriceChange);
  }

  destroy = () => {
    remove(this.#topRouteInfoComponent);
  }

  #handlePriceChange = () => {
    this.destroy();
    this.init();
  }
}

export default TopRouteInfoPresenter;

import {RenderPosition, render, remove} from './render.js';
import {MenuItem} from './utils/consts';
import TopRouteInfoView from './view/top-route-info-view';
import MenuView from './view/menu-view';
import PointsListPresenter from './presenter/points-list-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import StatisticsView from './view/statistics-view';
import NewPointView from './view/new-point-view';
import ApiService from './api-service';
import LoadingView from './view/loading-view';
import TopRouteInfoPresenter from './presenter/top-route-info-presenter';

const AUTHORIZATION = 'Basic akjn323kj23j';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip/';

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-main__trip-controls');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const loadingComponent = new LoadingView();
const siteMenuComponent = new MenuView();
const filterPresenter = new FilterPresenter(filterElement, filterModel);
const pointsListPresenter = new PointsListPresenter(tripEventsContainerElement, pointsModel, filterModel);
const topRouteInfoPresenter = new TopRouteInfoPresenter(mainTripElement, pointsModel);
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_ITEM:
      pointsListPresenter.destroy();
      filterPresenter.destroy();
      remove(statisticsComponent);
      pointsListPresenter.init(pointsModel.offers, pointsModel.destinations);
      filterPresenter.init();
      break;
    case MenuItem.TABLE:
      pointsListPresenter.init(pointsModel.offers, pointsModel.destinations);
      filterPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      pointsListPresenter.destroy();
      filterPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(tripEventsContainerElement, statisticsComponent, RenderPosition.AFTER_END);
      statisticsComponent.setCharts();
      break;
  }
};

render(tripEventsContainerElement, loadingComponent, RenderPosition.BEFORE_END);

pointsModel.init().finally(() => {
  const offers = pointsModel.offers;
  const destinations = pointsModel.destinations;
  const points = pointsModel.points;
  remove(loadingComponent);
  if (pointsModel.points.length > 0) {
    topRouteInfoPresenter.init(points);
  }
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  const newPointComponent = new NewPointView();
  render(navigationElement, newPointComponent, RenderPosition.AFTER_END);
  render(navigationElement, siteMenuComponent, RenderPosition.AFTER_BEGIN);
  newPointComponent.setNewPointClickHandler(handleSiteMenuClick, pointsListPresenter.createPoint);
  filterPresenter.init();
  pointsListPresenter.init(offers, destinations);
});


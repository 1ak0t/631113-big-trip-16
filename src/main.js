import {RenderPosition, render, remove} from './render.js';
import {MenuItem} from './utils/consts';
import {generatePoint, offers, destinations} from './mock/point.js';
import TopRouteInfoView from './view/top-route-info-view';
import MenuView from './view/menu-view';
import PointsListPresenter from './presenter/points-list-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import StatisticsView from './view/statistics-view';
import NewPoint from './view/new-point';

const POINT_COUNT = 10;

const points = Array.from({length: POINT_COUNT},generatePoint);

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-main__trip-controls');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const siteMenuComponent = new MenuView();
const filterPresenter = new FilterPresenter(filterElement, filterModel);
const pointsListPresenter = new PointsListPresenter(tripEventsContainerElement, pointsModel, filterModel);
const statisticsComponent = new StatisticsView(pointsModel.points);
const newPointComponent = new NewPoint();

render(mainTripElement, new TopRouteInfoView(points), RenderPosition.AFTER_BEGIN);
render(navigationElement, siteMenuComponent, RenderPosition.AFTER_BEGIN);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_ITEM:
      pointsListPresenter.destroy();
      filterPresenter.destroy();
      remove(statisticsComponent);
      pointsListPresenter.init(offers, destinations);
      filterPresenter.init();
      break;
    case MenuItem.TABLE:
      pointsListPresenter.init(offers, destinations);
      filterPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      pointsListPresenter.destroy();
      filterPresenter.destroy();
      render(tripEventsContainerElement, statisticsComponent, RenderPosition.AFTER_END);
      statisticsComponent.setCharts();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
render(navigationElement, newPointComponent, RenderPosition.AFTER_END);
newPointComponent.setNewPointClickHandler(handleSiteMenuClick, pointsListPresenter.createPoint);
filterPresenter.init();
pointsListPresenter.init(offers, destinations);

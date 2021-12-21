import {RenderPosition, render} from './render.js';
import {generatePoint} from './mock/point.js';
import TopRouteInfoView from './view/top-routeinfo-view';
import MenuView from './view/menu-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import PointsListView from './view/points-list-view';
import ListEmptyView from './view/list-empty-view';
import EditCreateEventView from './view/edit-create-event-view';
import EventView from './view/event-view';

const POINT_COUNT = 15;

const points = Array.from({length: POINT_COUNT},generatePoint);

const renderPoints = (pointsListElement, point) => {
  const eventComponent = new EventView(point);
  const eventEditComponent = new EditCreateEventView(point);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      pointsListElement.replaceChild(eventComponent.element, eventEditComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onArrowDownButtonClick = () => {
    pointsListElement.replaceChild(eventEditComponent.element, eventComponent.element);
    document.addEventListener('keydown', onEscKeyDown);
  };

  const onArrowUpButtonClick = () => {
    pointsListElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };
  const onPointSubmit = (evt) => {
    evt.preventDefault();
    pointsListElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };

  eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onArrowDownButtonClick);

  eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onArrowUpButtonClick);
  eventEditComponent.element.querySelector('form').addEventListener('submit', onPointSubmit);
  render(pointsListElement, eventComponent.element, RenderPosition.BEFORE_END);
};

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

render(mainTripElement, new TopRouteInfoView(points).element, RenderPosition.AFTER_BEGIN);
render(navigationElement, new MenuView().element, RenderPosition.BEFORE_END);
render(filterElement, new FilterView().element, RenderPosition.BEFORE_END);

const tripEventsContainerElement = document.querySelector('.trip-events');

if (points.length === 0) {
  render(tripEventsContainerElement, new ListEmptyView().element, RenderPosition.BEFORE_END);
} else {
  const pointsListComponent = new PointsListView();
  render(tripEventsContainerElement, pointsListComponent.element, RenderPosition.BEFORE_END);

  render(pointsListComponent.element, new SortView().element, RenderPosition.BEFORE_BEGIN);
  for (let i = 1; i < POINT_COUNT; i++) {
    renderPoints(pointsListComponent.element, points[i]);
  }
}

import {RenderPosition, render, replace} from './render.js';
import {generatePoint} from './mock/point.js';
import TopRouteInfoView from './view/top-route-info-view';
import MenuView from './view/menu-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import PointsListView from './view/points-list-view';
import ListEmptyView from './view/list-empty-view';
import EditCreateEventView from './view/edit-create-event-view';
import EventView from './view/event-view';

const POINT_COUNT = 15;

const points = Array.from({length: POINT_COUNT},generatePoint);

const renderPoint = (pointsListView, point) => {
  const eventComponent = new EventView(point);
  const eventEditComponent = new EditCreateEventView(point);

  const EscKeyPressHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(eventComponent, eventEditComponent);
      document.removeEventListener('keydown', EscKeyPressHandler);
    }
  };

  const openEditForm = () => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener('keydown', EscKeyPressHandler);
  };

  const closeEditForm = () => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener('keydown', EscKeyPressHandler);
  };

  const submitForm = () => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener('keydown', EscKeyPressHandler);
  };

  eventComponent.setEditClickHandler(openEditForm);
  eventEditComponent.setCloseClickHandler(closeEditForm);
  eventEditComponent.setSubmitFormHandler(submitForm);

  render(pointsListView, eventComponent, RenderPosition.BEFORE_END);
};

const mainTripElement = document.querySelector('.trip-main');
const navigationElement = mainTripElement.querySelector('.trip-controls__navigation');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');

render(mainTripElement, new TopRouteInfoView(points), RenderPosition.AFTER_BEGIN);
render(navigationElement, new MenuView(), RenderPosition.BEFORE_END);
render(filterElement, new FilterView(), RenderPosition.BEFORE_END);

const tripEventsContainerElement = document.querySelector('.trip-events');

if (points.length === 0) {
  render(tripEventsContainerElement, new ListEmptyView(), RenderPosition.BEFORE_END);
} else {
  const pointsListComponent = new PointsListView();
  render(tripEventsContainerElement, pointsListComponent, RenderPosition.BEFORE_END);

  render(pointsListComponent, new SortView(), RenderPosition.BEFORE_BEGIN);
  for (let i = 1; i < POINT_COUNT; i++) {
    renderPoint(pointsListComponent, points[i]);
  }
}

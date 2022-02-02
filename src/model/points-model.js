import AbstractObservable from '../utils/abstract-observable';
import dayjs from 'dayjs';
import {UpdateType} from '../utils/consts';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const offers = await this.#apiService.offers;
      const destinations = await this.#apiService.destinations;
      const points = await this.#apiService.points;
      this.#offers = offers.map(this.#adaptToClient);
      this.#destinations = destinations.map(this.#adaptToClient);
      this.#points = points.map(this.#adaptToClient);
    }
    catch (error) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  updatePoint = async (updateType, updatedPoint) => {
    const index = this.#points.findIndex((item) => item.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(updatedPoint);
      const updatedPointFromServer = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPointFromServer,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPointFromServer);
    } catch (error) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint = async (updateType, updatedPoint) => {
    try {
      const response = await this.#apiService.addPoint(updatedPoint);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (error) {
      throw new Error('Can\'t add point');
    }
  }

  deletePoint = async (updateType, updatedPoint) => {
    const index = this.#points.findIndex((item) => item.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      await this.#apiService.deletePoint(updatedPoint);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (error) {
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient = (point) => {
    const adaptedTask = {...point,
      price: point['base_price'],
      dateFrom: dayjs(point['date_from']).toDate(),
      dateTo: dayjs(point['date_to']).toDate(),
      isFavorite: point['is_favorite'],
    };

    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];

    return adaptedTask;
  }
}

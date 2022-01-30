import AbstractObservable from '../utils/abstract-observable';

export default class PointsModel extends AbstractObservable {
  #points = [];

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }

  updatePoint = (updateType, updatedPoint) => {
    const index = this.#points.findIndex((item) => item.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updatedPoint,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, updatedPoint);
  }

  addPoint = (updateType, updatedPoint) => {
    this.#points = [updatedPoint, ...this.#points];
    this._notify(updateType, updatedPoint);
  }

  deletePoint = (updateType, updatedPoint) => {
    const index = this.#points.findIndex((item) => item.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, updatedPoint);
  }
}

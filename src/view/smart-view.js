import AbstractView from './abstract-view';

export default class SmartView extends AbstractView {
  _data = {};

  updateData = (update) => {
    if (!update) {
      return;
    }
    this._data = {...this._data, ...update};
    this.resetData();
    this.updateElement();
  }

  updateElement = () => {
    const prevNode = this.element;
    const parent = prevNode.parentElement;
    this.removeElement();

    const editedNode = this.element;

    parent.replaceChild(editedNode, prevNode);

    this.restoreHandlers();
  }

  resetData() {
    throw new Error('Abstract method not implemented: resetData');
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}

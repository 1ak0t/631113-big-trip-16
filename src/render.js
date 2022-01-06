import AbstractView from './view/abstract-view';

const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const render = (container, element, place) => {

  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPosition.BEFORE_BEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTER_BEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      parent.append(child);
      break;
    case RenderPosition.AFTER_END:
      parent.after(child);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const replace = (newElement, oldElement) => {
  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  parent.replaceChild(newChild, oldChild);
};

export {RenderPosition, createElement, render, replace};

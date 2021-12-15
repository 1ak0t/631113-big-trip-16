const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const renderTemplate = (element, template, position) => {
  element.insertAdjacentHTML(position, template);
};

export {RenderPosition, renderTemplate};

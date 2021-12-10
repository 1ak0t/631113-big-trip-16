const createAndInsert = (tag, Element, tagClass) => {
  const createdElement = document.createElement(tag);
  createdElement.classList.add(tagClass);
  Element.appendChild(createdElement);
};

export {createAndInsert};

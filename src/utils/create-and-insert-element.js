const createAndInsertElement = (tag, element, tagClass) => {
  const createdElement = document.createElement(tag);
  createdElement.classList.add(tagClass);
  element.appendChild(createdElement);
};

export {createAndInsertElement};

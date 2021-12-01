const createAndInsert = (tag, toElement, tagClass) => {
  const createdElement = document.createElement(tag);
  createdElement.classList.add(tagClass);
  toElement.appendChild(createdElement);
};

export {createAndInsert};

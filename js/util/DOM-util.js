const findDOMElement = (location, classNam) => {
  return location.querySelector(classNam);
}

const findDOMElements = (location, classNam) => {
  return location.querySelectorAll(classNam);
}

export {findDOMElement, findDOMElements}

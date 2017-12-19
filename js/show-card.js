'use strict';

window.showCard = function (sourceElement, targetElement, sourceData, targetData, syncValuesFunc) {
  var index = sourceData.indexOf(sourceElement.value);
  var targetElementValue = targetData[index];
  syncValuesFunc(targetElement, targetElementValue);
};

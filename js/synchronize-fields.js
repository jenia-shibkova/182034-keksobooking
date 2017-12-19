'use strict';

window.synchronizeFields = function (elem1, elem2, callback) {
  if (typeof callback === 'function') {
    callback(elem1, elem2);
  }
};

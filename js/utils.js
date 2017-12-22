'use strict';

window.utils = (function () {
  var ENTER_KEYCODE = 13;

  return {
    onEnterPress: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    }
  };
})();

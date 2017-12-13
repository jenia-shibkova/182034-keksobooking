'use strict';

window.utils = (function () {
  var ENTER_KEYCODE = 13;

  return {

    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomInteger: function (from, to) {
      return Math.floor(Math.random() * (to - from) + from);
    },

    makeRandomArray: function (array) {
      var arrayCopy = array.slice();
      var newLength = Math.ceil(Math.random() * arrayCopy.length);
      var newArray = [];
      for (var i = 0; i < newLength; i++) {
        var randomElement = window.utils.getRandomInteger(0, arrayCopy.length);
        newArray.push(arrayCopy[randomElement]);
        arrayCopy.splice(randomElement, 1);
      }
      return newArray;
    },

    shuffleArrayOfElements: function (array) {
      var copy = array.slice(0);
      for (var i = copy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var element = copy[i];
        copy[i] = copy[j];
        copy[j] = element;
      }
      return copy;
    },

    getNumberLeadingZero: function (number) {
      return (number < 10) ? '0' + number : number;
    },

    onEnterPress: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    }
  };
})();

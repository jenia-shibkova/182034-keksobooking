'use strict';

(function () {
  var MAX_PINS = 5;
  var makeOffers = function (offers) {
    deletePins();
    window.listOFOffers = offers;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.makePin(offers[i], i));
    }
    mapPins.appendChild(fragment);
  };

  window.tokyoMap = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  window.mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var fieldsets = form.querySelectorAll('fieldset');

  var setAttributeDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeAttributeDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };

  var deletePins = function () {
    var oldPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < oldPins.length; i++) {
      mapPins.removeChild(oldPins[i]);
    }

  };

  var activateMap = function (evt) {
    if (window.mainPin === evt.currentTarget) {
      window.tokyoMap.classList.remove('map--faded');
      form.classList.remove('notice__form--disabled');
      removeAttributeDisabled();

      var loadData = function load(data) {
        makeOffers(data.slice(0, MAX_PINS));
        window.filter(data, MAX_PINS, makeOffers);
      };
      // Загрузка данных с сервера
      window.backend.load(loadData, window.backend.errorHandler);

      window.mainPin.removeEventListener('mousedown', activateMap);
    }
  };

  var onMainPinMouseUp = function (evt) {
    activateMap(evt);
    window.mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  };
  setAttributeDisabled();

  window.mainPin.addEventListener('mouseup', onMainPinMouseUp);
})();

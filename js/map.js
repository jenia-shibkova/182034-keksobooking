'use strict';

(function () {

  var makeOffers = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.makePin(offers[i], i));
    }
    mapPins.appendChild(fragment);

    var pins = window.tokyoMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.addEventListener('click', function (evt) {
        window.showCard.appendCard(evt, offers);
      });
      pin.addEventListener('keydown', function (evt) {
        if (window.utils.onEnterPress(evt)) {
          window.showCard.appendCard(evt);
        }
      });
    });
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

  var activateMap = function (evt) {
    if (window.mainPin === evt.currentTarget) {
      window.tokyoMap.classList.remove('map--faded');
      form.classList.remove('notice__form--disabled');
      removeAttributeDisabled();
      window.backend.load(makeOffers, window.backend.errorHandler);

      window.mainPin.removeEventListener('mousedown', activateMap);
    }
  };

  var onMainPinMouseUp = function (evt) {
    activateMap(evt);
    window.mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  };
  setAttributeDisabled();

  window.mainPin.addEventListener('mouseup', onMainPinMouseUp);

  // реакция на перемещение pin

  var pinHandle = document.querySelector('.map__pin--main');
  var formAddress = document.querySelector('#address');
  var mainPinHeight = pinHandle.offsetHeight + 22;
  var mainPinWidth = pinHandle.offsetWidth;

  var BOUNDS = {
    x: {
      minX: 0,
      maxX: 1200
    },
    y: {
      minY: 100,
      maxY: 500
    }
  };

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var setBoundsOnY = function (posY) {
      if (posY < BOUNDS.y.minY) {
        return BOUNDS.y.minY;
      } else if (posY > BOUNDS.y.maxY) {
        return BOUNDS.y.maxY;
      } else {
        return posY;
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandle.style.top = setBoundsOnY(pinHandle.offsetTop - shift.y) + 'px';

      var pinTop = (pinHandle.offsetTop - shift.y) + mainPinHeight;
      var pinLeft = (pinHandle.offsetLeft - shift.x) + mainPinWidth / 2;

      if (pinHandle.offsetLeft - shift.x > BOUNDS.x.minX + mainPinWidth / 2 && pinHandle.offsetLeft - shift.x <
        BOUNDS.x.maxX - mainPinWidth / 2) {
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      }

      formAddress.value = 'x: ' + pinLeft + ' y: ' + pinTop;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.tokyoMap.removeEventListener('mousemove', onMouseMove);
      window.tokyoMap.removeEventListener('mouseup', onMouseUp);
    };

    window.tokyoMap.addEventListener('mousemove', onMouseMove);
    window.tokyoMap.addEventListener('mouseup', onMouseUp);
  });
})();

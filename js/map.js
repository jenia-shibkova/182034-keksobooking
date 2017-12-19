'use strict';

(function () {

  window.DATA = {
    countOfOffers: 8,
    title: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    type: ['flat', 'house', 'bungalo'],
    rooms: [1, 2, 3, 4, 5],
    checkIn: ['12:00', '13:00', '14:00'],
    checkOut: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };


  var getOfferObject = function (index, data) {
    var newArrayOfTitles = window.utils.shuffleArrayOfElements(data.title);
    var locationX = window.utils.getRandomInteger(300, 900);
    var locationY = window.utils.getRandomInteger(100, 500);
    return {
      author: {
        avatar: 'img/avatars/user' + window.utils.getNumberLeadingZero(index + 1) + '.png'
      },
      offer: {
        title: newArrayOfTitles[index],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomInteger(1000, 1000000),
        type: window.utils.getRandomElement(data.type),
        rooms: window.utils.getRandomInteger(1, 5),
        guests: window.utils.getRandomInteger(1, 10),
        checkIn: window.utils.getRandomElement(data.checkIn),
        checkOut: window.utils.getRandomElement(data.checkOut),
        features: window.utils.makeRandomArray(data.features),
        description: '',
        photos: []
      },
      location: {
        x: locationX + 'px',
        y: locationY + 'px'
      },
      offerId: 'map__pin-' + index
    };
  };

  var makeListOfOffers = function (offersCount) {
    var listOfOffers = [];
    for (var i = 0; i < offersCount; i++) {
      listOfOffers.push(getOfferObject(i, window.DATA));
    }
    return listOfOffers;
  };

  window.tokyoMap = document.querySelector('.map');
/*
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      window.closePopup();
    }
  };

  window.closePopup = function () {
    var oldPopup = tokyoMap.querySelector('.popup');
    if (oldPopup !== null) {
      tokyoMap.removeChild(oldPopup);
    }
    if (currentPin) {
      currentPin.classList.remove(PIN_ACTIVE);
      currentPin = null;
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };
/*
  var appendCard = function (evt) {
    window.closePopup();
    if (evt.currentTarget === mainPin || currentPin === evt.currentTarget) {
      return;
    } else {
      currentPin = evt.currentTarget;
    }

    var offerElement = window.cards.createCard(pinOffer[currentPin.id]);
    tokyoMap.appendChild(offerElement);
    currentPin.classList.add(PIN_ACTIVE);
    document.addEventListener('keydown', onPopupEscPress);
  };
*/
  window.mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var fieldsets = form.querySelectorAll('fieldset');

  var pinElements = document.getElementsByClassName('map__pin');
  /*var currentPin = null;
  */
  window.pinOffer = {};

  var pinToMap = function (listOfOffers) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < listOfOffers.length; i++) {
      fragmentPins.appendChild(window.pin.makePin(listOfOffers[i]));
    }
    window.tokyoMap.appendChild(fragmentPins);

    var pins = window.tokyoMap.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.addEventListener('click', window.showCard.appendCard);
      pin.addEventListener('keydown', function (evt) {
        if (window.utils.onEnterPress(evt)) {
          window.showCard.appendCard(evt);
        }
      });
    });
  };

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

      window.listOfOffers = makeListOfOffers(window.DATA.countOfOffers);
      pinToMap(window.listOfOffers);
      for (var i = 0; i < pinElements.length; i++) {
        window.pinOffer['map__pin-' + i] = window.listOfOffers[i];
        pinElements[i].addEventListener('click', window.showCard.appendCard);
        pinElements[i].addEventListener('keydown', function openPopup() {
          if (window.utils.onEnterPress(evt)) {
            window.showCard.appendCard(evt);
          }
        });
      }
      window.mainPin.removeEventListener('mouseup', activateMap);
    }
  };

  setAttributeDisabled();
  window.mainPin.addEventListener('mouseup', activateMap);

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

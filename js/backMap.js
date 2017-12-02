'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var DATA = {
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


var generateOffers = function (data) {

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomInteger = function (from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  };

  var makeRandomArray = function (array) {
    var arrayCopy = array.slice();
    var newLength = Math.ceil(Math.random() * arrayCopy.length);
    var newArray = [];
    for (var i = 0; i < newLength; i++) {
      var randomElement = getRandomInteger(0, arrayCopy.length);
      newArray.push(arrayCopy[randomElement]);
      arrayCopy.splice(randomElement, 1);
    }
    return newArray;
  };

  var shuffleArrayOfTitles = function (array) {
    var copy = array.slice(0);
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var element = copy[i];
      copy[i] = copy[j];
      copy[j] = element;
    }
    return copy;
  };

  var getNumberLeadingZero = function (number) {
    return (number < 10) ? '0' + number : number;
  };

  var getOfferObject = function (index) {
    var newArrayOfTitles = shuffleArrayOfTitles(data.title);
    var locationX = getRandomInteger(300, 900);
    var locationY = getRandomInteger(100, 500);
    return {
      author: {
        avatar: 'img/avatars/user' + getNumberLeadingZero(index + 1) + '.png'
      },
      offer: {
        title: newArrayOfTitles[index],
        address: locationX + ', ' + locationY,
        price: getRandomInteger(1000, 1000000),
        type: getRandomElement(data.type),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkIn: getRandomElement(data.checkIn),
        checkOut: getRandomElement(data.checkOut),
        features: makeRandomArray(data.features),
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

  var makeListOfOffers = function () {
    var listOfOffers = [];
    for (var i = 0; i < data.countOfOffers; i++) {
      listOfOffers.push(getOfferObject(i));
    }
    return listOfOffers;
  };

  var makePin = function (offer) {
    var pin = document.querySelector('#lodge-template').content.querySelector('.map__pin').cloneNode(true);
    pin.style.left = offer.location.x;
    pin.style.top = offer.location.y;
    pin.querySelector('img').setAttribute('src', offer.author.avatar);
    pin.id = offer.offerId;
    return pin;
  };

  var pinToMap = function (listOfOffers, index) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < listOfOffers.length; i++) {
      fragmentPins.appendChild(makePin(listOfOffers[i]));
    }
    tokyoMap.appendChild(fragmentPins);

    var pins = tokyoMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    console.log(pins);
    pins.forEach(function (pin) {
      //pin.setAttribute('hidden', '');
      var pinOffer = {};
      //pinOffer['main__pin-' + i] = listOfOffers[i];
      pin.addEventListener('click', openMapCard(listOfOffers, index));
      pin.addEventListener('keydown', openMapCard(listOfOffers, index));
      if (pin.classList.contains('map__pin--main')) {
        pin.removeEventListener('click', openMapCard, false);
      }
    });
  };

  var createFeatures = function (features) {
    var fragmentFeatures = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var listEl = document.createElement('li');
      listEl.classList.add('feature', 'feature--' + features[i]);
      fragmentFeatures.appendChild(listEl);
    }
    return fragmentFeatures;
  };

  var convertTypeToRussian = function (type) {
    switch (type) {
      case 'flat':
        return 'квартира';

      case 'house':
        return 'дом';

      default:
        return 'бунгало';
    }
  };

  var tokyoMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var fieldsets = form.querySelectorAll('fieldset');

  var currentPin = null;
  var pinOffer = {};
  var PIN_ACTIVE = 'map__pin--active';



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

  var activeMap = function (evt) {
    if (mainPin === evt.currentTarget) {
      tokyoMap.classList.remove('map--faded');
      form.classList.remove('notice__form--disabled');
      removeAttributeDisabled();
      pinToMap(listOfOffers);
    }
  };

  var closeMapCard = function () {
    popup.style.display = 'none';
    currentPin.classList.remove(PIN_ACTIVE);
    document.removeEventListener('keydown', escKeyPressHandler);
  };

  var enterPressHandler = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var escKeyPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeMapCard();
    }
  };
///
  function displayOfferDialog(data, index) {
    return function (evt) {
      if (evt.keyCode === ENTER || typeof evt.keyCode === 'undefined') {
        var pinActive = map.querySelector('.map__pin--active');

        if (pinActive) {
          pinActive.classList.remove('map__pin--active');
        }

        pins[index].classList.add('map__pin--active');

        showCard(article, data[index]);
        article.removeAttribute('hidden');
      }
    };
  }
////


  var openMapCard = function (evt) {
    if (currentPin) {
      currentPin.classList.remove(PIN_ACTIVE);
    }
    currentPin = evt.currentTarget;
    //var offer = pinOffer[currentPin.id];
    //currentPin.classList.add(PIN_ACTIVE);
    //mapCardTitle.querySelector('img').src = offer.author.avatar;

    tokyoMap.appendChild(createCard(listOfOffers[0]));
    //offerDialog.replaceChild(createDialog(offer), dialogPanel);
    //offerDialog.style.display = 'block';

    //tokyoMap.appendChild(createCard(offer));

    document.addEventListener('keydown', escKeyPressHandler);
  };









  var similarOfferTemplate = document.querySelector('#lodge-template').content;
  var createCard = function (listOfOffers) {
    var offerElement = similarOfferTemplate.cloneNode(true);
    var offer = listOfOffers.offer;
    var author = listOfOffers.author;
    var allFeatures = listOfOffers.offer.features;
    offerElement.querySelector('.map__card h3').textContent = offer.title;
    offerElement.querySelector('.map__card p:nth-of-type(1) small').textContent = offer.address;
    offerElement.querySelector('.popup__price').textContent = offer.price + '₽' + '/ночь';
    offerElement.querySelector('.map__card h4').textContent = convertTypeToRussian(offer.type);
    offerElement.querySelector('.map__card p:nth-of-type(3)').textContent = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
    offerElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + offer.checkIn + ', выезд после ' + offer.checkOut;

    var offerFeature = offerElement.querySelector('.popup__features');
    while (offerFeature.firstChild) {
      offerFeature.removeChild(offerFeature.firstChild);
    }
    offerFeature.appendChild(createFeatures(allFeatures));

    offerElement.querySelector('.map__card p:nth-of-type(5)').textContent = offer.description;
    offerElement.querySelector('img').setAttribute('src', author.avatar);
    return offerElement;
  };


  setAttributeDisabled();
  mainPin.addEventListener('mouseup', activeMap);


  /*
    for (var i = 0; i < pinElements.length; i++) {
      pinOffer['main__pin-' + i] = listOfOffers[i];
      pinElements[i].addEventListener('click', openMapCard);
      pinElements[i].addEventListener('keydown', function openMapCard(evt) {
        if (enterPressHandler(evt)) {
          openMapCard(evt);
        }
      });

      if (pinElements[i].classList.contains('map__pin--main')) {
        pinElements[i].removeEventListener('click', openMapCard, false);
      }
    }

   */

  var listOfOffers = makeListOfOffers(8);
  //pinToMap(listOfOffers); ++
  //var offerPopup = createCard(listOfOffers[i]);
  //tokyoMap.appendChild(createCard(listOfOffers[0])); //IMPORTANT!

  //tokyoMap.appendChild(createCard(offer));



  var makeCards = function (allOffers) {
    for (var i = 0; i < allOffers.length; i++) {
      createCard(allOffers[i]);
      console.log(createCard(allOffers[i]));
    }
  };

  //makeCards(listOfOffers);

  var offerPopup = createCard(listOfOffers[0]);
  var popup = offerPopup.querySelector('.popup');
  var closePopup = popup.querySelector('.popup__close');

  closePopup.addEventListener('click', closeMapCard);
  /*
    var pinElements = document.getElementsByClassName('map__pin');
    var pins = document.querySelectorAll('.map__pin');
    console.log(offerPopup);
    console.log(popup);
    console.log(closePopup);
    console.log(pinElements, pins);
  */
};

generateOffers(DATA);

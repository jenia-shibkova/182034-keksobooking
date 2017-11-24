'use strict';

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

  var makeRandomArray = function (array) {
    var arrayCopy = array.slice();
    var newLength = Math.ceil(Math.random() * arrayCopy.length);
    var newArray = [];
    for (var i = 0; i < newLength; i++) {
      var randomElement = Math.floor(Math.random() * arrayCopy.length);
      newArray[i] = arrayCopy[randomElement];
      arrayCopy.splice(randomElement, 1);
    }
    return newArray;
  };

  var getRandomInteger = function (from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  };

  var shuffleArrayOfTitles = function (array) {
    var copy = array.title.slice(0);
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var element = copy[i];
      copy[i] = copy[j];
      copy[j] = element;
    }
    return copy;
  };

  var makeListOfOffers = function () {
    var listOfOffers = [];
    var newArrayOfTitles = shuffleArrayOfTitles(data);
    for (var i = 0; i < data.countOfOffers; i++) {
      var locationX = getRandomInteger(300, 900);
      var locationY = getRandomInteger(100, 500);
      listOfOffers[i] = {
        author: {
          avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        offer: {
          title: newArrayOfTitles[i],
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
        }
      };
    }
    return listOfOffers;
  };

  var makePin = function (offer) {
    var pin = document.querySelector('.map__pin').cloneNode(true);
    pin.classList.remove('map__pin--main');
    pin.removeChild(pin.childNodes[3]);
    pin.style.left = offer.location.x;
    pin.style.top = offer.location.y;
    pin.draggable = false;
    pin.querySelector('img').setAttribute('src', offer.author.avatar);
    return pin;
  };

  var pinToMap = function (listOfOffers) {
    for (var i = 0; i < listOfOffers.length; i++) {
      tokyoMap.appendChild(makePin(listOfOffers[i]));
    }
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

  var convertToRussian = function (type) {
    if (type === 'flat') {
      return 'квартира';
    } else if (type === 'house') {
      return 'дом';
    } else {
      return 'бунгало';
    }
  };

  var tokyoMap = document.querySelector('.map');
  tokyoMap.classList.remove('map--faded');

  var similarOfferTemplate = document.querySelector('template').content;
  var createCard = function (listOfOffers) {
    var offerElement = similarOfferTemplate.cloneNode(true);
    var offer = listOfOffers.offer;
    var author = listOfOffers.author;
    var allFeatures = listOfOffers.offer.features;
    offerElement.querySelector('.map__card h3').textContent = offer.title;
    offerElement.querySelector('.map__card p:nth-of-type(1) small').textContent = offer.address;
    offerElement.querySelector('.popup__price').textContent = offer.price + '₽' + '/ночь';
    offerElement.querySelector('.map__card h4').textContent = convertToRussian(offer.type);
    offerElement.querySelector('.map__card p:nth-of-type(3)').textContent = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
    offerElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + offer.checkIn + ', выезд после ' + offer.checkOut;

    var offerFeature = offerElement.querySelector('.popup__features');

    for (var i = 1; i <= 6; i++) {
      offerFeature.removeChild(offerFeature.childNodes[i]);
    }

    offerFeature.appendChild(createFeatures(allFeatures));
    offerElement.querySelector('.map__card p:nth-of-type(5)').textContent = offer.description;
    offerElement.querySelector('img').setAttribute('src', author.avatar);
    return offerElement;
  };

  var listOfOffers = makeListOfOffers();
  pinToMap(listOfOffers);
  tokyoMap.appendChild(createCard(listOfOffers[0]));
};

generateOffers(DATA);

'use strict';

window.cards = (function () {

  var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');

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

  var createFeatures = function (features) {
    var fragmentFeatures = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var listEl = document.createElement('li');
      listEl.classList.add('feature', 'feature--' + features[i]);
      fragmentFeatures.appendChild(listEl);
    }
    return fragmentFeatures;
  };

  return {
    createCard: function (offerNum) {
      var offerElement = similarOfferTemplate.cloneNode(true);
      var allFeatures = offerNum.offer.features;
      offerElement.querySelector('.map__card h3').textContent = offerNum.offer.title;
      offerElement.querySelector('.map__card p:nth-of-type(1) small').textContent = offerNum.offer.address;
      offerElement.querySelector('.popup__price').textContent = offerNum.offer.price + '₽' + '/ночь';
      offerElement.querySelector('.map__card h4').textContent = convertTypeToRussian(offerNum.offer.type);
      offerElement.querySelector('.map__card p:nth-of-type(3)').textContent = 'Для ' + offerNum.offer.guests + ' гостей в ' + offerNum.offer.rooms + ' комнатах';
      offerElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + offerNum.offer.checkin + ', выезд' +
        ' после ' + offerNum.offer.checkout;
      var offerFeature = offerElement.querySelector('.popup__features');
      while (offerFeature.firstChild) {
        offerFeature.removeChild(offerFeature.firstChild);
      }
      offerFeature.appendChild(createFeatures(allFeatures));
      offerElement.querySelector('.map__card p:nth-of-type(5)').textContent = offerNum.offer.description;
      offerElement.querySelector('img').setAttribute('src', offerNum.author.avatar);

      return offerElement;
    }
  };
})();

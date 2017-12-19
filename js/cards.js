'use strict';

window.cards = (function () {
  var similarOfferTemplate = document.querySelector('#lodge-template').content;

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
    createCard: function (listOfOffers) {
      var offerElement = similarOfferTemplate.cloneNode(true);
      var offer = listOfOffers.offer;
      var author = listOfOffers.author;
      var allFeatures = listOfOffers.offer.features;
      var popup = offerElement.querySelector('.popup');
      var popupBtnClose = popup.querySelector('.popup__close');

      offerElement.querySelector('.map__card h3').textContent = offer.title;
      offerElement.querySelector('.map__card p:nth-of-type(1) small').textContent = offer.address;
      offerElement.querySelector('.popup__price').textContent = offer.price + '₽' + '/ночь';//
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

      popupBtnClose.addEventListener('click', window.showCard.closePopup);

      return offerElement;
    }
  };
})();


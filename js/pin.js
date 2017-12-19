'use strict';

window.pin = (function () {
  return {
    makePin: function (offer) {
      var pin = document.querySelector('#lodge-template').content.querySelector('.map__pin').cloneNode(true);
      pin.style.left = offer.location.x;
      pin.style.top = offer.location.y;
      pin.querySelector('img').setAttribute('src', offer.author.avatar);
      pin.id = offer.offerId;
      return pin;
    }
  };
})();

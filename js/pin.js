'use strict';

window.pin = (function () {
  var PIN_Y = 64; // размер пина по у
  var pinX = function (x) {
    return x + 'px';
  };
  var pinY = function (y) {
    return (y - PIN_Y) + 'px';
  };
  return {
    makePin: function (offer, i) {
      var pin = document.querySelector('#lodge-template').content.querySelector('.map__pin').cloneNode(true);
      pin.classList.add('map__pin');
      pin.style.left = pinX(offer.location.x);
      pin.style.top = pinY(offer.location.y);
      pin.querySelector('img').setAttribute('src', offer.author.avatar);
      pin.dataset.pinNumber = i;

      return pin;
    }
  };
})();

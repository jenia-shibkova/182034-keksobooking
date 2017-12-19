'use strict';

window.showCard = (function () {
  var ESC_KEYCODE = 27;
  var PIN_ACTIVE = 'map__pin--active';
  var currentPin = null;
  var pinOffer = {};

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      window.closePopup();
    }
  };

  return {
    closePopup: function () {
      var oldPopup = window.tokyoMap.querySelector('.popup');
      if (oldPopup !== null) {
        window.tokyoMap.removeChild(oldPopup);
      }
      if (currentPin) {
        currentPin.classList.remove(PIN_ACTIVE);
        currentPin = null;
      }
      document.removeEventListener('keydown', onPopupEscPress);
    },

    appendCard: function (evt) {
      window.showCard.closePopup();
      if (evt.currentTarget === window.mainPin || currentPin === evt.currentTarget) {
        return;
      } else {
        currentPin = evt.currentTarget;
      }

      var offerElement = window.cards.createCard(pinOffer[currentPin.id]);
      window.tokyoMap.appendChild(offerElement);
      currentPin.classList.add(PIN_ACTIVE);
      document.addEventListener('keydown', onPopupEscPress);
    }
  };
})();

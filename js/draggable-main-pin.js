'use strict';

(function () {
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
      var pinLeft = Math.round((pinHandle.offsetLeft - shift.x) + mainPinWidth / 2);

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

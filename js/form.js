'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var buttonSubmit = form.querySelector('.form__submit');

  var ROOM_CAPACITY = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };


  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var syncRoomsAndCapacity = function (evt) {
    var capacitiesForRooms = ROOM_CAPACITY[evt.currentTarget.value];
    var curCapacity = Number(capacity.value);
    if (capacitiesForRooms.length === 1) {
      capacity.value = capacitiesForRooms[0];
    }
    if (capacitiesForRooms.indexOf(curCapacity) === -1) {
      capacity.value = capacitiesForRooms[capacitiesForRooms.length - 1];
    }
  };

  var checkValidity = function (field) {
    field.style.border = (!field.validity.valid) ? 'thick solid red' : '';
  };

  var onSubmitClick = function () {
    checkValidity(title);
    checkValidity(price);
  };

  var returnDefault = function () {
    buttonSubmit.removeEventListener('click', onSubmitClick);
  };

  price.value = 1000;
  capacity.options[1].selected = true;

  // Синхронизация полей
  var onChangeTimeIn = function () {
    window.synchronizeFields(timeIn, timeOut, window.DATA.checkIn, window.DATA.checkOut, syncValues);
  };
  var onChangeTimeOut = function () {
    window.synchronizeFields(timeOut, timeIn, window.DATA.checkOut, window.DATA.checkIn, syncValues);
  };
  var onChangeType = function () {
    window.synchronizeFields(type, price, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncValueWithMin);
  };

  timeIn.addEventListener('change', onChangeTimeIn);
  timeOut.addEventListener('change', onChangeTimeOut);
  type.addEventListener('change', onChangeType);
  roomNumber.addEventListener('change', syncRoomsAndCapacity);

  buttonSubmit.addEventListener('click', onSubmitClick);
  buttonSubmit.addEventListener('submit', returnDefault);
})();

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

  var TYPE_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var ROOM_CAPACITY = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var syncValues = function (elem1, elem2) {
    elem2.value = elem1.value;
  };

  var syncValueWithMin = function (select, input) {
    input.min = TYPE_PRICE[select.value];
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

  price.value = 1000;
  capacity.options[2].selected = true;

  // Синхронизация полей

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, syncValues);
  });
  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, syncValues);
  });
  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, syncValueWithMin);
  });
  roomNumber.addEventListener('change', syncRoomsAndCapacity);

  buttonSubmit.addEventListener('click', onSubmitClick);
  buttonSubmit.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), window.backend.errorHandler);
    evt.preventDefault();
  });

})();

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
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var ROOM_CAPACITY = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var syncTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var syncTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  var syncTypesAndPrices = function (evt) {
    price.min = TYPE_PRICE[evt.currentTarget.value];
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

  timeIn.addEventListener('change', syncTimeIn);
  timeOut.addEventListener('change', syncTimeOut);
  type.addEventListener('change', syncTypesAndPrices);
  roomNumber.addEventListener('change', syncRoomsAndCapacity);

  buttonSubmit.addEventListener('click', onSubmitClick);
  buttonSubmit.addEventListener('submit', returnDefault);
})();

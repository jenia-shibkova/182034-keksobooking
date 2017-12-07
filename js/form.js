'use strict';

var form = document.querySelector('.notice__form');
var time = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var title = form.querySelector('#title');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var DEFAULT_PRICE_VALUE = 1000;
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var buttonSubmit = form.querySelector('.form__submit');

var TYPE_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var MIN_PRICES = [
  0,
  1000,
  5000,
  10000
];

var ROOM_CAPACITY = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};

var checkEmptyString = function (param, paramValue) {
  if (paramValue === '') {
    param.classList.remove('valid');
    param.classList.add('invalid');
  } else {
    param.classList.remove('invalid');
    param.classList.add('valid');
  }
};

var checkValidity = function (param) {
  if (param.validity.valid) {
    param.classList.remove('invalid');
    param.classList.add('valid');
  } else {
    param.classList.remove('valid');
    param.classList.add('invalid');
  }
};

var emptyForm = function () {
  var priceValue = form.querySelector('#price').value;
  var titleValue = form.querySelector('#title').value;
  checkEmptyString(price, priceValue);
  checkEmptyString(title, titleValue);
};

var onButtonPress = function () {
  emptyForm();
};

price.value = DEFAULT_PRICE_VALUE;

price.addEventListener('input', function () {
  if (price.value < MIN_PRICES[1]) {
    type.options[1].selected = true;
    type.classList.add('valid');
  } else if (price.value < MIN_PRICES[2]) {
    type.options[0].selected = true;
    type.classList.add('valid');
  } else if (price.value < MIN_PRICES[3]) {
    type.options[2].selected = true;
    type.classList.add('valid');
  } else {
    type.options[3].selected = true;
  }
});


type.addEventListener('change', function () {
  var selectedOptions = type.value;
  var value = TYPE_PRICE[selectedOptions];
  price.setAttribute('min', value);
  price.value = value;
});

roomNumber.addEventListener('change', function () {
  var selectedOptions = roomNumber.options[roomNumber.selectedIndex].value;
  var value = ROOM_CAPACITY[selectedOptions];
  capacity.value = value;
});

time.addEventListener('input', function synchronizeTime() {
  timeOut.selectedIndex = time.selectedIndex;
});

timeOut.addEventListener('input', function synchronizeTime() {
  time.selectedIndex = timeOut.selectedIndex;
});

capacity.options[2].selected = true;

capacity.addEventListener('change', function () {
  if (capacity.options[0].selected === true) {
    roomNumber.options[2].selected = true;
  }
  if (capacity.options[1].selected === true) {
    roomNumber.options[1].selected = true;
  }
  if (capacity.options[2].selected === true) {
    roomNumber.options[0].selected = true;
  }
  if (capacity.options[3].selected === true) {
    roomNumber.options[3].selected = true;
  }
});

title.addEventListener('keyup', function () {
  checkValidity(title);
});

price.addEventListener('keyup', function () {
  checkValidity(price);
});

price.addEventListener('keydown', function () {
  var priceValue = form.querySelector('#price').value;
  checkEmptyString(price, priceValue);
});

buttonSubmit.addEventListener('click', function () {
  onButtonPress();
});

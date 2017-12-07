'use strict';

var form = document.querySelector('.notice__form');
var time = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var title = form.querySelector('#title');
var address = form.querySelector('#address');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

time.addEventListener('input', function synchronizeTime() {
  timeOut.selectedIndex = time.selectedIndex;
});

timeOut.addEventListener('input', function synchronizeTime() {
  time.selectedIndex = timeOut.selectedIndex;
});

var TYPE_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

type.addEventListener('change', function () {
  var selectedOptions = type.value;
  var value = TYPE_PRICE[selectedOptions];
  price.setAttribute('min', value);
  price.value = value;
});

var minPrices = [
  0,
  1000,
  5000,
  10000
];

price.addEventListener('input', function () {
  if (price.value < minPrices[1]) {
    type.options[1].selected = true;
  }
  if (price.value < minPrices[2]) {
    type.options[0].selected = true;
  }
  if (price.value < minPrices[3]) {
    type.options[2].selected = true;
  } else {
    type.options[3].selected = true;
  }
});

var roomCapacity = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};

roomNumber.addEventListener('change', function () {
  var selectedOptions = roomNumber.options[roomNumber.selectedIndex].value;
  var value = roomCapacity[selectedOptions];
  capacity.value = value;
});

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

var checkValidity = function (param) {
  if (param.validity.valid) {
    param.classList.remove('invalid');
    param.classList.add('valid');
  } else {
    param.classList.remove('valid');
    param.classList.add('invalid');
  }
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

title.addEventListener('keyup', function () {
  checkValidity(title);
});

address.addEventListener('keyup', function () {
  checkValidity(address);
});

price.addEventListener('keyup', function () {
  checkValidity(price);
});

price.addEventListener('keydown', function () {
  var priceValue = form.querySelector('#price').value;
  checkEmptyString(price, priceValue);
});

var emptyForm = function () {
  var priceValue = form.querySelector('#price').value;
  var titleValue = form.querySelector('#title').value;
  var addressValue = form.querySelector('#address').value;
  checkEmptyString(price, priceValue);
  checkEmptyString(title, titleValue);
  checkEmptyString(address, addressValue);
};

var buttonSubmit = form.querySelector('.form__submit');

var onButtonPress = function () {
  emptyForm();
  form.reset();
};

buttonSubmit.addEventListener('click', function () {
  onButtonPress();
});

'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var HOUSING_PRICES = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: 1000000
    },
    any: {
      min: 0,
      max: 10000000
    }
  };

  var DEBOUNCE_TIMEOUT = 500; // ms
  var lastTimeout;

  var debounce = function (functionToBeDebounced) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(functionToBeDebounced, DEBOUNCE_TIMEOUT);
  };


  window.filter = function (array, maxPins, callback) {

    mapFilters.addEventListener('change', function () {
      debounce(function () {
        callback(getFilteredArray());
      });
    });

    var getFilteredArray = function () {

      var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
      var checkedFeaturesArray = [].map.call(checkedFeatures, function (element) {
        return element.value;
      });

      var checkFeatures = function (features) {
        var filteredFeatures = [];
        return checkedFeaturesArray.every(function (feature) {
          filteredFeatures = filteredFeatures && features.includes(feature);
        });
      };

      var housingFilter = function (element) {
        return ((housingType.value !== 'any') ? element.offer.type === housingType.value : housingType.value ===
         'any') &&
          ((housingRooms.value !== 'any') ? element.offer.rooms === parseInt(housingRooms.value, 10) : housingRooms.value === 'any') &&
          ((housingGuests.value !== 'any') ? element.offer.guests === parseInt(housingGuests.value, 10) : housingGuests.value === 'any') &&
          (HOUSING_PRICES[housingPrice.value].min <= element.offer.price) && (element.offer.price <= HOUSING_PRICES[housingPrice.value].max) &&
          checkFeatures(element.offer.features);
      };

      var filteredArray = array.filter(housingFilter);
      return filteredArray.slice(0, maxPins);
    };

  };
})();

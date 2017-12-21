'use strict';

window.backend = (function () {
  var TIME_OUT = 10000;
  var CODE_SUCCESS = 200;
  var MESSAGES = {
    errorNet: 'Произошла ошибка соединения',
    errorTime: 'Запрос не успел выполниться за '
  };
  var SERVER_URL = 'https://1510.dump.academy/keksobookingf';

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(MESSAGES.errorNet);
    });

    xhr.addEventListener('timeout', function () {
      onError(MESSAGES.errorTime + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME_OUT;
    return xhr;
  };

  return {
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = '100';
      node.style.height = '200px';
      node.style.width = '1000px';
      node.style.textAlign = 'center';
      node.style.backgroundColor = '#ff5635';
      node.style.border = '2px solid black';
      node.style.borderRadius = '15px';
      node.style.position = 'absolute';
      node.style.left = 150;
      node.style.opacity = 0.8;
      node.style.top = '100px';
      node.style.fontSize = '85px';
      node.style.fontWeight = '900';
      node.style.color = 'white';
      node.style.padding = '100px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();

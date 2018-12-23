/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _amber = __webpack_require__(1);

var _amber2 = _interopRequireDefault(_amber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!Date.prototype.toGranite) {
  (function () {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toGranite = function () {
      return this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + ' ' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds());
    };
  })();
}

var removeAlert = function removeAlert(time) {
  var $alert = document.querySelector('.alert');
  if ($alert) {
    setTimeout(function () {
      $alert.remove();
    }, time);
  }
};

removeAlert(2000);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENTS = {
  join: 'join',
  leave: 'leave',
  message: 'message'
};
var STALE_CONNECTION_THRESHOLD_SECONDS = 100;
var SOCKET_POLLING_RATE = 10000;

/**
 * Returns a numeric value for the current time
 */
var now = function now() {
  return new Date().getTime();
};

/**
 * Returns the difference between the current time and passed `time` in seconds
 * @param {Number|Date} time - A numeric time or date object
 */
var secondsSince = function secondsSince(time) {
  return (now() - time) / 1000;
};

/**
 * Class for channel related functions (joining, leaving, subscribing and sending messages)
 */

var Channel = exports.Channel = function () {
  /**
   * @param {String} topic - topic to subscribe to
   * @param {Socket} socket - A Socket instance
   */
  function Channel(topic, socket) {
    _classCallCheck(this, Channel);

    this.topic = topic;
    this.socket = socket;
    this.onMessageHandlers = [];
  }

  /**
   * Join a channel, subscribe to all channels messages
   */


  _createClass(Channel, [{
    key: 'join',
    value: function join() {
      this.socket.ws.send(JSON.stringify({ event: EVENTS.join, topic: this.topic }));
    }

    /**
     * Leave a channel, stop subscribing to channel messages
     */

  }, {
    key: 'leave',
    value: function leave() {
      this.socket.ws.send(JSON.stringify({ event: EVENTS.leave, topic: this.topic }));
    }

    /**
     * Calls all message handlers with a matching subject
     */

  }, {
    key: 'handleMessage',
    value: function handleMessage(msg) {
      this.onMessageHandlers.forEach(function (handler) {
        if (handler.subject === msg.subject) handler.callback(msg.payload);
      });
    }

    /**
     * Subscribe to a channel subject
     * @param {String} subject - subject to listen for: `msg:new`
     * @param {function} callback - callback function when a new message arrives
     */

  }, {
    key: 'on',
    value: function on(subject, callback) {
      this.onMessageHandlers.push({ subject: subject, callback: callback });
    }

    /**
     * Send a new message to the channel
     * @param {String} subject - subject to send message to: `msg:new`
     * @param {Object} payload - payload object: `{message: 'hello'}`
     */

  }, {
    key: 'push',
    value: function push(subject, payload) {
      this.socket.ws.send(JSON.stringify({ event: EVENTS.message, topic: this.topic, subject: subject, payload: payload }));
    }
  }]);

  return Channel;
}();

/**
 * Class for maintaining connection with server and maintaining channels list
 */


var Socket = exports.Socket = function () {
  /**
   * @param {String} endpoint - Websocket endpont used in routes.cr file
   */
  function Socket(endpoint) {
    _classCallCheck(this, Socket);

    this.endpoint = endpoint;
    this.ws = null;
    this.channels = [];
    this.lastPing = now();
    this.reconnectTries = 0;
    this.attemptReconnect = true;
  }

  /**
   * Returns whether or not the last received ping has been past the threshold
   */


  _createClass(Socket, [{
    key: '_connectionIsStale',
    value: function _connectionIsStale() {
      return secondsSince(this.lastPing) > STALE_CONNECTION_THRESHOLD_SECONDS;
    }

    /**
     * Tries to reconnect to the websocket server using a recursive timeout
     */

  }, {
    key: '_reconnect',
    value: function _reconnect() {
      var _this = this;

      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = setTimeout(function () {
        _this.reconnectTries++;
        _this.connect(_this.params);
        _this._reconnect();
      }, this._reconnectInterval());
    }

    /**
     * Returns an incrementing timeout interval based around the number of reconnection retries
     */

  }, {
    key: '_reconnectInterval',
    value: function _reconnectInterval() {
      return [1000, 2000, 5000, 10000][this.reconnectTries] || 10000;
    }

    /**
     * Sets a recursive timeout to check if the connection is stale
     */

  }, {
    key: '_poll',
    value: function _poll() {
      var _this2 = this;

      this.pollingTimeout = setTimeout(function () {
        if (_this2._connectionIsStale()) {
          _this2._reconnect();
        } else {
          _this2._poll();
        }
      }, SOCKET_POLLING_RATE);
    }

    /**
     * Clear polling timeout and start polling
     */

  }, {
    key: '_startPolling',
    value: function _startPolling() {
      clearTimeout(this.pollingTimeout);
      this._poll();
    }

    /**
     * Sets `lastPing` to the curent time
     */

  }, {
    key: '_handlePing',
    value: function _handlePing() {
      this.lastPing = now();
    }

    /**
     * Clears reconnect timeout, resets variables an starts polling
     */

  }, {
    key: '_reset',
    value: function _reset() {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTries = 0;
      this.attemptReconnect = true;
      this._startPolling();
    }

    /**
     * Connect the socket to the server, and binds to native ws functions
     * @param {Object} params - Optional parameters
     * @param {String} params.location - Hostname to connect to, defaults to `window.location.hostname`
     * @param {String} parmas.port - Port to connect to, defaults to `window.location.port`
     * @param {String} params.protocol - Protocol to use, either 'wss' or 'ws'
     */

  }, {
    key: 'connect',
    value: function connect(params) {
      var _this3 = this;

      this.params = params;

      var opts = {
        location: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      };

      if (params) Object.assign(opts, params);
      if (opts.port) opts.location += ':' + opts.port;

      return new Promise(function (resolve, reject) {
        _this3.ws = new WebSocket(opts.protocol + '//' + opts.location + _this3.endpoint);
        _this3.ws.onmessage = function (msg) {
          _this3.handleMessage(msg);
        };
        _this3.ws.onclose = function () {
          if (_this3.attemptReconnect) _this3._reconnect();
        };
        _this3.ws.onopen = function () {
          _this3._reset();
          resolve();
        };
      });
    }

    /**
     * Closes the socket connection permanently
     */

  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.attemptReconnect = false;
      clearTimeout(this.pollingTimeout);
      clearTimeout(this.reconnectTimeout);
      this.ws.close();
    }

    /**
     * Adds a new channel to the socket channels list
     * @param {String} topic - Topic for the channel: `chat_room:123`
     */

  }, {
    key: 'channel',
    value: function channel(topic) {
      var channel = new Channel(topic, this);
      this.channels.push(channel);
      return channel;
    }

    /**
     * Message handler for messages received
     * @param {MessageEvent} msg - Message received from ws
     */

  }, {
    key: 'handleMessage',
    value: function handleMessage(msg) {
      if (msg.data === "ping") return this._handlePing();

      var parsed_msg = JSON.parse(msg.data);
      this.channels.forEach(function (channel) {
        if (channel.topic === parsed_msg.topic) channel.handleMessage(parsed_msg);
      });
    }
  }]);

  return Socket;
}();

module.exports = {
  Socket: Socket

  /**
   * Allows delete links to post for security and ease of use similar to Rails jquery_ujs
   */
};document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[data-method='delete']").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      var message = element.getAttribute("data-confirm") || "Are you sure?";
      if (confirm(message)) {
        var form = document.createElement("form");
        var input = document.createElement("input");
        form.setAttribute("action", element.getAttribute("href"));
        form.setAttribute("method", "POST");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "_method");
        input.setAttribute("value", "DELETE");
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      }
      return false;
    });
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGY1NGMxZDYwNDM3NGNmZDcwM2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9hbWJlci9hc3NldHMvanMvYW1iZXIuanMiXSwibmFtZXMiOlsiRGF0ZSIsInByb3RvdHlwZSIsInRvR3Jhbml0ZSIsInBhZCIsIm51bWJlciIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInJlbW92ZUFsZXJ0IiwidGltZSIsIiRhbGVydCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJFVkVOVFMiLCJqb2luIiwibGVhdmUiLCJtZXNzYWdlIiwiU1RBTEVfQ09OTkVDVElPTl9USFJFU0hPTERfU0VDT05EUyIsIlNPQ0tFVF9QT0xMSU5HX1JBVEUiLCJub3ciLCJnZXRUaW1lIiwic2Vjb25kc1NpbmNlIiwiQ2hhbm5lbCIsInRvcGljIiwic29ja2V0Iiwib25NZXNzYWdlSGFuZGxlcnMiLCJ3cyIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwiZXZlbnQiLCJtc2ciLCJmb3JFYWNoIiwiaGFuZGxlciIsInN1YmplY3QiLCJjYWxsYmFjayIsInBheWxvYWQiLCJwdXNoIiwiU29ja2V0IiwiZW5kcG9pbnQiLCJjaGFubmVscyIsImxhc3RQaW5nIiwicmVjb25uZWN0VHJpZXMiLCJhdHRlbXB0UmVjb25uZWN0IiwiY2xlYXJUaW1lb3V0IiwicmVjb25uZWN0VGltZW91dCIsImNvbm5lY3QiLCJwYXJhbXMiLCJfcmVjb25uZWN0IiwiX3JlY29ubmVjdEludGVydmFsIiwicG9sbGluZ1RpbWVvdXQiLCJfY29ubmVjdGlvbklzU3RhbGUiLCJfcG9sbCIsIl9zdGFydFBvbGxpbmciLCJvcHRzIiwibG9jYXRpb24iLCJ3aW5kb3ciLCJob3N0bmFtZSIsInBvcnQiLCJwcm90b2NvbCIsIk9iamVjdCIsImFzc2lnbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiV2ViU29ja2V0Iiwib25tZXNzYWdlIiwiaGFuZGxlTWVzc2FnZSIsIm9uY2xvc2UiLCJvbm9wZW4iLCJfcmVzZXQiLCJjbG9zZSIsImNoYW5uZWwiLCJkYXRhIiwiX2hhbmRsZVBpbmciLCJwYXJzZWRfbXNnIiwicGFyc2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0QXR0cmlidXRlIiwiY29uZmlybSIsImZvcm0iLCJjcmVhdGVFbGVtZW50IiwiaW5wdXQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJzdWJtaXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBRUEsSUFBSSxDQUFDQSxLQUFLQyxTQUFMLENBQWVDLFNBQXBCLEVBQStCO0FBQzVCLGVBQVc7O0FBRVYsYUFBU0MsR0FBVCxDQUFhQyxNQUFiLEVBQXFCO0FBQ25CLFVBQUlBLFNBQVMsRUFBYixFQUFpQjtBQUNmLGVBQU8sTUFBTUEsTUFBYjtBQUNE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LE9BQVIsQ0FBSixFQUFzQjtBQUNsQixZQUFJc0UsT0FBTzdFLFNBQVM4RSxhQUFULENBQXVCLE1BQXZCLENBQVg7QUFDQSxZQUFJQyxRQUFRL0UsU0FBUzhFLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBRCxhQUFLRyxZQUFMLENBQWtCLFFBQWxCLEVBQTRCUixRQUFRRyxZQUFSLENBQXFCLE1BQXJCLENBQTVCO0FBQ0FFLGFBQUtHLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsTUFBNUI7QUFDQUQsY0FBTUMsWUFBTixDQUFtQixNQUFuQixFQUEyQixRQUEzQjtBQUNBRCxjQUFNQyxZQUFOLENBQW1CLE1BQW5CLEVBQTJCLFNBQTNCO0FBQ0FELGNBQU1DLFlBQU4sQ0FBbUIsT0FBbkIsRUFBNEIsUUFBNUI7QUFDQUgsYUFBS0ksV0FBTCxDQUFpQkYsS0FBakI7QUFDQS9FLGlCQUFTa0YsSUFBVCxDQUFjRCxXQUFkLENBQTBCSixJQUExQjtBQUNBQSxhQUFLTSxNQUFMO0FBQ0g7QUFDRCxhQUFPLEtBQVA7QUFDSCxLQWhCRDtBQWlCSCxHQWxCRDtBQW1CSCxDQXBCRCxFIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZjU0YzFkNjA0Mzc0Y2ZkNzAzZiIsImltcG9ydCBBbWJlciBmcm9tICdhbWJlcidcblxuaWYgKCFEYXRlLnByb3RvdHlwZS50b0dyYW5pdGUpIHtcbiAgKGZ1bmN0aW9uKCkge1xuXG4gICAgZnVuY3Rpb24gcGFkKG51bWJlcikge1xuICAgICAgaWYgKG51bWJlciA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyBudW1iZXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH1cblxuICAgIERhdGUucHJvdG90eXBlLnRvR3Jhbml0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VVRDRnVsbFllYXIoKSArXG4gICAgICAgICctJyArIHBhZCh0aGlzLmdldFVUQ01vbnRoKCkgKyAxKSArXG4gICAgICAgICctJyArIHBhZCh0aGlzLmdldFVUQ0RhdGUoKSkgK1xuICAgICAgICAnICcgKyBwYWQodGhpcy5nZXRVVENIb3VycygpKSArXG4gICAgICAgICc6JyArIHBhZCh0aGlzLmdldFVUQ01pbnV0ZXMoKSkgK1xuICAgICAgICAnOicgKyBwYWQodGhpcy5nZXRVVENTZWNvbmRzKCkpICA7XG4gICAgfTtcblxuICB9KCkpO1xufVxuXG5jb25zdCByZW1vdmVBbGVydCA9ICh0aW1lKSA9PiB7XG4gIGNvbnN0ICRhbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpXG4gIGlmICgkYWxlcnQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICRhbGVydC5yZW1vdmUoKVxuICAgIH0sIHRpbWUpO1xuICB9XG59XG5cbnJlbW92ZUFsZXJ0KDIwMDApXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL21haW4uanMiLCJjb25zdCBFVkVOVFMgPSB7XG4gIGpvaW46ICdqb2luJyxcbiAgbGVhdmU6ICdsZWF2ZScsXG4gIG1lc3NhZ2U6ICdtZXNzYWdlJ1xufVxuY29uc3QgU1RBTEVfQ09OTkVDVElPTl9USFJFU0hPTERfU0VDT05EUyA9IDEwMFxuY29uc3QgU09DS0VUX1BPTExJTkdfUkFURSA9IDEwMDAwXG5cbi8qKlxuICogUmV0dXJucyBhIG51bWVyaWMgdmFsdWUgZm9yIHRoZSBjdXJyZW50IHRpbWVcbiAqL1xubGV0IG5vdyA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBjdXJyZW50IHRpbWUgYW5kIHBhc3NlZCBgdGltZWAgaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ8RGF0ZX0gdGltZSAtIEEgbnVtZXJpYyB0aW1lIG9yIGRhdGUgb2JqZWN0XG4gKi9cbmxldCBzZWNvbmRzU2luY2UgPSAodGltZSkgPT4ge1xuICByZXR1cm4gKG5vdygpIC0gdGltZSkgLyAxMDAwXG59XG5cbi8qKlxuICogQ2xhc3MgZm9yIGNoYW5uZWwgcmVsYXRlZCBmdW5jdGlvbnMgKGpvaW5pbmcsIGxlYXZpbmcsIHN1YnNjcmliaW5nIGFuZCBzZW5kaW5nIG1lc3NhZ2VzKVxuICovXG5leHBvcnQgY2xhc3MgQ2hhbm5lbCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdG9waWMgLSB0b3BpYyB0byBzdWJzY3JpYmUgdG9cbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCAtIEEgU29ja2V0IGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgc29ja2V0KSB7XG4gICAgdGhpcy50b3BpYyA9IHRvcGljXG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXRcbiAgICB0aGlzLm9uTWVzc2FnZUhhbmRsZXJzID0gW11cbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIGEgY2hhbm5lbCwgc3Vic2NyaWJlIHRvIGFsbCBjaGFubmVscyBtZXNzYWdlc1xuICAgKi9cbiAgam9pbigpIHtcbiAgICB0aGlzLnNvY2tldC53cy5zZW5kKEpTT04uc3RyaW5naWZ5KHsgZXZlbnQ6IEVWRU5UUy5qb2luLCB0b3BpYzogdGhpcy50b3BpYyB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMZWF2ZSBhIGNoYW5uZWwsIHN0b3Agc3Vic2NyaWJpbmcgdG8gY2hhbm5lbCBtZXNzYWdlc1xuICAgKi9cbiAgbGVhdmUoKSB7XG4gICAgdGhpcy5zb2NrZXQud3Muc2VuZChKU09OLnN0cmluZ2lmeSh7IGV2ZW50OiBFVkVOVFMubGVhdmUsIHRvcGljOiB0aGlzLnRvcGljIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIGFsbCBtZXNzYWdlIGhhbmRsZXJzIHdpdGggYSBtYXRjaGluZyBzdWJqZWN0XG4gICAqL1xuICBoYW5kbGVNZXNzYWdlKG1zZykge1xuICAgIHRoaXMub25NZXNzYWdlSGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4ge1xuICAgICAgaWYgKGhhbmRsZXIuc3ViamVjdCA9PT0gbXNnLnN1YmplY3QpIGhhbmRsZXIuY2FsbGJhY2sobXNnLnBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gYSBjaGFubmVsIHN1YmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN1YmplY3QgLSBzdWJqZWN0IHRvIGxpc3RlbiBmb3I6IGBtc2c6bmV3YFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSBuZXcgbWVzc2FnZSBhcnJpdmVzXG4gICAqL1xuICBvbihzdWJqZWN0LCBjYWxsYmFjaykge1xuICAgIHRoaXMub25NZXNzYWdlSGFuZGxlcnMucHVzaCh7IHN1YmplY3Q6IHN1YmplY3QsIGNhbGxiYWNrOiBjYWxsYmFjayB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBuZXcgbWVzc2FnZSB0byB0aGUgY2hhbm5lbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3ViamVjdCAtIHN1YmplY3QgdG8gc2VuZCBtZXNzYWdlIHRvOiBgbXNnOm5ld2BcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWQgLSBwYXlsb2FkIG9iamVjdDogYHttZXNzYWdlOiAnaGVsbG8nfWBcbiAgICovXG4gIHB1c2goc3ViamVjdCwgcGF5bG9hZCkge1xuICAgIHRoaXMuc29ja2V0LndzLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBldmVudDogRVZFTlRTLm1lc3NhZ2UsIHRvcGljOiB0aGlzLnRvcGljLCBzdWJqZWN0OiBzdWJqZWN0LCBwYXlsb2FkOiBwYXlsb2FkIH0pKVxuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgZm9yIG1haW50YWluaW5nIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXIgYW5kIG1haW50YWluaW5nIGNoYW5uZWxzIGxpc3RcbiAqL1xuZXhwb3J0IGNsYXNzIFNvY2tldCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW5kcG9pbnQgLSBXZWJzb2NrZXQgZW5kcG9udCB1c2VkIGluIHJvdXRlcy5jciBmaWxlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbmRwb2ludCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludFxuICAgIHRoaXMud3MgPSBudWxsXG4gICAgdGhpcy5jaGFubmVscyA9IFtdXG4gICAgdGhpcy5sYXN0UGluZyA9IG5vdygpXG4gICAgdGhpcy5yZWNvbm5lY3RUcmllcyA9IDBcbiAgICB0aGlzLmF0dGVtcHRSZWNvbm5lY3QgPSB0cnVlXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbGFzdCByZWNlaXZlZCBwaW5nIGhhcyBiZWVuIHBhc3QgdGhlIHRocmVzaG9sZFxuICAgKi9cbiAgX2Nvbm5lY3Rpb25Jc1N0YWxlKCkge1xuICAgIHJldHVybiBzZWNvbmRzU2luY2UodGhpcy5sYXN0UGluZykgPiBTVEFMRV9DT05ORUNUSU9OX1RIUkVTSE9MRF9TRUNPTkRTXG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdG8gcmVjb25uZWN0IHRvIHRoZSB3ZWJzb2NrZXQgc2VydmVyIHVzaW5nIGEgcmVjdXJzaXZlIHRpbWVvdXRcbiAgICovXG4gIF9yZWNvbm5lY3QoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVjb25uZWN0VGltZW91dClcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVjb25uZWN0VHJpZXMrK1xuICAgICAgdGhpcy5jb25uZWN0KHRoaXMucGFyYW1zKVxuICAgICAgdGhpcy5fcmVjb25uZWN0KClcbiAgICB9LCB0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbCgpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gaW5jcmVtZW50aW5nIHRpbWVvdXQgaW50ZXJ2YWwgYmFzZWQgYXJvdW5kIHRoZSBudW1iZXIgb2YgcmVjb25uZWN0aW9uIHJldHJpZXNcbiAgICovXG4gIF9yZWNvbm5lY3RJbnRlcnZhbCgpIHtcbiAgICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDAsIDEwMDAwXVt0aGlzLnJlY29ubmVjdFRyaWVzXSB8fCAxMDAwMFxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSByZWN1cnNpdmUgdGltZW91dCB0byBjaGVjayBpZiB0aGUgY29ubmVjdGlvbiBpcyBzdGFsZVxuICAgKi9cbiAgX3BvbGwoKSB7XG4gICAgdGhpcy5wb2xsaW5nVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb25Jc1N0YWxlKCkpIHtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3BvbGwoKVxuICAgICAgfVxuICAgIH0sIFNPQ0tFVF9QT0xMSU5HX1JBVEUpXG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcG9sbGluZyB0aW1lb3V0IGFuZCBzdGFydCBwb2xsaW5nXG4gICAqL1xuICBfc3RhcnRQb2xsaW5nKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBvbGxpbmdUaW1lb3V0KVxuICAgIHRoaXMuX3BvbGwoKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYGxhc3RQaW5nYCB0byB0aGUgY3VyZW50IHRpbWVcbiAgICovXG4gIF9oYW5kbGVQaW5nKCkge1xuICAgIHRoaXMubGFzdFBpbmcgPSBub3coKVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyByZWNvbm5lY3QgdGltZW91dCwgcmVzZXRzIHZhcmlhYmxlcyBhbiBzdGFydHMgcG9sbGluZ1xuICAgKi9cbiAgX3Jlc2V0KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlY29ubmVjdFRpbWVvdXQpXG4gICAgdGhpcy5yZWNvbm5lY3RUcmllcyA9IDBcbiAgICB0aGlzLmF0dGVtcHRSZWNvbm5lY3QgPSB0cnVlXG4gICAgdGhpcy5fc3RhcnRQb2xsaW5nKClcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0IHRoZSBzb2NrZXQgdG8gdGhlIHNlcnZlciwgYW5kIGJpbmRzIHRvIG5hdGl2ZSB3cyBmdW5jdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtcy5sb2NhdGlvbiAtIEhvc3RuYW1lIHRvIGNvbm5lY3QgdG8sIGRlZmF1bHRzIHRvIGB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVgXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJtYXMucG9ydCAtIFBvcnQgdG8gY29ubmVjdCB0bywgZGVmYXVsdHMgdG8gYHdpbmRvdy5sb2NhdGlvbi5wb3J0YFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1zLnByb3RvY29sIC0gUHJvdG9jb2wgdG8gdXNlLCBlaXRoZXIgJ3dzcycgb3IgJ3dzJ1xuICAgKi9cbiAgY29ubmVjdChwYXJhbXMpIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtc1xuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICBsb2NhdGlvbjogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLFxuICAgICAgcG9ydDogd2luZG93LmxvY2F0aW9uLnBvcnQsXG4gICAgICBwcm90b2NvbDogd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyA/ICd3c3M6JyA6ICd3czonLFxuICAgIH1cblxuICAgIGlmIChwYXJhbXMpIE9iamVjdC5hc3NpZ24ob3B0cywgcGFyYW1zKVxuICAgIGlmIChvcHRzLnBvcnQpIG9wdHMubG9jYXRpb24gKz0gYDoke29wdHMucG9ydH1gXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQoYCR7b3B0cy5wcm90b2NvbH0vLyR7b3B0cy5sb2NhdGlvbn0ke3RoaXMuZW5kcG9pbnR9YClcbiAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gKG1zZykgPT4geyB0aGlzLmhhbmRsZU1lc3NhZ2UobXNnKSB9XG4gICAgICB0aGlzLndzLm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmF0dGVtcHRSZWNvbm5lY3QpIHRoaXMuX3JlY29ubmVjdCgpXG4gICAgICB9XG4gICAgICB0aGlzLndzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVzZXQoKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgc29ja2V0IGNvbm5lY3Rpb24gcGVybWFuZW50bHlcbiAgICovXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5hdHRlbXB0UmVjb25uZWN0ID0gZmFsc2VcbiAgICBjbGVhclRpbWVvdXQodGhpcy5wb2xsaW5nVGltZW91dClcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWNvbm5lY3RUaW1lb3V0KVxuICAgIHRoaXMud3MuY2xvc2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgY2hhbm5lbCB0byB0aGUgc29ja2V0IGNoYW5uZWxzIGxpc3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRvcGljIC0gVG9waWMgZm9yIHRoZSBjaGFubmVsOiBgY2hhdF9yb29tOjEyM2BcbiAgICovXG4gIGNoYW5uZWwodG9waWMpIHtcbiAgICBsZXQgY2hhbm5lbCA9IG5ldyBDaGFubmVsKHRvcGljLCB0aGlzKVxuICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFubmVsKVxuICAgIHJldHVybiBjaGFubmVsXG4gIH1cblxuICAvKipcbiAgICogTWVzc2FnZSBoYW5kbGVyIGZvciBtZXNzYWdlcyByZWNlaXZlZFxuICAgKiBAcGFyYW0ge01lc3NhZ2VFdmVudH0gbXNnIC0gTWVzc2FnZSByZWNlaXZlZCBmcm9tIHdzXG4gICAqL1xuICBoYW5kbGVNZXNzYWdlKG1zZykge1xuICAgIGlmIChtc2cuZGF0YSA9PT0gXCJwaW5nXCIpIHJldHVybiB0aGlzLl9oYW5kbGVQaW5nKClcblxuICAgIGxldCBwYXJzZWRfbXNnID0gSlNPTi5wYXJzZShtc2cuZGF0YSlcbiAgICB0aGlzLmNoYW5uZWxzLmZvckVhY2goKGNoYW5uZWwpID0+IHtcbiAgICAgIGlmIChjaGFubmVsLnRvcGljID09PSBwYXJzZWRfbXNnLnRvcGljKSBjaGFubmVsLmhhbmRsZU1lc3NhZ2UocGFyc2VkX21zZylcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTb2NrZXQ6IFNvY2tldFxufVxuXG5cbi8qKlxuICogQWxsb3dzIGRlbGV0ZSBsaW5rcyB0byBwb3N0IGZvciBzZWN1cml0eSBhbmQgZWFzZSBvZiB1c2Ugc2ltaWxhciB0byBSYWlscyBqcXVlcnlfdWpzXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYVtkYXRhLW1ldGhvZD0nZGVsZXRlJ11cIikuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKSB8fCBcIkFyZSB5b3Ugc3VyZT9cIjtcbiAgICAgICAgICAgIGlmIChjb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKTtcbiAgICAgICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZShcIm1ldGhvZFwiLCBcIlBPU1RcIik7XG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiX21ldGhvZFwiKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIkRFTEVURVwiKTtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICAgICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgfSlcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2FtYmVyL2Fzc2V0cy9qcy9hbWJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=
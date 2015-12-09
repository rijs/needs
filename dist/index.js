'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = needs;

var _utilise = require('utilise.includes');

var _utilise2 = _interopRequireDefault(_utilise);

var _utilise3 = require('utilise.replace');

var _utilise4 = _interopRequireDefault(_utilise3);

var _client = require('utilise/client');

var _client2 = _interopRequireDefault(_client);

var _utilise5 = require('utilise.split');

var _utilise6 = _interopRequireDefault(_utilise5);

var _utilise7 = require('utilise.attr');

var _utilise8 = _interopRequireDefault(_utilise7);

var _utilise9 = require('utilise.key');

var _utilise10 = _interopRequireDefault(_utilise9);

var _utilise11 = require('utilise.lo');

var _utilise12 = _interopRequireDefault(_utilise11);

var _utilise13 = require('utilise.is');

var _utilise14 = _interopRequireDefault(_utilise13);

/* istanbul ignore next */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------
// Define Default Attributes for Components
// -------------------------------------------
function needs(ripple) {
  if (!_client2.default) return;
  log('creating');
  ripple.render = render(ripple)(ripple.render);
  return ripple;
}

function render(ripple) {
  return function (next) {
    return function (el) {
      var component = (0, _utilise12.default)(el.nodeName),
          headers = ripple.resources[component].headers,
          attrs = headers.attrs = headers.attrs || parse(headers.needs, component);

      return attrs.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var name = _ref2[0];
        var values = _ref2[1];

        return values.some(function (v, i) {
          var from = (0, _utilise8.default)(el, name) || '';
          return (0, _utilise2.default)(v)(from) ? false : (0, _utilise8.default)(el, name, (from + ' ' + v).trim());
        });
      }).some(Boolean) ? el.draw() : next(el);
    };
  };
}

function parse() {
  var attrs = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var component = arguments[1];

  return attrs.split('[').slice(1).map((0, _utilise4.default)(']', '')).map((0, _utilise6.default)('=')).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var k = _ref4[0];
    var v = _ref4[1];
    return v ? [k, v.split(' ')] : k == 'css' ? [k, [component + '.css']] : [k, []];
  });
}

var log = require('utilise/log')('[ri/needs]'),
    err = require('utilise/err')('[ri/needs]');
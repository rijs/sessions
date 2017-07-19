'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ripple) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      session = _ref.session;

  log('creating');
  if (!session) return ripple;
  ripple.server.express.use((0, _cookieParser2.default)(session.secret)).use((0, _expressSession2.default)(session));
  ripple.io.use(auth(session));
  return ripple;
};

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _client = require('utilise/client');

var _client2 = _interopRequireDefault(_client);

var _noop = require('utilise/noop');

var _noop2 = _interopRequireDefault(_noop);

var _key = require('utilise/key');

var _key2 = _interopRequireDefault(_key);

/* istanbul ignore next */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------
// Populates sessionID on each connection
// -------------------------------------------
var log = require('utilise/log')('[ri/sessions]'),
    auth = function auth(_ref2) {
  var secret = _ref2.secret,
      name = _ref2.name;
  return function (socket, next) {
    var req = {};
    (0, _key2.default)('headers.cookie', socket.request.headers.cookie)(req);
    (0, _cookieParser2.default)(secret)(req, null, _noop2.default);
    socket.sessionID = req.signedCookies[name] || req.cookies[name];
    next();
  };
};
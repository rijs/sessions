"use strict";

/* istanbul ignore next */
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// -------------------------------------------
// Populates sessionID on each connection
// -------------------------------------------
module.exports = sessions;

function sessions(ripple, _ref) {
  var secret = _ref.secret;
  var name = _ref.name;

  log("creating");
  if (client) {
    return identity;
  }if (!secret || !name) {
    return identity;
  }ripple.io.use(auth(secret, name));
  return ripple;
}

var cookie = _interopRequire(require("cookie-parser"));

var identity = _interopRequire(require("utilise/identity"));

var client = _interopRequire(require("utilise/client"));

var noop = _interopRequire(require("utilise/noop"));

var log = _interopRequire(require("utilise/log"));

var key = _interopRequire(require("utilise/key"));

log = log("[ri/sessions]");

function auth(secret, name) {
  return function (socket, next) {
    var req = {};
    key("headers.cookie", socket.request.headers.cookie)(req);
    cookie(secret)(req, null, noop);
    socket.sessionID = req.signedCookies[name] || req.cookies[name];
    next();
  };
}
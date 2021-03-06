'use strict';

// -------------------------------------------
// Populates sessionID on each connection
// -------------------------------------------
module.exports = function (ripple) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      session = _ref.session;

  log('creating');
  if (!session) return ripple;

  ripple.server.express.use(cookies(session.secret)).use(sessions(session));
  ripple.server.ws.on('connection', auth(session));
  return ripple;
};

var sessions = require('express-session'),
    cookies = require('cookie-parser'),
    client = require('utilise/client'),
    noop = require('utilise/noop'),
    key = require('utilise/key'),
    log = require('utilise/log')('[ri/sessions]'),
    auth = function auth(_ref2) {
  var secret = _ref2.secret,
      name = _ref2.name;
  return function (socket) {
    var req = {};
    key('headers.cookie', socket.upgradeReq.headers.cookie)(req);
    cookies(secret)(req, null, noop);
    socket.sessionID = req.signedCookies[name] || req.cookies[name];
  };
};
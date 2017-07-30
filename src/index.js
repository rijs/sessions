// -------------------------------------------
// Populates sessionID on each connection
// -------------------------------------------
module.exports = function(ripple, { session } = {}){
  log('creating')
  if (!session) return ripple
  ripple.server.express
    .use(cookies(session.secret))
    .use(sessions(session))
  ripple.io
    .use(auth(session))
  return ripple
}

const sessions = require('express-session')
    , cookies = require('cookie-parser')
    , client = require('utilise/client')
    , noop = require('utilise/noop')
    , key = require('utilise/key')
    , log = require('utilise/log')('[ri/sessions]')
    , auth = ({ secret, name }) => (socket, next) => {
        const req = {}
        key('headers.cookie', socket.request.headers.cookie)(req)
        cookies(secret)(req, null, noop)
        socket.sessionID = req.signedCookies[name] || req.cookies[name]
        next()
      }
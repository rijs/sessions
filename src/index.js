// -------------------------------------------
// Populates sessionID on each connection
// -------------------------------------------
export default function(ripple, { session } = {}){
  log('creating')
  if (!session) return ripple
  ripple.server.express
    .use(cookies(session.secret))
    .use(sessions(session))
  ripple.io
    .use(auth(session))
  return ripple
}

import sessions from 'express-session'
import cookies from 'cookie-parser'
import client from 'utilise/client'
import noop from 'utilise/noop'
import key from 'utilise/key'
const log = require('utilise/log')('[ri/sessions]')
    , auth = ({ secret, name }) => (socket, next) => {
        const req = {}
        key('headers.cookie', socket.request.headers.cookie)(req)
        cookies(secret)(req, null, noop)
        socket.sessionID = req.signedCookies[name] || req.cookies[name]
        next()
      }
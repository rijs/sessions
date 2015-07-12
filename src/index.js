// -------------------------------------------
// Populates sessionID on each connection
// -------------------------------------------
export default function sessions(ripple, { secret, name }){
  log('creating')
  if (client) return identity
  if (!secret || !name) return identity
  ripple.io.use(auth(secret, name))
  return ripple
}

import cookie from 'cookie-parser'
import identity from 'utilise/identity'
import client from 'utilise/client'
import noop from 'utilise/noop'
import log from 'utilise/log'
import key from 'utilise/key'
log = log('[ri/sessions]')

function auth(secret, name) {
  return function(socket, next){
    var req = {}
    key('headers.cookie', socket.request.headers.cookie)(req)
    cookie(secret)(req, null, noop)
    socket.sessionID = req.signedCookies[name] || req.cookies[name]
    next()
  }
}
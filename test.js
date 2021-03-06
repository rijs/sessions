const sessions   = require('./')
    , { expect } = require('chai')
  
describe('Sessions', function(){
  it('should skip if no cookie details provided', function(){  
    var ripple = {}

    expect(ripple)
      .to.be.eql(sessions(ripple))
      .to.be.eql(sessions(ripple, {}))
      .to.be.eql(sessions(ripple, { session: {} }))
      .to.be.eql(sessions(ripple, { session: { name: 'name' }}))
      .to.be.eql(sessions(ripple, { session: { secret: 'secret' }}))
  })

  it('should populate sessionID', function(){  
    var use = () => ({ use })
      , ripple = { server: { 
          express: { use }
        , ws: { on: function(type, fn){ fn(socket) }}}
        }
      , session = { secret: 'secret', name: 'foo', saveUninitialized: true, resave: true }
      , socket = { upgradeReq: { headers: { cookie: 'foo=bar' }}}

    expect(sessions(ripple, { session })).to.eql(ripple)
    expect(socket.sessionID).to.be.eql('bar')
  })
})
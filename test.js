var sessions = require('./').default
  , expect   = require('chai').expect
  
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
    var ripple = { io: { use: function(fn){ fn(socket, next) }}}
      , next = function(){ nextCalled = true }
      , socket = { request: { headers: { cookie: 'cookie' }}}
      , nextCalled

    expect(sessions(ripple, { session: { secret: 'secret', name: 'name' }})).to.eql(ripple)
    expect('sessionID' in socket).to.be.ok
    expect(nextCalled).to.be.ok
  })
})
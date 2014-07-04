describe('Emitter', function(){

  it('should start with an empty callbacks object', function(){
    var emitter = new Emitter();
    expect(emitter.callbacks).toEqual({});
  });

  describe('.on', function(){
    it('should add listeners', function(){

    });
  });

  describe('.emit', function(){
    it('should emit to all listeners', function(){

    });
  });

  describe('.off', function(){
    it('should remove all listeners for an event', function(){

    });
  });
});

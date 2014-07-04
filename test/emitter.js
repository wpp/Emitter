function Telephone(name) {
    this.name = name;
    Emitter.call(this);
}

Telephone.prototype = new Emitter();

describe('Emitter', function(){

  it('should start with an empty callbacks object', function(){
    var emitter = new Telephone();
    expect(emitter.callbacks).toEqual({});
  });

  describe('.on', function(){
    it('should add listeners', function(){
      var phone     = new Telephone(),
          ring      = function(){},
          vibrate   = function(){},
          ignore    = function(){},
          badString = new String('call');


      phone.on('incomingCall', ring);
      expect(phone.callbacks).toEqual({ 'incomingCall' : [ring] });

      phone.on('incomingCall', vibrate);
      expect(phone.callbacks).toEqual({ 'incomingCall' : [ring, vibrate] });

      phone.on('sms', vibrate);
      expect(phone.callbacks).toEqual({
         'incomingCall' : [ring, vibrate],
         'sms'          : [vibrate]
       });


      expect(function() {
        phone.on(3, ignore);
      }).toThrow(new Error('event is not a string literal!'));

      // we do not want instances of String
      expect(function() {
        phone.on(badString, vibrate);
      }).toThrow(new Error('event is not a string literal!'));
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

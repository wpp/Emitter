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
      var phone = new Telephone();

      var ring = function(){};
      var vibrate = function(){};

      phone.on('call', ring);
      expect(phone.callbacks).toEqual({ 'call' : [ring] });

      phone.on('call', vibrate);
      expect(phone.callbacks).toEqual({ 'call' : [ring, vibrate] });

      phone.on('sms', vibrate);
      expect(phone.callbacks).toEqual({
         'call' : [ring, vibrate],
         'sms'  : [vibrate]
       });

      var ignore = function(){};
      expect(function() {
        phone.on(3, ignore);
      }).toThrow(new Error('event is not a string literal!'));

      var keyString = new String('call'); // we do not want instances of String
      expect(function() {
        phone.on(keyString, vibrate);
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

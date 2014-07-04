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
      var phone         = new Telephone(),
          answeredCalls = 0,
          missedCalls   = 0,
          ring          = function(answered){ answered ? answeredCalls++ : missedCalls++; };

      phone.on('incomingCall', ring);

      phone.emit('incomingCall');
      phone.emit('incomingCall', true);
      phone.emit('incomingCall', true);

      expect(missedCalls).toBe(1);
      expect(answeredCalls).toBe(2);
    });
  });

  describe('.off', function(){
    it('should remove a listeners for an event', function(){
      var phone          = new Telephone(),
          answeredCalls  = 0,
          missedCalls    = 0,
          answeredCalls2 = 0,
          missedCalls2   = 0,
          ring           = function(answered){ answered ? answeredCalls++ : missedCalls++; },
          ring2          = function(answered){ answered ? answeredCalls2++ : missedCalls2++; },
          vibrate        = function(){},
          ring3          = function(){};

      phone.on('incomingCall', ring);
      phone.on('incomingCall', ring2);
      phone.emit('incomingCall');

      phone.off('incomingCall', ring);

      phone.emit('incomingCall');
      phone.emit('incomingCall');

      expect(missedCalls).toBe(1);
      expect(missedCalls2).toBe(3);

      // non-existing event
      phone.off('wat', ring);

      phone.on('sms', vibrate);
      phone.on('sms', ring);

      // should not remove the last element!
      // var array = [1, 2, 3];
      // array.splice(-1, 1); => [ 3 ]
      // array => [1, 2]
      phone.off('sms', ring3);

      expect(phone.callbacks).toEqual({
        'incomingCall'  : [ring2],
        'sms'           : [vibrate, ring]
      });
    });
  });

  describe('.off', function(){
    it('should remove all listeners for an event', function(){
      var phone   = new Telephone(),
          ring    = function(){},
          ring2   = function(){},
          vibrate = function(){},
          ring3   = function(){};

      phone.on('incomingCall', ring);
      phone.on('incomingCall', ring2);
      phone.on('incomingCall', ring3);
      phone.on('incomingCall', vibrate);
      phone.on('sms',          vibrate);

      phone.off('incomingCall');

      expect(phone.callbacks).toEqual({
         'sms' : [vibrate]
      });
    });
  });
});

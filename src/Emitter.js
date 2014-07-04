/*
* Largely based on:
* @visionmedia (Emitter from UI Kit) and @henrikjoreteg (WildEmitter)
* Thank you.
*/

function Emitter(){
  this.callbacks = {};
}


/**
 *
 */
Emitter.prototype.on = function(event, func){
    if (typeof event == 'string') {
        (this.callbacks[event] = this.callbacks[event] || []).push(func);
    } else {
        throw new Error('event is not a string literal!');
    }

    return this;
};


/**
 *
 */
Emitter.prototype.emit = function(event){
  var args = [].slice.call(arguments, 1),
      callbacks = this.callbacks[event];

  if (callbacks) {
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};


/**
 *
 */
Emitter.prototype.off = function(event, func){
    var callbacks = this.callbacks[event];

    if (typeof func == 'undefined') {
        delete this.callbacks[event];
        return this;
    }

    if (callbacks) {
        var i = callbacks.indexOf(func);
        if (i != -1) {
            callbacks.splice(i, 1);
        }
    }

    return this;
};

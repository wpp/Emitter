/*
* Largely based on:
* @visionmedia (Emitter from UI Kit) and @henrikjoreteg (WildEmitter)
* Thank you.
*/

function Emitter() {
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
Emitter.prototype.emit = function(){
};

/**
 *
 */
Emitter.prototype.off = function(){
};

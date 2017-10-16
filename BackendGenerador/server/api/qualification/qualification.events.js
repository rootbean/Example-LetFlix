/**
 * Qualification model events
 */

'use strict';

import {EventEmitter} from 'events';
var Qualification = require('../../sqldb').Qualification;
var QualificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QualificationEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Qualification) {
  for(var e in events) {
    let event = events[e];
    Qualification.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    QualificationEvents.emit(event + ':' + doc._id, doc);
    QualificationEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Qualification);
export default QualificationEvents;

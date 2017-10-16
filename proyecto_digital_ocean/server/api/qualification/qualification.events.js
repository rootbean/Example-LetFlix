/**
 * Qualification model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Qualification = require('../../sqldb').Qualification;
var QualificationEvents = new _events.EventEmitter();

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
  for (var e in events) {
    var event = events[e];
    Qualification.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc, options, done) {
    QualificationEvents.emit(event + ':' + doc._id, doc);
    QualificationEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Qualification);
exports.default = QualificationEvents;
//# sourceMappingURL=qualification.events.js.map

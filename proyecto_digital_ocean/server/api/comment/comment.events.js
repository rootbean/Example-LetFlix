/**
 * Comment model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Comment = require('../../sqldb').Comment;
var CommentEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CommentEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Comment) {
  for (var e in events) {
    var event = events[e];
    Comment.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc, options, respuesta) {
    CommentEvents.emit(event + ':' + doc.id, doc);
    CommentEvents.emit(event, doc);
  };
}

function respuesta() {
  callback(null, 'Success message');
}

registerEvents(Comment);
exports.default = CommentEvents;
//# sourceMappingURL=comment.events.js.map

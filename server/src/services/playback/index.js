'use strict';

const hooks = require('./hooks');

class Service {
  constructor(mpc) {
    this.mpc = mpc;
  }

  doCommand(command) {
  }

  get(id, params) {
    switch(id) {
      case 'play':
        return this.mpc.playback.play().then(() => null);

      case 'pause':
        return this.mpc.playback.pause().then(() => null);

      case 'stop':
        return this.mpc.playback.stop().then(() => null);

      case 'next':
        return this.mpc.playback.next().then(() => null);

      case 'previous':
        return this.mpc.playback.previous().then(() => null);

      case 'status':
        return this.mpc.status.status();

      default:
        return Promise.reject();
    }
  }
}
/*
next
pause
play
playId
previous
seek
seekCur
seekId
stop
*/

module.exports = function(){
  const app = this;
  const mpc = app.get('mpc');

  // Initialize our service with any options it requires
  app.use('/playback', new Service(mpc));

  // Get our initialize service to that we can bind hooks
  const playbackService = app.service('/playback');

  // Set up our before hooks
  playbackService.before(hooks.before);

  // Set up our after hooks
  playbackService.after(hooks.after);
};

module.exports.Service = Service;

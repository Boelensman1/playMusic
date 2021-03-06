const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/playback/:command', (req, res) => {
  const command = req.params.command;
  const mpc = req.app.get('mpc');
  switch(command) {
    case 'status':
      return res.json(mpc.status.status());
    default:
      return res.status(404).end();
  }
});

router.post('/playback/:command', (req, res) => {
  const mpc = req.app.get('mpc');
  const command = req.params.command;
  switch(command) {
      case 'play':
        return res.json(mpc.playback.play().then(() => undefined));

      case 'pause':
        return res.json(mpc.playback.pause().then(() => undefined));

      case 'stop':
        return res.json(mpc.playback.stop().then(() => undefined));

      case 'next':
        return res.json(mpc.playback.next().then(() => undefined));

      case 'previous':
        return res.json(mpc.playback.previous().then(() => undefined));

      case 'volume':
        const volume = req.body.volume;
        if (!volume) { return res.status(400).end() }
        return res.json(mpc.playbackOptions.setVolume(volume).then(() => undefined));

      case 'playId':
        const songId = req.body.songId;
        if (!songId) { return res.status(400).end() }
        return res.json(mpc.playback.playId(songId).then(() => undefined));

      case 'seekInCurrent':
        const time = req.body.time;
        if (!time) { return res.status(400).end() }
        return res.json(mpc.playback.seekCur(time).then(() => undefined));

      default:
        return res.status(404).end();
    }

});


module.exports = router;

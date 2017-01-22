
const debug = require('debug')('server:app');
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const config = require('config');

const feathers = require('feathers');
const authentication = require('feathers-authentication');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const logger = require('./utils/loggerProduction');
const middleware = require('./middleware');
const services = require('./services');

debug('Required');

const app = feathers()
  // We don't use feathers-configuration because 'config' is a better
  // alternative. You don't have to pass app along for app.get() with 'config'
  // and 'config' has more features.
  // Feathersjs will switch to 'config' at some point,
  // see https://github.com/feathersjs/feathers-configuration/issues/8

  .options('*', cors())

  // Log all REST requests
  .use(logger.setMorgan())
  // above is what .configure(require('feathers-logger')(morgan))
  // would basically do

  // General setup
  .use(cors())
  .use(favicon(path.join(config.server.publicPath, 'favicon.ico')))
  // .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  // Load app
  .get('/', serveHtmlForEnvironment) // for '/' only

  // Server static files
  .use('/', feathers.static('public'))
  .use('/', feathers.static('public/dist')) // assets generated by webpack

  // Routing for app. Load app; the client will handle rest of the routing.
  // default is '/app ...'
  .use(config.client.defaultRoute, serveHtmlForEnvironment)
  .use('/user', serveHtmlForEnvironment) // for '/user ...'

  // Utilities
  .use(compress())

  // Feathers setup with REST and socketio support
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware)
  .configure(authentication);

module.exports = app;

// Helpers

function serveHtmlForEnvironment(req, res) {
  var html; // eslint-disable-line no-var

  switch (config.NODE_ENV) {
    case 'devserver':
      html = './index-devserver.html';
      break;
    case 'production': // fall through
    case 'development': // fall through
    default:
      html = path.join('.', 'dist', 'index.html');
  }

  debug(`Serve file ${html} in ${config.NODE_ENV}`);
  res.sendFile(html, { root: config.server.publicPath });
}

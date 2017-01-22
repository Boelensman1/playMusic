
// Customise processing in feathers/index.js for your app

// See feathers-reduxify-services::default
export const mapServicePathsToNames = {
  users: 'users',
  messages: 'messages',
  logs: 'logs',
  config: 'config',
};

// See feathers-reduxify-services::getServicesStatus.
// Order highest priority msg first.
export const prioritizedListServices = ['logs'];

// Initializes the `apks` service on path `/api/apks`
const createService = require('feathers-sequelize');
const createModel = require('../../models/apks.model');
const hooks = require('./apks.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/apks', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/apks');

  service.hooks(hooks);
};

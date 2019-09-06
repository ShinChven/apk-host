const files = require('./files/files.service.js');
const apks = require('./apks/apks.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(files);
  app.configure(apks);
};

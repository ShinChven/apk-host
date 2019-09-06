const logger = require('../logger');
const param_name_access_secret = require('../constants').param_name_access_secret;

// eslint-disable-next-line
module.exports = function (options = {}) {
  return function hookApkAccess(req, res, next) {
    let secret = req.query[param_name_access_secret];
    if (!secret) {
      try {
        secret = req.params[param_name_access_secret];
      } catch (e) {
        // noinspection JSUnresolvedFunction
        logger.error(e);
      }
    }
    if (!secret) {
      try {
        secret = req.headers[param_name_access_secret];
      } catch (e) {
        // noinspection JSUnresolvedFunction
        logger.error(e);
      }
    }
    if (secret === req.app.get('secret')) {
      try {
        delete req.query.access_secret;
        next();
        return;
      } catch (e) {
        logger.error(e);
      }
    }
    res.status(403).send('not authorized');
  };
};

const logger = require('../logger');

// eslint-disable-next-line
module.exports = function (options = {}) {
  return function apkGetRelease(req, res) {
    const appId = req.params.appId;
    if (!appId) {
      res.status(400).send(new Error());
      return;
    }
    req.app.service('/api/apks').find({
      query: {
        appId: appId,
        $select: [
          'id',
          'appId',
          'versionCode',
          'versionName',
          'size',
          'whatsNew',
          'path',
          'createdAt'
        ],
        $limit: 1,
        $sort: {
          id: -1,
          versionCode: -1 // descending
        }
      }
    }).then(result => {
      res.send(result);
    }).catch(err => {
      logger.error(err);
      res.status(500).send(new Error('failed to find apk release info'));
    });

  };
};

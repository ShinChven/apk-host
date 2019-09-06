const uploadApk = require('./upload-apk');
const apkGetRelease = require('./apk_get_release');
const hookApkAccess = require('./hook_apk_access');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/api/*', hookApkAccess()); // hook api authentication
  app.use('/upload/*', hookApkAccess()); // hook upload authentication
  app.use('/upload/apk', uploadApk());
  app.use('/apk/release/:appId', apkGetRelease());
};

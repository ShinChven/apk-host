const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const ApkReader = require('node-apk-parser');
const logger = require('../logger');
const appRoot = require('../../appRoot').appRoot;
const shortUUID = require('short-uuid');

let uploadFolder = appRoot + '/public/uploads/';

/**
 * multer disk storage config
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    if (!fs.existsSync(uploadFolder)) {
      cb(new Error('directory not created'));
    } else {
      cb(null, uploadFolder);
    }
  },
  filename: function (req, file, cb) {
    const id = shortUUID.generate();
    let originalname = file.originalname;
    let filename = id + originalname.substring(originalname.lastIndexOf('.'), originalname.length);
    cb(null, filename);
  }
});

/**
 * limit of file size
 * @type {number}
 */
const fileSize = 200;

const allowedTypes = ['.apk'];

/**
 *
 * @type {Multer|undefined}
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileSize * 1024 * 1024 //size of your file
  },
  fileFilter: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    if (allowedTypes.indexOf(fileExt.toLowerCase()) > -1) {
      cb(null, true);
    } else {
      let err = new Error('File type not allowed: ' + fileExt);
      return cb(err);
    }
  }
});

// const APK_MIMETYPE = 'application/vnd.android.package-archive';


// eslint-disable-next-line no-unused-vars
module.exports = function () {
  return function uploadApk(req, res) {
    // console.log('upload-apk middleware is running');
    let uploadApk = upload.single('apk');
    uploadApk(req, res, function (err) { // process uploaded file
      if (err) {
        res.send(err);
      } else {
        if (req.file) {
          try {
            let filePath = uploadFolder + req.file.filename;
            // read android manifest
            let reader = ApkReader.readFile(filePath);
            let manifest = reader.readManifestSync();
            let apksService = req.app.service('/api/apks');
            apksService.find({query: {appId: manifest.package, versionCode: manifest.versionCode}})
              .then(apksResult => {
                if (apksResult.total > 0) { // check if apk with same version code exits
                  res.status(409).send({
                    error: {message: 'version already exits', code: 409},
                    androidManifest: manifest,
                  });
                  return;
                }
                // rename apk
                const apkname = `${manifest.package}-${manifest.versionName}(${manifest.versionCode})-${req.file.filename}`;
                // noinspection JSUnresolvedFunction
                logger.info(apkname);
                fs.renameSync(filePath, uploadFolder + apkname);
                // persist apk info
                let apkObject = {
                  appId: manifest.package,
                  versionCode: manifest.versionCode,
                  versionName: manifest.versionName,
                  path: 'uploads/' + apkname,
                  size: req.file.size,
                  androidManifest: manifest,
                  whatsNew: req.body.whatsNew,
                };
                return apksService.create(apkObject).then(apk => {
                  res.status(200).send(apk);
                });
              })
              .catch(err => {
                // noinspection JSUnresolvedFunction
                logger.error(err);
                res.status(500).send({error: {code: 500, message: err}});
              });
          } catch (e) {
            // noinspection JSUnresolvedFunction
            logger.error(err);
            res.status(500).send({error: {code: 500, message: 'Opening apk file failed, please check your file.'}});
          }
        } else {
          res.status(400).send({error: {code: 400, message: 'Upload failed'}});
        }
      }
    });
  };
};



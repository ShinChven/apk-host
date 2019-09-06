const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 文件上傳
// 创建一个空间
const storage = multer.diskStorage({
  destination: function (req, file, cb) {  // 创建和设置文件保存位置
    var uploads = 'public/uploads';
    var uploadDir = path.join(__dirname, '../' + uploads);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    if (!fs.existsSync(uploadDir)) {
      console.log('fileisnull');
      throw new Error('directory not created.');
    } else {
      cb(null, uploads);
    }
  },
  filename: function (req, file, cb) { // 文件命名规则
    const crypto = require('crypto');
    const id = crypto.randomBytes(16).toString('hex');
    var originalname = file.originalname;
    var filename = id + originalname.substring(originalname.lastIndexOf('.'), originalname.length);
    cb(null, filename);
  }
});

/**
 * 允许上传的文件大小：10mb
 * @type {number}
 */
const fileSize = 10;
/**
 *  配置允许的文件
 * @type {[*]}
 */
const allowedTypes = [
  '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.zip', '.rar', '.apk'
];

/**
 * 设置 upload 的一些方法
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileSize * 1024 * 1024 //size of u file
  },
  fileFilter: function (req, file, cb) { // 判断文件类型是否允许上传
    const fileExt = path.extname(file.originalname);
    if (allowedTypes.indexOf(fileExt.toLowerCase()) > -1) {
      cb(null, true);
    } else {
      let err = new Error('不允许的文件类型：[' + fileExt + ']。');
      return cb(err);
    }
  }
});


module.exports = upload;

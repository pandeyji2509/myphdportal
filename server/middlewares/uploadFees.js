const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dbConfig = require('../config/db');

var storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg', 'application/pdf'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-phdportal-${file.originalname}`,
    };
  },
});

var uploadFees = multer({ storage: storage }).fields([
  {
    name: 'fee',
    maxCount: 1,
  },
]);
var uploadFee_MiddleWare = util.promisify(uploadFees);

module.exports = uploadFee_MiddleWare;

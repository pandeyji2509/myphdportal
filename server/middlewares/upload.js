const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db");

// const {userObj}=require("../controller/user");

var storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "application/pdf"];

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

var uploadFiles = multer({ storage: storage }).fields([
  {
    name: "dmc",
    maxCount: 1,
  },
  {
    name: "eligibility",
    maxCount: 1,
  },
  {
    name: "migration",
    maxCount: 1,
  },
  {
    name: "noc",
    maxCount: 1,
  },
  {
    name: "scholarship",
    maxCount: 1,
  },
]);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
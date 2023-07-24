const upload = require("../middlewares/upload");
const dbConfig = require("../config/db");
const { collection } = require("../models/student");
const Student = require("../models/student");
const Scores = require("../models/scores");
const { createUser } = require("../services/user");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:5000/api/v1/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    const file = req.files;

    console.log(
      file,
      req.body,
      file.dmc[0].id,
      file.noc[0],
      file.eligibility[0],
      file.migration[0]
    );

    if (req.files === undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    var user = await Student.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(500).json({
        error: true,
        message: "Email is already in use",
      });
    }

    const userObj = await createUser({
      ...req.body,
      dmc: file.dmc[0].id,
      noc: file.noc[0].id,
      eligibility: file.eligibility[0].id,
      migration: file.migration[0].id,
    }, Student);

    const scoreData = {
        _id : userObj._id,
        bsc : 0.2 * userObj.bscPercent,
        msc : 0.3 * userObj.masterPercent,
        scholarship : 10,
        overall: 0.2 * userObj.bscPercent + 0.3 * userObj.masterPercent + 10,
      }
    await Scores.create(scoreData);

    await Student.findOneAndUpdate(
        { _id: userObj._id },
        { $set: { overallMarks: scoreData.overall } },
        { new: true } // This option returns the updated document
      );
    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);

    return res.send({
      message: `Error when trying upload image: ${error}`,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");

    const cursor = images.find({});

    if ((await collection.countDocuments()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  uploadFiles,
  getListFiles,
  download,
};
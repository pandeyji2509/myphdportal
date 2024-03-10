const upload = require("../middlewares/upload");
const uploadMoM = require("../middlewares/uploadMoM");
const uploadFees = require("../middlewares/uploadFees");
const dbConfig = require("../config/db");
const { collection } = require("../models/student");
const Student = require("../models/student");
const StudentRegDetails = require("../models/regDetails");
const Department = require("../models/department");
const Scores = require("../models/scores");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;
const baseUrl = "http://localhost:8000/files/";
const mongoClient = new MongoClient(url);

const uploadMom = async (req, res) => {
  try {
    await uploadMoM(req, res);
    const file = req.files;
    
    if (req.files === undefined) {
      return res.send({
        message: 'You must select a file.',
      });
    }

    const student = await Student.findOne({
      email: req.body.email,
    });

    await StudentRegDetails.findOneAndUpdate(
      { _id: student._id },
      { $set: { mom: req.files.mom[0].id } },
    );

    return res.send({
      message: 'Additional file has been uploaded.',
    });

  } catch (error) {
    console.log(error);

    return res.send({
      message: `Error when trying to upload additional file: ${error}`,
    });
  }
};

const uploadFee = async (req, res) => {
  try {
    await uploadFees(req, res);
    const file = req.files;
    
    if (req.files === undefined) {
      return res.send({
        message: 'You must select a file.',
      });
    }

    const student = await StudentRegDetails.findOne({
      enrollmentNumber: req.body.enrollmentNumber,
    });

    if(!student) {
      return res.status(500).json({
        error: true,
        message: "Invalid Enrollment Number",
      });
    }

    await StudentRegDetails.findOneAndUpdate(
      { _id: student._id },
      { $set: { fee: req.files.fee[0].id } },
    );

    return res.send({
      message: 'Additional file has been uploaded.',
    });

  } catch (error) {
    console.log(error);

    return res.send({
      message: `Error when trying to upload additional file: ${error}`,
    });
  }
};

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    const file = req.files;

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

    const department = await Department.findOne({
      depName: req.body.department,
    });

    const studentData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      subject: req.body.subject,
      gender: req.body.gender,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      mobile: req.body.mobile,
      permaddress: req.body.permaddress,
      localaddress: req.body.localaddress,
      aadhar: req.body.aadhar,
      tel: req.body.tel,
      state: req.body.state,
      department: department._id,
    };

    const stuObj = await Student.create(studentData);

    const regdetailsData = {
      _id: stuObj._id,
      masterDegree: req.body.masterDegree,
      masterYear: req.body.masterYear,
      masterUniversity: req.body.masterUniversity,
      masterDivision: req.body.masterDivision,
      masterMarks: req.body.masterMarks,
      masterPercent: req.body.masterPercent,
      masterSubject: req.body.masterSubject,
      masterRollNo: req.body.masterRollNo,

      enrollmentNumber: "",
      eligibilityTest: req.body.eligibilityTest,
      regNumber: req.body.regNumber,
      researchDep: req.body.researchDep,
      employed: req.body.employed,
      employerDetails: req.body.employerDetails,

      dmc: file.dmc[0].id,
      noc: file.noc[0].id,
      eligibility: file.eligibility[0].id,
      migration: file.migration[0].id,
      scholarship: file.scholarship[0].id,
    };

    const regdetailsObj = await StudentRegDetails.create(regdetailsData);

    const scoreData = {
      _id: stuObj._id,
      bsc: 0.2 * regdetailsObj.bscPercent,
      msc: 0.3 * regdetailsObj.masterPercent,
      scholarship: 10,
      overall: 0.2 * regdetailsObj.bscPercent + 0.3 * regdetailsObj.masterPercent + 10,
    };

    await Scores.create(scoreData);

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
        id: doc._id,
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
    // let downloadStream = bucket.openDownloadStream(req.params.id);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      console.log(err);
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

const downloadById = async (req, res) => {
  try {
    await mongoClient.connect();

    let database = mongoClient.db(dbConfig.database);
    let bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });

    const images = database.collection(dbConfig.imgBucket + ".files");
    const cursor = images.find({});

    if ((await collection.countDocuments()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos;
    await cursor.forEach((doc) => {
      // console.log(doc._id, req.params.id);
      if (doc._id == req.body.id) fileInfos = doc;
    });

    let downloadStream = bucket.openDownloadStreamByName(fileInfos.filename);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      console.log(err);
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

const viewLink = async (req, res) => {
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

    console.log(await collection.countDocuments());
    let fileInfos;
    await cursor.forEach((doc) => {
      // console.log(doc._id, req.params.id);
      if (doc._id.toString() == req.body.id) fileInfos = baseUrl + doc.filename;
    });
    return res.status(200).json({ filelink: fileInfos });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  uploadFiles,
  uploadMom,
  getListFiles,
  download,
  downloadById,
  viewLink,
  uploadFee
};

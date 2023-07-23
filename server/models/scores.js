const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoresSchema = new Schema(
    {
      bsc: { type: Number, default: 0 }, // Change type to Number for floating-point values
      msc: { type: Number, default: 0 }, // Change type to Number with default value 0
      scholarship: { type: Number, default: 0 }, // Change type to Number
      proposal: { type: Number, default: 0 }, // Change type to Number
      interaction: { type: Number, default: 0 }, // Change type to Number
      overall: { type: Number, default: 0 }, // Change type to Number
      isAcademicApproved: { type: Boolean, default: false },
      isMastersApproved: { type: Boolean, default: false },
      isOthersApproved: { type: Boolean, default: false },
      isMasterDMCApproved: { type: Boolean, default: false },
      isEligibilityTestApproved: { type: Boolean, default: false },
      isMigrationApproved: { type: Boolean, default: false },
      isNOCApproved: { type: Boolean, default: false },
      finalApproval: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  

const Scores = mongoose.model('Scores', scoresSchema);
module.exports = Scores;

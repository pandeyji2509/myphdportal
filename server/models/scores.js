const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoresSchema = new Schema(
    {
      bsc: { type: Number, default: 0 }, 
      msc: { type: Number, default: 0 }, 
      scholarship: { type: Number, default: 0 }, 
      proposal: { type: Number, default: 0 }, 
      interaction: { type: Number, default: 0 }, 
      overall: { type: Number, default: 0 }, 
      isAcademicApproved: { type: Boolean, default: false },
      isMastersApproved: { type: Boolean, default: false },
      isOthersApproved: { type: Boolean, default: false },
      isMasterDMCApproved: { type: Boolean, default: false },
      isEligibilityTestApproved: { type: Boolean, default: false },
      isMigrationApproved: { type: Boolean, default: false },
      isNOCApproved: { type: Boolean, default: false },
      isScholarshipApproved: { type: Boolean, default: false },
      isFeeUploaded: { type: Boolean, default: false },
      finalApproval: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  

const Scores = mongoose.model('Scores', scoresSchema);
module.exports = Scores;

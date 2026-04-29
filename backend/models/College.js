const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  duration: String,
  fees: Number,
  seats: Number,
});

const placementSchema = new mongoose.Schema({
  year: Number,
  averagePackage: Number,
  highestPackage: Number,
  placementPercentage: Number,
  topRecruiters: [String],
});

const reviewSchema = new mongoose.Schema({
  author: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  type: { type: String, enum: ['Government', 'Private', 'Deemed'], default: 'Private' },
  established: Number,
  rating: { type: Number, min: 0, max: 5 },
  totalFees: Number,
  description: String,
  image: String,
  tags: [String],
  courses: [courseSchema],
  placements: [placementSchema],
  reviews: [reviewSchema],
  naacGrade: String,
  nirfRank: Number,
  entranceExams: [String],
  rankCutoffs: [
    {
      exam: String,
      minRank: Number,
      maxRank: Number,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const punchCardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  punchesNeeded: {
    type: Number,
    required: true,
    min: 1, // Ensuring at least one punch is needed
  },
  punchesCollected: {
    type: Number,
    default: 0,
    min: 0,
  },
  rewardDescription: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed', 'expired'],
    default: 'inactive',
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // assuming you have a Business model
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    //required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
});

// Optional: Add a method to check if the card is complete
punchCardSchema.methods.isComplete = function () {
  return this.punchesCollected >= this.punchesNeeded;
};

// Optional: Middleware to auto-update status based on dates
punchCardSchema.pre('save', function (next) {
  const now = new Date();
  if (now > this.endDate) {
    this.status = 'expired';
  } else if (this.punchesCollected >= this.punchesNeeded) {
    this.status = 'completed';
  } else if (this.status === 'inactive' && now >= this.startDate) {
    this.status = 'active';
  }
  next();
});

module.exports = mongoose.model('PunchCard', punchCardSchema);

import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Offer description is required'],
      trim: true,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      default: 'Active Ritual',
    },
    timing: {
      type: String,
      default: '',
    },
    terms: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property to dynamically check if the offer is expired
offerSchema.virtual('isExpired').get(function () {
  return new Date() > this.endDate;
});

// Helper query method to find only valid, active, non-expired offers
offerSchema.statics.findActiveOffers = function () {
  const now = new Date();
  return this.find({
    active: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  }).sort({ createdAt: -1 });
};

export default mongoose.models.Offer || mongoose.model('Offer', offerSchema);

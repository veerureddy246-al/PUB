import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['corporate', 'birthday', 'anniversary', 'cocktail-mixer', 'brand-launch', 'custom'],
  },
  organizerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    default: '',
  },
  estimatedGuests: {
    type: Number,
    required: true,
  },
  targetDate: {
    type: String,
    required: true,
  },
  deckPreference: {
    type: String,
    default: 'Any / Full Rooftop Buyout',
  },
  cateringPackage: {
    type: String,
    enum: ['signature-cocktail-tapas', 'grand-rooftop-buffet', 'custom-curation'],
    default: 'signature-cocktail-tapas',
  },
  additionalNotes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'in-review', 'quoted', 'confirmed', 'declined', 'archived'],
    default: 'new',
  },
  archived: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

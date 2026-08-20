import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event timing is required'],
    },
    timing: {
      // Alias for time
      type: String,
    },
    day: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Event banner image is required'],
    },
    category: {
      type: String,
      default: 'Live Music',
    },
    genre: {
      // Alias for category/genre
      type: String,
      default: 'Live Acoustic & Indie',
    },
    artist: {
      type: String,
      default: 'Resident Artists',
    },
    deck: {
      type: String,
      default: 'Upper Sky Deck (Open Air)',
    },
    coverCharge: {
      type: String,
      default: 'Free Entry • Prior Table Reservation Recommended',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    highlight: {
      // Alias for featured
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    rsvpCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save synchronization
eventSchema.pre('save', function (next) {
  if (this.time && !this.timing) this.timing = this.time;
  if (this.timing && !this.time) this.time = this.timing;
  if (this.category && !this.genre) this.genre = this.category;
  if (this.genre && !this.category) this.category = this.genre;
  if (this.featured !== undefined) this.highlight = this.featured;
  if (this.highlight !== undefined && this.featured === undefined) this.featured = this.highlight;
  next();
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);

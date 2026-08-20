import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: [true, 'Booking reference is required'],
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    guestName: {
      // Alias for backward compatibility
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$|^[0-9+()\-.\s]{7,20}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    date: {
      type: String,
      required: [true, 'Reservation date is required'],
    },
    time: {
      type: String,
      required: [true, 'Arrival time is required'],
    },
    timeSlot: {
      // Alias for backward compatibility
      type: String,
    },
    guests: {
      type: Number,
      required: [true, 'Guest count is required'],
      min: [1, 'At least 1 guest required'],
      max: [50, 'Max 50 guests per online booking'],
    },
    partySize: {
      // Alias for backward compatibility
      type: Number,
    },
    deckZone: {
      type: String,
      enum: ['sky-deck', 'sunset-cabana', 'botanical-pergola', 'inner-lounge'],
      default: 'sky-deck',
    },
    occasion: {
      type: String,
      enum: ['casual', 'birthday', 'anniversary', 'date-night', 'corporate-dinner', 'celebration', 'other'],
      default: 'casual',
    },
    specialRequest: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
    },
    specialRequests: {
      // Alias for backward compatibility
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['confirmed', 'seated', 'completed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save synchronization for aliases
reservationSchema.pre('save', function (next) {
  if (this.name && !this.guestName) this.guestName = this.name;
  if (this.guestName && !this.name) this.name = this.guestName;
  if (this.time && !this.timeSlot) this.timeSlot = this.time;
  if (this.timeSlot && !this.time) this.time = this.timeSlot;
  if (this.guests && !this.partySize) this.partySize = this.guests;
  if (this.partySize && !this.guests) this.guests = this.partySize;
  if (this.specialRequest && !this.specialRequests) this.specialRequests = this.specialRequest;
  if (this.specialRequests && !this.specialRequest) this.specialRequest = this.specialRequests;
  next();
});

export default mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

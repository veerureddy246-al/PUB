import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    url: {
      // Alias for backward compatibility
      type: String,
    },
    title: {
      type: String,
      required: [true, 'Title or caption is required'],
      trim: true,
    },
    caption: {
      // Alias for title
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Ambience', 'Food', 'Drinks', 'Events', 'Skyline & Atmosphere', 'Mixology & Cocktails', 'Culinary Masterpieces', 'Live Music & Gigs'],
      default: 'Ambience',
    },
    alt: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save synchronization
galleryItemSchema.pre('save', function (next) {
  if (this.image && !this.url) this.url = this.image;
  if (this.url && !this.image) this.image = this.url;
  if (this.title && !this.caption) this.caption = this.title;
  if (this.caption && !this.title) this.title = this.caption;
  if (!this.alt) this.alt = this.title;
  next();
});

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);

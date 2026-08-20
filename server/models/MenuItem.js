import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Food',
        'Cocktails',
        'Beer',
        'Wine',
        'Non-Alcoholic',
        // Granular subcategories for backward compatibility
        'signatures',
        'starters',
        'wood-fired-pizza',
        'mains-global',
        'mains-indian',
        'craft-cocktails',
        'single-malts-wines',
        'desserts',
      ],
    },
    subCategory: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Item image URL is required'],
      default: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    available: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isChefsSpecial: {
      // Alias for featured
      type: Boolean,
      default: false,
    },
    dietary: {
      type: String,
      enum: ['veg', 'non-veg', 'vegan', 'egg'],
      default: 'veg',
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    spiciness: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },
    pairWith: {
      type: String,
      default: '',
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Pre-save to sync featured and isChefsSpecial
menuItemSchema.pre('save', function (next) {
  if (this.featured !== undefined) this.isChefsSpecial = this.featured;
  if (this.isChefsSpecial !== undefined && this.featured === undefined) this.featured = this.isChefsSpecial;
  next();
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

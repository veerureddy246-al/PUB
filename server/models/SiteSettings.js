import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    // General Information
    restaurantName: {
      type: String,
      default: '1522 The Pub — Mumbai',
    },
    tagline: {
      type: String,
      default: 'Rooftop Lounge • Craft Cocktails • Heritage Flavors',
    },
    address: {
      type: String,
      default: 'Level 2, Goldfinch Hotel, MIDC Central Road, Chakala, Andheri East, Mumbai, Maharashtra 400093',
    },
    phone: {
      type: String,
      default: '+91 80 4748 3333',
    },
    secondaryPhone: {
      type: String,
      default: '+91 98201 52200',
    },
    email: {
      type: String,
      default: 'concierge.mumbai@1522thepub.com',
    },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.google.com/?q=1522+The+Pub+Andheri+East+Mumbai',
    },

    // Opening Hours
    openingHours: {
      weekday: {
        type: String,
        default: '12:00 PM – 01:30 AM',
      },
      weekend: {
        type: String,
        default: '12:00 PM – 01:30 AM',
      },
      happyHours: {
        type: String,
        default: '04:00 PM – 08:00 PM (Monday to Friday)',
      },
      lastKitchenOrder: {
        type: String,
        default: '12:45 AM',
      },
    },

    // Social Media Links
    socialLinks: {
      instagram: {
        type: String,
        default: 'https://instagram.com/1522mumbai',
      },
      facebook: {
        type: String,
        default: 'https://facebook.com/1522mumbai',
      },
      twitter: {
        type: String,
        default: 'https://twitter.com/1522mumbai',
      },
      youtube: {
        type: String,
        default: 'https://youtube.com',
      },
    },

    // Hero Section CMS
    hero: {
      eyebrow: {
        type: String,
        default: 'ANDHERI EAST • ROOFTOP SKY DECK',
      },
      heading: {
        type: String,
        default: 'Where Mumbai’s Skyline Meets Crafted Mixology',
      },
      subheading: {
        type: String,
        default: 'An open-air rooftop sanctuary perched above Andheri East. Artisanal cocktails, legendary Kundapur ghee roasts, and soulful live music under the stars.',
      },
      primaryButtonText: {
        type: String,
        default: 'Reserve a Table',
      },
      primaryButtonLink: {
        type: String,
        default: '/reservations',
      },
      secondaryButtonText: {
        type: String,
        default: 'Explore Menu',
      },
      secondaryButtonLink: {
        type: String,
        default: '/menu',
      },
      mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
      },
      mediaUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
      },
      published: {
        type: Boolean,
        default: true,
      },
    },

    // Our Story Section CMS
    story: {
      eyebrow: {
        type: String,
        default: 'OUR HERITAGE & PASSION',
      },
      heading: {
        type: String,
        default: 'Born in Bangalore. Reimagined for the Mumbai Sky.',
      },
      subtitle: {
        type: String,
        default: 'A decade-long legacy of rock, nostalgia, and progressive coastal gastronomy.',
      },
      paragraphs: {
        type: [String],
        default: [
          'Founded with a pure love for good rock music, cold draught beers, and unapologetically bold flavors, 1522 began as a legendary neighborhood pub in Bengaluru before bringing its distinctive energy to Mumbai’s financial heart in Andheri East.',
          'At our expansive rooftop deck at the Goldfinch Hotel, we blend classic pub hospitality with progressive coastal culinary craftsmanship. From the smoky notes of our Applewood Bourbon Old Fashioned to our 48-hour slow-cooked Mangalorean Ghee Roast, every element is curated to create unforgettable evenings.',
        ],
      },
      stats: {
        type: [
          {
            value: String,
            label: String,
          },
        ],
        default: [
          { value: '12+', label: 'Years of Heritage' },
          { value: '35+', label: 'Signature Mixes' },
          { value: '4.8★', label: 'Guest Rating' },
          { value: '250+', label: 'Rooftop Capacity' },
        ],
      },
      imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
      },
      published: {
        type: Boolean,
        default: true,
      },
    },

    // SEO Settings
    seo: {
      metaTitle: {
        type: String,
        default: '1522 The Pub Mumbai — Premier Rooftop Bar & Kitchen in Andheri East',
      },
      metaDescription: {
        type: String,
        default: 'Experience 1522 Mumbai: Andheri East’s premier rooftop pub with craft cocktails, Mangalorean ghee roast, live music, and starlit open-air sky deck dining.',
      },
      keywords: {
        type: [String],
        default: ['1522 Mumbai', 'Rooftop Pub Andheri', 'Cocktail Bar Andheri East', 'Goldfinch Hotel Pub', 'Mangalorean Ghee Roast'],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);

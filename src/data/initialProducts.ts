import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // =========================================================================
  // 1. JEANS (WIDE VARIETY: BAGGY, WIDE-LEG, CARPENTER, DISTRESSED, SELVEDGE, SLIM, FLARE, LITTLE BOYS)
  // =========================================================================
  {
    id: 'blue-duck-selvedge-baggy-01',
    name: 'Blue Duck® 14.5oz Raw Redline Selvedge Skater Baggy',
    slug: 'blue-duck-14-5oz-raw-redline-selvedge-skater-baggy',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Skater Baggy',
    rise: 'Mid Rise',
    waistStyle: 'Classic Button Fly with Redline Coin Pocket',
    stretch: '100% Rigid Heavy Cotton Selvedge',
    fabricWeight: '14.5 oz Shuttle-Loomed Denim',
    price: 2999,
    originalPrice: 3799,
    description: 'The iconic Blue Duck® raw selvedge jean engineered for skaters, young creators, and denim connoisseurs. Features authentic redline shuttle-loom selvedge ticker tape, deep 90s baggy drape, and custom antique brass hardware.',
    story: 'Woven slowly on heritage projectile shuttle looms to produce deep indigo fading whiskers and honeycombs with raw authentic break-in.',
    details: [
      '100% Indian Long-Staple Ring-Spun Heavyweight Cotton',
      'Continuous redline selvedge ID tape on outer seam & coin pocket',
      'Solid antique copper donut buttons & concealed pocket rivets',
      'Reinforced double-chainstitch waistband and ankle hems',
      'Signature Blue Duck® debossed red leather backpatch'
    ],
    washes: [
      {
        name: 'Deep Raw Redline Indigo',
        colorHex: '#14213d',
        code: 'raw-indigo',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Vintage 90s Stonewash Blue',
        colorHex: '#3a5a80',
        code: 'vintage-stone',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Shadow Pitch Blackout',
        colorHex: '#18181b',
        code: 'shadow-black',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 52,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 168,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Arvind Heritage Mills, Gujarat, India'
  },
  {
    id: 'blue-duck-acid-wideleg-02',
    name: 'Blue Duck® 90s Vintage Acid Washed Wide-Leg Denim',
    slug: 'blue-duck-90s-vintage-acid-washed-wide-leg-denim',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Wide Leg',
    rise: 'High Rise',
    waistStyle: 'Zipper Fly with Dual Button Fastener',
    stretch: '100% Ringspun Cotton Denim',
    fabricWeight: '13.8 oz Pure Denim',
    price: 2499,
    originalPrice: 3199,
    description: 'Throwback 90s grunge aesthetic featuring bold marble acid wash treatment, wide relaxed leg silhouette, and comfortable puddle hem drape over platform sneakers.',
    story: 'Re-imagined from 1994 Tokyo and Mumbai street archives, each pair undergoes artisan pumice-stone acid laundering for a 1-of-1 pattern.',
    details: [
      'Artisan pumice-stone enzyme acid wash',
      'Relaxed wide-leg opening with clean puddle cuff',
      'Reinforced front pocket bags with contrast red bar-tacks',
      'YKK brass smooth zipper fly'
    ],
    washes: [
      {
        name: 'Acid Ice Cloud Blue',
        colorHex: '#38bdf8',
        code: 'acid-ice',
        image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Acid Charcoal Smoke',
        colorHex: '#475569',
        code: 'acid-charcoal',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Bleached Salt Marble',
        colorHex: '#cbd5e1',
        code: 'bleached-salt',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 41,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.85,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'LNJ Denim Mills, Rajasthan, India'
  },
  {
    id: 'blue-duck-carpenter-jean-03',
    name: 'Blue Duck® Y2K Double-Knee Carpenter Utility Jean',
    slug: 'blue-duck-y2k-double-knee-carpenter-utility-jean',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Carpenter Utility',
    rise: 'Mid Rise',
    waistStyle: 'Heavy Duty Belt Loop Waist',
    stretch: '100% Heavy Duty Cotton Denim',
    fabricWeight: '14.0 oz Rugged Work Denim',
    price: 2699,
    originalPrice: 3499,
    description: 'Workwear-inspired skate carpenter denim built with heavy dual-layer knee panels, authentic tool hammer loop, utility ruler pocket, and triple-needle flat-felled seam reinforcements.',
    story: 'Engineered for high durability and skate park slides, resisting blowout with double front panelling.',
    details: [
      'Heavy dual-layer reinforced knee panels with rivet anchors',
      'Side hammer loop and deep multi-utility tool slide pocket',
      'Triple-needle stitched side seams for indestructible construction',
      'Roomy straight-to-loose leg fit'
    ],
    washes: [
      {
        name: 'Vintage Tinted Indigo',
        colorHex: '#1e3a5f',
        code: 'tint-indigo',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Concrete Faded Slate',
        colorHex: '#475569',
        code: 'concrete-slate',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Industrial Tan Denim',
        colorHex: '#9a7b56',
        code: 'industrial-tan',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    rating: 4.88,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Production Unit, Mumbai'
  },
  {
    id: 'blue-duck-distressed-biker-04',
    name: 'Blue Duck® Ripped & Distressed Moto Biker Denim',
    slug: 'blue-duck-ripped-distressed-moto-biker-denim',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Ripped Biker',
    rise: 'Mid Rise',
    waistStyle: 'Comfort Flex Band with Zip Fly',
    stretch: '3% Power-Flex Stretch',
    fabricWeight: '12.5 oz Super Flex Denim',
    price: 2499,
    originalPrice: 3199,
    description: 'High-octane moto biker jeans featuring accordion ribbed knee pleats, hand-shredded distressed abrasions, zip ankle expanders, and intense power-stretch for active mobility.',
    story: 'Designed for concert nightouts and street style, offering extreme flexibility with sculpted moto ergonomics.',
    details: [
      'Ribbed moto accordion knee and thigh panels',
      'Hand-finished distressed rip & repair backing (no skin exposed)',
      '3% Spandex power stretch for 360-degree freedom',
      'Zip expandable ankle hems'
    ],
    washes: [
      {
        name: 'Smoky Jet Black Distressed',
        colorHex: '#18181b',
        code: 'smoky-black',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Distressed Mid Indigo Bleach',
        colorHex: '#2563eb',
        code: 'distressed-indigo',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 30,
    isFeatured: false,
    rating: 4.78,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Surat Denim Processing Unit, Gujarat'
  },
  {
    id: 'blue-duck-relaxed-straight-05',
    name: 'Blue Duck® Heritage Relaxed Straight Raw Selvedge',
    slug: 'blue-duck-heritage-relaxed-straight-raw-selvedge',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Relaxed Straight',
    rise: 'Mid Rise',
    waistStyle: 'Classic 5-Pocket Button Fly',
    stretch: '100% Unwashed Raw Cotton',
    fabricWeight: '14.2 oz Heritage Denim',
    price: 2799,
    originalPrice: 3599,
    description: 'Timeless straight-leg cut with room through seat and thigh, dropping cleanly down to shoes. Built with heavy red selvedge ticker tape and custom brass hardware.',
    story: 'The versatile staple that effortlessly bridges formal collared shirts and casual streetwear hoodies.',
    details: [
      '100% Pure Ring-Spun Cotton',
      'Clean straight leg 8.2" ankle opening',
      'Copper-reinforced stress points and hidden rivets',
      'Full grain cowhide leather waist patch'
    ],
    washes: [
      {
        name: 'Heritage Dark Indigo',
        colorHex: '#0f172a',
        code: 'dark-indigo',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Solid Raven Black',
        colorHex: '#020617',
        code: 'raven-black',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 45,
    rating: 4.82,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Arvind Mills, Gujarat'
  },
  {
    id: 'blue-duck-comfort-slim-taper-06',
    name: 'Blue Duck® 4-Way Comfort Stretch Slim-Tapered Jeans',
    slug: 'blue-duck-4-way-comfort-stretch-slim-tapered-jeans',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Slim Tapered',
    rise: 'Mid Rise',
    waistStyle: 'Stretch Waistband with Zip Fly',
    stretch: '2.5% Dual-Core Lycra Stretch',
    fabricWeight: '12.0 oz All-Day Stretch Denim',
    price: 2199,
    originalPrice: 2799,
    description: 'Everyday modern slim taper with generous thigh room that narrows neatly toward the ankle. Dual-core stretch fibers guarantee zero knee-bagging even after 14-hour wear.',
    story: 'Engineered for college students and active teens needing a clean, sharp look that feels as comfy as sweatpants.',
    details: [
      '97.5% Cotton, 2.5% Dual-Core Lycra',
      'Ultra-soft brushed interior for maximum skin comfort',
      'Tapered 6.5" leg opening',
      'Anti-fade color lock dye technology'
    ],
    washes: [
      {
        name: 'Deep Ocean Blue Indigo',
        colorHex: '#1e40af',
        code: 'ocean-blue',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Mid Stonewash Denim',
        colorHex: '#3b82f6',
        code: 'mid-stone',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Washed Ash Grey',
        colorHex: '#64748b',
        code: 'ash-grey',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 65,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Vardhman Textiles, Punjab'
  },
  {
    id: 'blue-duck-bootcut-flare-07',
    name: 'Blue Duck® 70s Vintage Flare Selvedge Denim',
    slug: 'blue-duck-70s-vintage-flare-selvedge-denim',
    category: 'jeans',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'High Rise Flare',
    rise: 'High Rise',
    waistStyle: 'Fitted Waist with Bell Bottom Flare',
    stretch: '1% Comfort Flex Stretch',
    fabricWeight: '13.5 oz Ringspun Denim',
    price: 2899,
    originalPrice: 3699,
    description: 'Retro 70s rock flare denim tailored snug through the thigh with a subtle flare from knee to hem, draping dramatically over boots and high-top sneakers.',
    story: 'Popularized by modern streetwear tastemakers and indie musicians.',
    details: [
      'Subtle bell-bottom flare opening (9.5" hem)',
      'High-rise waist with tailored hip contouring',
      'Copper rivets and contrast gold topstitching',
      'Deep front curved pockets'
    ],
    washes: [
      {
        name: 'Washed Indigo Vintage Fade',
        colorHex: '#2563eb',
        code: 'vintage-fade',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Solid Pitch Black Flare',
        colorHex: '#0f172a',
        code: 'black-flare',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 28,
    rating: 4.76,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'LNJ Denim Mills, Rajasthan'
  },
  {
    id: 'blue-duck-junior-baggy-08',
    name: 'Blue Duck® Junior 90s Skater Baggy Denim (8–14Y)',
    slug: 'blue-duck-junior-90s-skater-baggy-denim-8-14y',
    category: 'jeans',
    ageGroup: 'junior-8-14',
    ageLabel: 'Ages 8–14 Yrs',
    targetAgeRange: '8 - 14 Years',
    gender: 'boys',
    fit: 'Skater Baggy',
    rise: 'Mid Rise',
    waistStyle: 'Internal Adjustable Elastic Button-Tab Waistband',
    stretch: '2% Comfort Flex Stretch',
    fabricWeight: '12.0 oz Tough Play Denim',
    price: 2299,
    originalPrice: 2899,
    description: 'Engineered specifically for growing junior boys. Roomy skater baggy profile with secret internal button-hole elastic tabs that expand up to 2.5 inches as boys grow taller.',
    story: 'Survives skateboards, soccer ground turf, and school backpacks while keeping that trending oversized skate fit.',
    details: [
      'Concealed internal buttonhole elastic waistband for custom waist cinch',
      'Reinforced double-ply knee panels prevent premature blowout',
      'Roomy hip and thigh fit for high active movement',
      'Non-abrasive soft cotton pocket linings'
    ],
    washes: [
      {
        name: 'Medium Stone Indigo Wash',
        colorHex: '#3b82f6',
        code: 'medium-stone',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Washed Jet Black',
        colorHex: '#18181b',
        code: 'junior-black',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Dusty Ice Bleach Wash',
        colorHex: '#93c5fd',
        code: 'ice-bleach',
        image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['8-9Y (24W)', '10-11Y (25W)', '12-13Y (26W)', '14-15Y (28W)'],
    inStock: true,
    stockCount: 48,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.92,
    reviewCount: 135,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Facility, Mumbai'
  },
  {
    id: 'blue-duck-junior-cargo-denim-09',
    name: 'Blue Duck® Junior Tactical 6-Pocket Denim Cargo Jeans (8–14Y)',
    slug: 'blue-duck-junior-tactical-6-pocket-denim-cargo-jeans-8-14y',
    category: 'jeans',
    ageGroup: 'junior-8-14',
    ageLabel: 'Ages 8–14 Yrs',
    targetAgeRange: '8 - 14 Years',
    gender: 'boys',
    fit: 'Tactical 6-Pocket',
    rise: 'Mid Rise',
    waistStyle: 'Expandable Inner Button-Tab Waist',
    stretch: '2% High-Flex Stretch',
    fabricWeight: '12.5 oz Heavy Duty Denim',
    price: 2499,
    originalPrice: 3199,
    description: 'Hybrid cargo jeans with 6 deep bellowed utility pockets, heavy-duty pocket snap flaps, and double-stitched bar-tacks designed to hold toys, smartphones, and school snacks.',
    story: 'The most functional bottom in junior fashion, blending tactical utility with authentic denim wash.',
    details: [
      '6 Military cargo utility flap pockets with snap closure',
      'Growth adjuster elastic inner waistband',
      'Extra reinforced seat and knee panels',
      'YKK anti-rust metal zipper'
    ],
    washes: [
      {
        name: 'Vintage Tint Indigo Cargo',
        colorHex: '#1e3a5f',
        code: 'tint-cargo',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Midnight Black Cargo Denim',
        colorHex: '#09090b',
        code: 'midnight-cargo',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['8-9Y (24W)', '10-11Y (25W)', '12-13Y (26W)', '14-15Y (28W)'],
    inStock: true,
    stockCount: 39,
    isNewArrival: true,
    rating: 4.88,
    reviewCount: 78,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Facility, Mumbai'
  },
  {
    id: 'blue-duck-kids-doubleknee-10',
    name: 'Blue Duck® Little Boys Double-Knee Play-Proof Jeans (3–7Y)',
    slug: 'blue-duck-little-boys-double-knee-play-proof-jeans-3-7y',
    category: 'jeans',
    ageGroup: 'kids-3-7',
    ageLabel: 'Ages 3–7 Yrs',
    targetAgeRange: '3 - 7 Years',
    gender: 'boys',
    fit: 'Double Knee Work',
    rise: 'Mid Rise',
    waistStyle: 'Soft Ribbed Elastic Waistband with Mock Fly & Drawstring',
    stretch: '4% Super-Flex Organic Cotton',
    fabricWeight: '10.5 oz Ultra-Soft Kid Denim',
    price: 1999,
    originalPrice: 2499,
    description: 'Designed exclusively for active 3 to 7-year-olds. Super-soft knit denim with double-reinforced knee patches to prevent crawling and playground rips, paired with a non-pinching elastic rib waistband.',
    story: 'No stiff buttons or pinching zippers. Little boys can pull them on and off independently for potty runs and outdoor fun.',
    details: [
      '100% pinch-free elastic ribbed waistband with functional cotton drawcord',
      'Double-ply reinforced knee patches tested for 500+ playground slides',
      'Super-soft cotton loops inside for zero itch or scratchiness',
      'Machine washable and pre-shrunk'
    ],
    washes: [
      {
        name: 'Classic Medium Play Indigo',
        colorHex: '#3b82f6',
        code: 'play-indigo',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Dark Wash Clean Stretch',
        colorHex: '#1e3a8a',
        code: 'dark-play',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Vintage Sandblast Wash',
        colorHex: '#60a5fa',
        code: 'vintage-sandblast',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['3-4Y (104cm)', '4-5Y (110cm)', '5-6Y (116cm)', '6-7Y (122cm)'],
    inStock: true,
    stockCount: 56,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.95,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Kids Division, Mumbai'
  },
  {
    id: 'blue-duck-kids-ribbed-elastic-11',
    name: 'Blue Duck® Little Boys Drawstring Jogger Denim (3–7Y)',
    slug: 'blue-duck-little-boys-drawstring-jogger-denim-3-7y',
    category: 'jeans',
    ageGroup: 'kids-3-7',
    ageLabel: 'Ages 3–7 Yrs',
    targetAgeRange: '3 - 7 Years',
    gender: 'boys',
    fit: 'Comfort Stretch',
    rise: 'Mid Rise',
    waistStyle: 'Elastic Waistband with Contrast Rib Cuffs',
    stretch: '3.5% Super-Stretch Knit Denim',
    fabricWeight: '10.0 oz Breathable Cotton Knit',
    price: 1999,
    originalPrice: 2499,
    description: 'Knit denim joggers combining the authentic look of 5-pocket jeans with the cloud-like comfort of fleece sweatpants. Ankle rib cuffs keep bottoms off dusty ground.',
    story: 'The go-to everyday pant for birthday parties, preschool, and flights.',
    details: [
      'Knitted indigo yarn with 3.5% elastane flex',
      'Comfort rib ankle cuffs prevent stepping on hemlines',
      'Elastic waist with braided cotton tie',
      'Tested azo-free, baby-skin-safe dyes'
    ],
    washes: [
      {
        name: 'Sky Light Blue Stone',
        colorHex: '#93c5fd',
        code: 'sky-light',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Deep Royal Indigo',
        colorHex: '#1d4ed8',
        code: 'royal-indigo',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Charcoal Black Acid',
        colorHex: '#334155',
        code: 'charcoal-acid',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['3-4Y (104cm)', '4-5Y (110cm)', '5-6Y (116cm)', '6-7Y (122cm)'],
    inStock: true,
    stockCount: 44,
    rating: 4.9,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Kids Division, Mumbai'
  },

  // =========================================================================
  // 2. TRACK PANTS (PRO-TECH ATHLETIC, SPEED STRIPES, TRICOT, HIGH PERFORMANCE)
  // =========================================================================
  {
    id: 'blue-duck-protech-track-12',
    name: 'Blue Duck® Pro-Tech Active Training Track Pants',
    slug: 'blue-duck-pro-tech-active-training-track-pants',
    category: 'trackpants',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Slim Tapered',
    rise: 'Mid Rise',
    waistStyle: 'Elastic Waistband with Rubberized Drawstring',
    stretch: '12% 4-Way Hyper-Stretch Spandex',
    fabricWeight: '260 GSM Tech Poly-Spandex Twill',
    price: 2199,
    originalPrice: 2799,
    description: 'High-performance athletic track pants engineered with 4-way hyper-stretch fabric, zippered deep hand pockets, and breathable mesh side vents for gym, running, and casual athletic wear.',
    story: 'Tested by athletes and young fitness enthusiasts for moisture-wicking and unrestricted movement.',
    details: [
      '88% Poly-Tech with 12% Spandex 4-way hyper stretch',
      'Concealed YKK zippered side pockets prevent phone bouncing',
      'Tapered athletic ankle with concealed side zipper expansion',
      'Reflective Blue Duck® high-visibility night runner logo'
    ],
    washes: [
      {
        name: 'Matte Stealth Black with Red Stripe',
        colorHex: '#18181b',
        code: 'black-red-stripe',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Navy Blue with White Racing Stripe',
        colorHex: '#1e3a8a',
        code: 'navy-white-stripe',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Charcoal Grey with Neon Accent',
        colorHex: '#374151',
        code: 'charcoal-neon',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W (S)', '30W (M)', '32W (L)', '34W (XL)', '36W (XXL)'],
    inStock: true,
    stockCount: 60,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 118,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Tirupur Performance Knit Mills, Tamil Nadu'
  },
  {
    id: 'blue-duck-speed-stripe-track-13',
    name: 'Blue Duck® Retro Heavy French Terry Stripe Track Pants',
    slug: 'blue-duck-retro-heavy-french-terry-stripe-track-pants',
    category: 'trackpants',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Relaxed Loose',
    rise: 'Mid Rise',
    waistStyle: 'Thick Elasticated Drawstring Waist',
    stretch: '100% Heavy French Terry Cotton',
    fabricWeight: '380 GSM Heavyweight Terry',
    price: 2399,
    originalPrice: 2999,
    description: 'Heritage street track pants featuring bold sewn-on dual side tape stripes, deep straight leg cut, and heavy 380 GSM organic cotton knit with brushed interior warmth.',
    story: 'Inspired by iconic 90s football warmups and hip-hop culture, built for relaxed everyday swagger.',
    details: [
      '100% Heavy Combed Cotton French Terry',
      'Dual contrast sewn-on knitted athletic side tape',
      'Relaxed straight-leg cut with open bottom hem',
      'Metal aglet tipped heavyweight drawstrings'
    ],
    washes: [
      {
        name: 'Vintage Forest Green & Cream Stripe',
        colorHex: '#14532d',
        code: 'green-cream',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Midnight Navy & Crimson Stripe',
        colorHex: '#172554',
        code: 'navy-crimson',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Heather Athletic Grey & Black Stripe',
        colorHex: '#9ca3af',
        code: 'grey-black',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W (S)', '30W (M)', '32W (L)', '34W (XL)', '36W (XXL)'],
    inStock: true,
    stockCount: 42,
    rating: 4.83,
    reviewCount: 75,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Ludhiana Knitwear Mills, Punjab'
  },
  {
    id: 'blue-duck-junior-strike-track-14',
    name: 'Blue Duck® Junior Active Strike Tricot Track Pants (8–14Y)',
    slug: 'blue-duck-junior-active-strike-tricot-track-pants-8-14y',
    category: 'trackpants',
    ageGroup: 'junior-8-14',
    ageLabel: 'Ages 8–14 Yrs',
    targetAgeRange: '8 - 14 Years',
    gender: 'boys',
    fit: 'Slim Tapered',
    rise: 'Mid Rise',
    waistStyle: 'Ribbed Elastic with Internal Drawcord',
    stretch: '8% Multi-Flex Tricot',
    fabricWeight: '240 GSM Durable Tricot Knit',
    price: 1999,
    originalPrice: 2499,
    description: 'Durable sports track pants designed for junior football, cricket practice, physical education, and outdoor running. Smooth snag-resistant tricot knit with zip ankles.',
    story: 'Built to resist turf friction and grass stains while keeping junior athletes lightweight and quick.',
    details: [
      'Snag-resistant high-density tricot fabric',
      'Concealed zippered side pockets to keep keys and coins safe',
      'Zip expandable ankle hems for quick on/off over soccer cleats',
      'Growth elastic waistband'
    ],
    washes: [
      {
        name: 'Navy Blue & Neon Orange Stripe',
        colorHex: '#1e3a8a',
        code: 'navy-orange',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Jet Black with Redline Stripe',
        colorHex: '#09090b',
        code: 'black-redline',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Steel Grey with White Accent',
        colorHex: '#4b5563',
        code: 'steel-grey',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['8-9Y', '10-11Y', '12-13Y', '14-15Y'],
    inStock: true,
    stockCount: 50,
    isBestSeller: true,
    rating: 4.88,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Tirupur Sports Unit, Tamil Nadu'
  },
  {
    id: 'blue-duck-kids-warmup-track-15',
    name: 'Blue Duck® Little Boys Warm-Up Tricot Track Pants (3–7Y)',
    slug: 'blue-duck-little-boys-warm-up-tricot-track-pants-3-7y',
    category: 'trackpants',
    ageGroup: 'kids-3-7',
    ageLabel: 'Ages 3–7 Yrs',
    targetAgeRange: '3 - 7 Years',
    gender: 'boys',
    fit: 'Comfort Stretch',
    rise: 'Mid Rise',
    waistStyle: 'Extra-Soft Encased Elastic Waistband',
    stretch: '10% Multi-Flex Sport Knit',
    fabricWeight: '220 GSM Kid-Soft Tricot',
    price: 1999,
    originalPrice: 2399,
    description: 'Easy-pull-on sports track pants for little boys. Made with buttery-soft brushed tricot, contrast side race stripes, and stretchy ankle cuffs.',
    story: 'Gentle on sensitive skin with zero abrasive tags or harsh seams.',
    details: [
      '100% tagless comfort neck and waistband',
      'Double stitched seams resist playground scuffs',
      'Side slip pockets for little treasures',
      'Quick-drying and fade-resistant colors'
    ],
    washes: [
      {
        name: 'Cobalt Blue & Sunny Yellow Stripe',
        colorHex: '#2563eb',
        code: 'cobalt-yellow',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Jet Black & Crimson Red Stripe',
        colorHex: '#18181b',
        code: 'kids-black-red',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Forest Green & White Stripe',
        colorHex: '#15803d',
        code: 'forest-white',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    inStock: true,
    stockCount: 40,
    rating: 4.92,
    reviewCount: 68,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Kids Division, Mumbai'
  },

  // =========================================================================
  // 3. JOGGERS (HEAVYWEIGHT FLEECE, DENIM KNIT JOGGERS, CARGO JOGGERS)
  // =========================================================================
  {
    id: 'blue-duck-heavy-fleece-jogger-16',
    name: 'Blue Duck® Heavy 450GSM Organic French Terry Street Joggers',
    slug: 'blue-duck-heavy-450gsm-organic-french-terry-street-joggers',
    category: 'joggers',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Drop-Crotch Jogger',
    rise: 'Mid Rise',
    waistStyle: 'Ribbed Waistband with Heavy Cotton Aglet Cords',
    stretch: '100% Heavyweight Organic Cotton Terry',
    fabricWeight: '450 GSM Ultra-Heavy French Terry',
    price: 2299,
    originalPrice: 2899,
    description: 'Custom heavyweight 450GSM organic loopback cotton sweatpants featuring deep waterproof zipped side pockets, thick 2x2 ribbed ankle cuffs, and chunky custom drawstrings.',
    story: 'Heavy drape that holds its streetwear structure without sagging over daily sneaker wear.',
    details: [
      '100% GOTS Certified Organic Heavyweight Cotton',
      'Concealed waterproof zipped hand pockets & welt back pocket',
      'Heavy 2x2 ribbed ankle cuffs for crisp sneaker stacking',
      'Pre-washed and enzyme softened'
    ],
    washes: [
      {
        name: 'Pitch Matte Black',
        colorHex: '#18181b',
        code: 'pitch-black',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Heather Athletic Grey',
        colorHex: '#9ca3af',
        code: 'heather-grey',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Sage Olive Green',
        colorHex: '#4d7c0f',
        code: 'sage-olive',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Off-White Sand Dune',
        colorHex: '#e2e8f0',
        code: 'sand-dune',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W (S)', '30W (M)', '32W (L)', '34W (XL)', '36W (XXL)'],
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.93,
    reviewCount: 154,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Ludhiana Heavy Knit Mills, Punjab'
  },
  {
    id: 'blue-duck-indigo-knit-jogger-17',
    name: 'Blue Duck® Indigo Knit Denim Flex Cuffed Joggers',
    slug: 'blue-duck-indigo-knit-denim-flex-cuffed-joggers',
    category: 'joggers',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Cargo Jogger',
    rise: 'Mid Rise',
    waistStyle: 'Elastic Waist with Antique Brass Eyelets',
    stretch: '4% Multi-Flex Indigo Knit',
    fabricWeight: '320 GSM Hybrid Denim French Terry',
    price: 2399,
    originalPrice: 2999,
    description: 'The ultimate hybrid: authentic indigo denim twill look on the exterior with ultra-soft French terry loopback on the inside. Cuffed ankle taper designed for everyday travel and skate sessions.',
    story: 'Crafted using indigo rope-dyed yarn that fades authentically with wear just like rigid denim.',
    details: [
      'Hybrid denim-knit construction with 4% elastane stretch',
      'Side cargo utility pocket with metal button snap',
      'Elasticated waistband with braided rope drawstring',
      'Reinforced crotch gusset prevents seam tearing'
    ],
    washes: [
      {
        name: 'Deep Enzyme Indigo Wash',
        colorHex: '#1e3a8a',
        code: 'enzyme-indigo',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Acid Washed Grey Denim',
        colorHex: '#4b5563',
        code: 'acid-grey-jogger',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Jet Washed Black Denim',
        colorHex: '#18181b',
        code: 'jet-black-jogger',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 48,
    isNewArrival: true,
    rating: 4.87,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Facility, Mumbai'
  },
  {
    id: 'blue-duck-junior-cargo-jogger-18',
    name: 'Blue Duck® Junior Cargo Denim Knit Joggers (8–14Y)',
    slug: 'blue-duck-junior-cargo-denim-knit-joggers-8-14y',
    category: 'joggers',
    ageGroup: 'junior-8-14',
    ageLabel: 'Ages 8–14 Yrs',
    targetAgeRange: '8 - 14 Years',
    gender: 'boys',
    fit: 'Cargo Jogger',
    rise: 'Mid Rise',
    waistStyle: 'Growth Elastic Drawstring Waist',
    stretch: '3% Comfort Flex Stretch',
    fabricWeight: '290 GSM Soft Knit Denim',
    price: 2199,
    originalPrice: 2699,
    description: 'Combines dual cargo pockets with an elasticated ribbed ankle cuff and growth waistband. Built to withstand rough school playtime, climbing, and cycling.',
    story: 'No stiff buttons, just pure stretch comfort and cool streetwear cargo utility.',
    details: [
      '2 cargo flap pockets with velcro secure fasteners',
      'Reinforced knee stitching prevents rips',
      'Comfort flex waistband with thick drawcord',
      'Pre-washed for zero shrinkage'
    ],
    washes: [
      {
        name: 'Mid Indigo Wash',
        colorHex: '#3b82f6',
        code: 'mid-indigo-junior',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Dark Stretch Navy',
        colorHex: '#1e3a8a',
        code: 'dark-navy-junior',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Washed Black Denim',
        colorHex: '#18181b',
        code: 'black-junior-cargo',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['8-9Y', '10-11Y', '12-13Y', '14-15Y'],
    inStock: true,
    stockCount: 42,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 114,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Facility, Mumbai'
  },
  {
    id: 'blue-duck-kids-kneepatch-jogger-19',
    name: 'Blue Duck® Little Boys Ultra-Soft Knee-Patch Joggers (3–7Y)',
    slug: 'blue-duck-little-boys-ultra-soft-knee-patch-joggers-3-7y',
    category: 'joggers',
    ageGroup: 'kids-3-7',
    ageLabel: 'Ages 3–7 Yrs',
    targetAgeRange: '3 - 7 Years',
    gender: 'boys',
    fit: 'Comfort Stretch',
    rise: 'Mid Rise',
    waistStyle: 'Ribbed Elastic with Non-Slip Cotton Cord',
    stretch: '100% Ultra-Soft Brushed Cotton Fleece',
    fabricWeight: '280 GSM Baby-Soft Terry',
    price: 1999,
    originalPrice: 2499,
    description: 'Designed for crawling, playground slides, and all-day toddler adventures. Dual circular reinforced knee pads with super-soft cloud fleece interior.',
    story: 'Engineered by parents for parents: zero scratchy tags, quick pull-up elastic, and resilient knee protection.',
    details: [
      'Reinforced dual-layer round knee patches',
      'Buttery-soft organic cotton brushed loops',
      'Elasticated ankle cuffs stay above shoes',
      'Machine wash tested 50+ cycles'
    ],
    washes: [
      {
        name: 'Sky Blue Heather',
        colorHex: '#93c5fd',
        code: 'sky-heather',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Navy Denim Wash Knit',
        colorHex: '#1e3a8a',
        code: 'navy-knit',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Charcoal Asphalt Heather',
        colorHex: '#374151',
        code: 'charcoal-heather',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    inStock: true,
    stockCount: 55,
    rating: 4.96,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Kids Division, Mumbai'
  },

  // =========================================================================
  // 4. HALF PANTS / SHORTS (DENIM JORTS, TACTICAL CARGO SHORTS, SWEAT SHORTS)
  // =========================================================================
  {
    id: 'blue-duck-raw-hem-jorts-20',
    name: 'Blue Duck® 90s Raw-Hem Skater Baggy Denim Shorts (Jorts)',
    slug: 'blue-duck-90s-raw-hem-skater-baggy-denim-shorts-jorts',
    category: 'shorts',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Skater Baggy',
    rise: 'Mid Rise',
    waistStyle: 'Classic Button Fly with Belt Loops',
    stretch: '100% Rigid Heavy Cotton Denim',
    fabricWeight: '13.5 oz Vintage Denim',
    price: 1999,
    originalPrice: 2599,
    description: 'Trending 90s skater baggy denim half pants cut below the knee with an authentic hand-frayed raw hem and relaxed wide leg opening. The undisputed summer street staple.',
    story: 'Worn worldwide across skate parks, streetwear popups, and summer music festivals.',
    details: [
      '100% Vintage washed rigid cotton denim',
      'Raw cut hand-distressed fringe hem with stay-stitch preventer',
      'Wide roomy leg opening fits effortlessly over chunky skate shoes',
      'Signature Blue Duck® red leather backpatch and copper rivets'
    ],
    washes: [
      {
        name: 'Vintage Stonewash Light Blue',
        colorHex: '#60a5fa',
        code: 'stone-light-jorts',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Faded Charcoal Black',
        colorHex: '#18181b',
        code: 'faded-black-jorts',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Deep Raw Indigo',
        colorHex: '#1e3a8a',
        code: 'raw-indigo-jorts',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 50,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.91,
    reviewCount: 162,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Arvind Heritage Mills, Gujarat'
  },
  {
    id: 'blue-duck-tactical-cargo-shorts-21',
    name: 'Blue Duck® Ripstop Tactical 6-Pocket Cargo Half Pants',
    slug: 'blue-duck-ripstop-tactical-6-pocket-cargo-half-pants',
    category: 'shorts',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Tactical Cargo',
    rise: 'Mid Rise',
    waistStyle: 'Elastic Waist with Adjustable Webbing Belt',
    stretch: '2% High-Flex Ripstop Cotton',
    fabricWeight: '260 GSM Heavy Ripstop Twill',
    price: 2199,
    originalPrice: 2799,
    description: 'Rugged utility cargo shorts featuring 6 bellowed 3D pockets, heavy-duty military bartacks, integrated nylon webbing quick-release buckle belt, and reinforced seat panel.',
    story: 'Engineered for summer treks, college campus wear, and outdoor adventures in warm Indian weather.',
    details: [
      'Heavy-duty crosshatch tear-resistant ripstop cotton',
      'Built-in quick release tactical webbing belt included',
      '6 multi-compartment utility pockets with snap fasteners',
      'Relaxed straight leg cut'
    ],
    washes: [
      {
        name: 'Desert Khaki Sand',
        colorHex: '#bfa17c',
        code: 'desert-khaki-short',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Military Olive Drab',
        colorHex: '#365314',
        code: 'military-olive-short',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Stealth Blackout',
        colorHex: '#18181b',
        code: 'stealth-black-short',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    rating: 4.86,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Coimbatore Textile Mills, Tamil Nadu'
  },
  {
    id: 'blue-duck-street-sweat-shorts-22',
    name: 'Blue Duck® French Terry Street Graphic Sweat Shorts',
    slug: 'blue-duck-french-terry-street-graphic-sweat-shorts',
    category: 'shorts',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Relaxed Loose',
    rise: 'Mid Rise',
    waistStyle: 'Thick Elasticated Waist with Long Cotton Cord',
    stretch: '100% Breathable Combed Cotton French Terry',
    fabricWeight: '340 GSM Heavy Terry',
    price: 1999,
    originalPrice: 2499,
    description: 'Heavyweight organic French terry cotton sweat shorts featuring above-the-knee 7" inseam, deep zippered phone pockets, and subtle Blue Duck® scarlet puff print branding.',
    story: 'The effortless lounging and gym short for hot summer days.',
    details: [
      '340 GSM Organic French Terry with brushed backing',
      'Deep side pockets with concealed security zippers',
      'Heavy-gauge cotton drawstrings with metal tips',
      'Pre-shrunk to maintain shape wash after wash'
    ],
    washes: [
      {
        name: 'Midnight Pitch Black',
        colorHex: '#09090b',
        code: 'midnight-black-short',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Heather Ash Grey',
        colorHex: '#9ca3af',
        code: 'ash-grey-short',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Washed Pine Green',
        colorHex: '#14532d',
        code: 'pine-green-short',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W (S)', '30W (M)', '32W (L)', '34W (XL)', '36W (XXL)'],
    inStock: true,
    stockCount: 58,
    isNewArrival: true,
    rating: 4.88,
    reviewCount: 72,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Ludhiana Heavy Knit Mills, Punjab'
  },
  {
    id: 'blue-duck-junior-denim-shorts-23',
    name: 'Blue Duck® Junior Multi-Pocket Stretch Denim Shorts (8–14Y)',
    slug: 'blue-duck-junior-multi-pocket-stretch-denim-shorts-8-14y',
    category: 'shorts',
    ageGroup: 'junior-8-14',
    ageLabel: 'Ages 8–14 Yrs',
    targetAgeRange: '8 - 14 Years',
    gender: 'boys',
    fit: 'Comfort Stretch',
    rise: 'Mid Rise',
    waistStyle: 'Inner Adjustable Elastic Button-Tab Waist',
    stretch: '3% Power Stretch Denim',
    fabricWeight: '11.5 oz Flexible Summer Denim',
    price: 1999,
    originalPrice: 2499,
    description: 'Tailored for growing junior boys with hidden internal button-hole waistband adjusters. Built with double-stitched seams and 3% power stretch for bike riding and summer sports.',
    story: 'No tight waistband issues: expands easily as boys grow over the summer vacation.',
    details: [
      'Growth adjuster buttonhole elastic concealed inside waistband',
      'Reinforced side and back pockets with bar-tack stitching',
      'Soft enzyme washed denim for immediate broken-in comfort',
      'Comfortable knee-length hemline'
    ],
    washes: [
      {
        name: 'Ocean Wave Indigo',
        colorHex: '#2563eb',
        code: 'ocean-wave-short',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Jet Black Stretch Denim',
        colorHex: '#18181b',
        code: 'black-stretch-short',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Vintage Sand Distressed',
        colorHex: '#60a5fa',
        code: 'sand-distressed-short',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['8-9Y', '10-11Y', '12-13Y', '14-15Y'],
    inStock: true,
    stockCount: 46,
    isBestSeller: true,
    rating: 4.89,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Facility, Mumbai'
  },
  {
    id: 'blue-duck-kids-play-shorts-24',
    name: 'Blue Duck® Little Boys Elastic Drawstring Play Half Pants (3–7Y)',
    slug: 'blue-duck-little-boys-elastic-drawstring-play-half-pants-3-7y',
    category: 'shorts',
    ageGroup: 'kids-3-7',
    ageLabel: 'Ages 3–7 Yrs',
    targetAgeRange: '3 - 7 Years',
    gender: 'boys',
    fit: 'Comfort Stretch',
    rise: 'Mid Rise',
    waistStyle: 'Ribbed Elastic Pull-On Waist with Drawcord',
    stretch: '4% Super-Flex Cotton Twill',
    fabricWeight: '200 GSM Lightweight Summer Twill',
    price: 1999,
    originalPrice: 2399,
    description: 'Easy-on pull-up half pants for little toddlers and young boys. Scratch-free cotton twill with deep front pockets and comfortable elastic waistband for diaper and potty independence.',
    story: 'Engineered for beach days, park play, and summer nursery school.',
    details: [
      '100% pinch-free elastic waistband with functioning tie cord',
      'Super-soft cotton pockets for shells, rocks, and small toys',
      'Double-stitched crotch and hem seams prevent splitting',
      'Colorfast wash resistant to chlorine and saltwater'
    ],
    washes: [
      {
        name: 'Royal Blue Stretch Denim',
        colorHex: '#1d4ed8',
        code: 'royal-blue-kids-short',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Khaki Sand Twill',
        colorHex: '#d97706',
        code: 'khaki-sand-kids-short',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Olive Camo Print',
        colorHex: '#3f6212',
        code: 'olive-camo-kids-short',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    inStock: true,
    stockCount: 52,
    rating: 4.94,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Avon Arts Mahim Kids Division, Mumbai'
  },

  // =========================================================================
  // 5. TACTICAL CARGOS & SMART CHINOS
  // =========================================================================
  {
    id: 'blue-duck-parachute-cargo-25',
    name: 'Blue Duck® Multi-Pocket Tactical Parachute Cargos',
    slug: 'blue-duck-multi-pocket-tactical-parachute-cargos',
    category: 'cargos',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Tactical Cargo',
    rise: 'Mid Rise',
    waistStyle: 'Elastic Waist with Interior Braided Drawcord',
    stretch: '2% High-Flex Stretch',
    fabricWeight: '280 GSM Cotton Ripstop Twill',
    price: 2599,
    originalPrice: 3299,
    description: 'High-utility streetwear parachute cargo pants engineered with 6 3D bellowed utility pockets, knee pleats for maximum range of motion, and bungee cinch cords at ankles for customizable baggy or jogger silhouette.',
    story: 'The signature bottom for street culture, college hangouts, and concert fits.',
    details: [
      '98% Ripstop Cotton with 2% Elastane Flex',
      '6 Multi-compartment military utility flap pockets',
      'Adjustable toggle drawstring cuffs at ankles',
      'Heavy-duty bartack reinforcement on pocket corners',
      'Comfort waistband with interior braided drawcord'
    ],
    washes: [
      {
        name: 'Matte Olive Drab',
        colorHex: '#38462b',
        code: 'olive-drab',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Stealth Blackout',
        colorHex: '#18181b',
        code: 'stealth-black',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Desert Khaki',
        colorHex: '#bfa17c',
        code: 'desert-khaki',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Asphalt Concrete Grey',
        colorHex: '#475569',
        code: 'asphalt-grey',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 46,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.88,
    reviewCount: 125,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Coimbatore Textile Mills, Tamil Nadu'
  },
  {
    id: 'blue-duck-smart-taper-chino-26',
    name: 'Blue Duck® Peached Cotton Smart Tapered Chinos',
    slug: 'blue-duck-peached-cotton-smart-tapered-chinos',
    category: 'chinos',
    ageGroup: 'teens-15-25',
    ageLabel: 'Ages 15–25 Yrs',
    targetAgeRange: '15 - 25 Years',
    gender: 'boys',
    fit: 'Smart Chino',
    rise: 'Mid Rise',
    waistStyle: 'Zipper Fly with Dual Button Belt Loops',
    stretch: '2% High-Flex Mechanical Stretch',
    fabricWeight: '250 GSM Luxury Peached Twill',
    price: 2199,
    originalPrice: 2799,
    description: 'Tailored slim-tapered chinos made with ultra-soft peached cotton twill and 4-way mechanical stretch. Ideal for formal college presentations, family functions, parties, and smart-casual outings.',
    story: 'The clean transition bottom when you need to level up your look without losing stretch comfort.',
    details: [
      '98% Peached Fine Cotton, 2% Lycra Flex',
      'Slash front trouser pockets & buttoned welt back pockets',
      'Non-restrictive comfort waistband lining',
      'Wrinkle-resistant resin finish',
      'Clean 7" bottom ankle opening'
    ],
    washes: [
      {
        name: 'Classic British Khaki',
        colorHex: '#c2a688',
        code: 'british-khaki',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Navy Blue Formal',
        colorHex: '#1e3a8a',
        code: 'navy-formal',
        image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Charcoal Slate',
        colorHex: '#334155',
        code: 'slate-grey',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Ivory Cream White',
        colorHex: '#f1f5f9',
        code: 'ivory-cream',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    sizes: ['28W', '30W', '32W', '34W', '36W'],
    inStock: true,
    stockCount: 50,
    rating: 4.79,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=80'
    ],
    millOrigin: 'Vardhman Textiles, Punjab, India'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'blue-duck-selvedge-baggy-01',
    userId: 'user-01',
    userName: 'Karan Sharma',
    rating: 5,
    fitFeedback: 'True to Size',
    childAge: '19 Years Old (College)',
    title: 'Top-tier selvedge denim in India!',
    comment: 'The 14.5oz selvedge denim is super rigid and heavy. The baggy drape over my Jordan sneakers is flawless. Woven in India by Avon Arts Mahim, the quality beats international brands easily.',
    verifiedBuyer: true,
    helpfulCount: 38,
    createdAt: '2026-07-28T14:20:00Z'
  },
  {
    id: 'rev-02',
    productId: 'blue-duck-kids-doubleknee-10',
    userId: 'user-02',
    userName: 'Pooja Mehta',
    rating: 5,
    fitFeedback: 'Runs Roomy',
    childAge: 'Bought for 5 yr old boy',
    title: 'Reinforced knees saved his pants!',
    comment: 'My son plays cricket and crawls on concrete. Normal jeans tear in 2 weeks, but this Blue Duck double-knee has lasted 3 months with zero holes. Elastic waist is super easy for him.',
    verifiedBuyer: true,
    helpfulCount: 45,
    createdAt: '2026-08-02T10:15:00Z'
  },
  {
    id: 'rev-03',
    productId: 'blue-duck-protech-track-12',
    userId: 'user-03',
    userName: 'Rohan Deshmukh',
    rating: 5,
    fitFeedback: 'True to Size',
    childAge: '17 Years Old (Football Player)',
    title: 'Best track pants for gym & outdoor sports',
    comment: 'The poly-spandex fabric stretches in all directions and the zippered pockets keep my phone totally still while running sprints. Very systematic fit and high finish.',
    verifiedBuyer: true,
    helpfulCount: 29,
    createdAt: '2026-08-10T16:45:00Z'
  }
];

export interface Product {
  id: string;
  name: string;
  category: 'Displays' | 'Mobile' | 'Audio' | 'Capture' | 'Wearables';
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  specs: { [key: string]: string };
  features: string[];
  colors: { name: string; hex: string }[];
  isAvailable: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'display-32',
    name: 'Z-Monitor Pro 32"',
    category: 'Displays',
    tagline: 'Infinite Depth. Zero Bezels.',
    description: 'A masterpiece of desktop visualization. Features a breathtaking 32-inch 4K OLED panel with deep black representation, professional-grade 99% DCI-P3 color calibration, and a ultra-thin matte metal housing.',
    price: 1299,
    rating: 4.9,
    reviews: 142,
    specs: {
      'Resolution': '3840 x 2160 (4K UHD)',
      'Panel Type': 'OLED (120Hz)',
      'Brightness': '1000 nits peak',
      'Contrast Ratio': '1,500,000:1',
      'Connectivity': 'Thunderbolt 4, HDMI 2.1, DP 1.4'
    },
    features: [
      'Pro-Calibrated Color out of the box',
      'True Black OLED display layer',
      'Ultra-thin 4.8mm aluminum chassis',
      'Integrated cable management dock'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' },
      { name: 'Titanium Gray', hex: '#333333' }
    ],
    isAvailable: true
  },
  {
    id: 'tablet-11',
    name: 'Z-Pad Fluid 11"',
    category: 'Mobile',
    tagline: 'Your Canvas. Without Borders.',
    description: 'High-performance ultra-thin tablet powered by the Z-Chip Gen 2. Featuring support for responsive stylus input, dynamic 120Hz refresh rate, and an elegant matte finish back.',
    price: 799,
    rating: 4.8,
    reviews: 215,
    specs: {
      'Display': '11" Liquid Retina Pro (120Hz)',
      'Processor': 'Z-Chip Gen 2 (8-Core)',
      'Storage': '256GB / 512GB / 1TB',
      'Battery Life': 'Up to 11 hours',
      'Weight': '465 grams'
    },
    features: [
      'Stitch-free magnetic stylus attachment',
      'Pro-grade drawing surface coating',
      'Four-speaker symmetric spatial audio',
      'Thunderbolt high-speed charging support'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' },
      { name: 'Graphite Blue', hex: '#1d222d' }
    ],
    isAvailable: true
  },
  {
    id: 'phone-apex',
    name: 'Z-Phone Apex',
    category: 'Mobile',
    tagline: 'Sculpted in Solid Titanium.',
    description: 'The pinnacle of handheld engineering. Wrapped in grade-5 dark titanium alloy with an anti-reflective satin finish. Equipped with a custom 3-lens cinematic camera module and hardware-accelerated ray tracing.',
    price: 1099,
    rating: 4.9,
    reviews: 584,
    specs: {
      'Display': '6.7" OLED (1-120Hz LTPO)',
      'Processor': 'Z-Titan Multi-Thread',
      'Main Camera': '48MP Triple-Sensor with OIS',
      'Battery': '4800mAh with super-fast charge',
      'Water Resistance': 'IP68 rating'
    },
    features: [
      'Solid grade-5 titanium frame',
      'Nanocrystal anti-reflective display glass',
      'Custom programmable physical sidebar key',
      'Secure facial keyless authentication'
    ],
    colors: [
      { name: 'Satin Slate', hex: '#23252a' },
      { name: 'Matte Obsidian', hex: '#111111' }
    ],
    isAvailable: true
  },
  {
    id: 'camera-dslr',
    name: 'Z-Lens DSLR Master',
    category: 'Capture',
    tagline: 'Capture Light in its Purest Form.',
    description: 'A revolutionary hybrid medium-format mirrorless camera designed for both cinematographers and studio portrait artists. Incorporates a high-sensitivity 61MP sensor with exceptional wide dynamic range.',
    price: 2499,
    rating: 4.9,
    reviews: 86,
    specs: {
      'Sensor': '61.2MP Full-Frame Back-Illuminated',
      'ISO Range': '50 - 102400',
      'Video Resolution': '8K RAW at 30 fps / 4K at 120 fps',
      'Stabilization': '5-axis active in-body OIS',
      'Lens Mount': 'Z-Universal Mount'
    },
    features: [
      'Dual Native ISO for noise-free night capture',
      'AI-based real-time object tracking autofocus',
      'Satin rubberized tactile ergonomic grip',
      'Dual CFexpress high-speed card slots'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' }
    ],
    isAvailable: true
  },
  {
    id: 'headphones-pro',
    name: 'Z-Acoustics Wireless',
    category: 'Audio',
    tagline: 'Pure Silence. Pure Acoustics.',
    description: 'Immersive audiophile over-ear headphones. Tailored with custom-engineered 45mm neodymium drivers, active hybrid noise-cancellation that dampens up to 45dB, and ultra-comfortable memory foam ear cushions.',
    price: 349,
    rating: 4.7,
    reviews: 312,
    specs: {
      'Driver Size': '45mm custom dynamic',
      'Frequency Response': '4Hz - 40,000Hz (Hi-Res Audio)',
      'Noise Cancelling': 'Hybrid Adaptive ANC',
      'Battery Life': 'Up to 50 hours (ANC on)',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm bypass'
    },
    features: [
      'Adaptive sound-stage leveling',
      'Hypoallergenic magnetic memory foam cushions',
      'Lossless codec support (LDAC, AAC)',
      'Integrated touch controls on outer earcups'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' },
      { name: 'Deep Plum', hex: '#2a1a30' }
    ],
    isAvailable: true
  },
  {
    id: 'speaker-cylinder',
    name: 'Z-Voice Cylinder',
    category: 'Audio',
    tagline: 'Sound that Fills the Room.',
    description: 'Sleek, cylindrical smart speaker featuring 360-degree acoustic projection, integrated passive subwoofers for physical bass, and instant multi-room pairing over high-fidelity Wi-Fi.',
    price: 249,
    rating: 4.6,
    reviews: 189,
    specs: {
      'Audio Channels': '360° Omnidirectional with 5 drivers',
      'Smart Assistant': 'Z-Voice Assistant Enabled',
      'Wireless': 'Wi-Fi 6E & Bluetooth 5.2',
      'Dimensions': '21cm height, 9.5cm diameter',
      'Power Source': 'AC Adapter or 8-Hour battery bypass'
    },
    features: [
      'Acoustic environment auto-tuning',
      'Multi-room synchronized audio broadcasting',
      'Textured satin acoustic mesh cover',
      'Top-mounted touch controls with breathing status ring'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' },
      { name: 'Warm Charcoal', hex: '#2d2d30' }
    ],
    isAvailable: true
  },
  {
    id: 'micro-studio',
    name: 'Z-Microphone Studio',
    category: 'Capture',
    tagline: 'Studio Condenser. Studio Precision.',
    description: 'A professional USB condenser microphone designed for podcasters, vocalists, and stream broadcasting. Employs a custom triple-capsule array for pure capturing clarity across four polar patterns.',
    price: 199,
    rating: 4.8,
    reviews: 153,
    specs: {
      'Capsules': '3 x 14mm custom condenser capsules',
      'Polar Patterns': 'Cardioid, Omnidirectional, Bidirectional, Stereo',
      'Sample Rate': '96kHz / 24-bit studio response',
      'Controls': 'Gain control, Mute key, Headphone volume',
      'Connection': 'USB Type-C (Zero-latency monitoring)'
    },
    features: [
      'Zero-latency 3.5mm monitor jack',
      'Custom solid steel heavy desktop stand',
      'Integrated internal wind-pop shielding',
      'Quick-press capacitive indicator mute'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' }
    ],
    isAvailable: true
  },
  {
    id: 'watch-chrono',
    name: 'Z-Watch Chrono',
    category: 'Wearables',
    tagline: 'Intelligent Health. Timeless Precision.',
    description: 'The elegant smartwatch built for peak physical awareness. Outfitted with high-precision optical sensors, ECG monitoring, sleep-stage diagnostics, and structured workouts tracking inside a classic circle shape.',
    price: 299,
    rating: 4.7,
    reviews: 420,
    specs: {
      'Display': '1.43" AMOLED (60Hz Always-On)',
      'Casing': 'Satin black aircraft-grade aluminum',
      'Sensors': 'PPG, ECG, SpO2, Temperature, 3-Axis Gyro',
      'Battery life': 'Up to 7 days smart mode',
      'Water Rating': '5 ATM (swim-proof)'
    },
    features: [
      'Medical-grade heart activity logs (ECG)',
      'Dual-frequency GPS route mapping',
      'Over 120 automated fitness training profiles',
      'Breathable athletic silicone strap'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' },
      { name: 'Plum Horizon', hex: '#341f3d' }
    ],
    isAvailable: true
  },
  {
    id: 'buds-pro',
    name: 'Z-Buds Pro',
    category: 'Audio',
    tagline: 'Hear Nothing but Perfect Audio.',
    description: 'Compact true wireless earbuds with exceptional physical stability, smart touch gestures, and a pocketable wireless charging case that provides up to 30 hours of continuous playback.',
    price: 179,
    rating: 4.6,
    reviews: 288,
    specs: {
      'Driver': '11mm ultra-wide graphene',
      'Noise Control': 'Active Isolation ANC',
      'Water Rating': 'IPX4 earbud splash defense',
      'Charging': 'Qi Wireless & USB-C fast power',
      'Ear Tips': 'Liquid silicone (3 sizes)'
    },
    features: [
      'Automated in-ear wear tracking',
      'Ambient sound pass-through toggle',
      'Smart dual-device seamless transition',
      'Satin finished slide charging case'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111111' }
    ],
    isAvailable: true
  },
  {
    id: 'ring-aura',
    name: 'Z-Ring Aura',
    category: 'Wearables',
    tagline: 'Ultimate Tracking. Invisible Form.',
    description: 'A revolutionary smart ring forged in aerospace titanium. Tracks sleeping patterns, body temperature, cardiovascular metrics, and daily energy reserves with absolute comfort, entirely without screens.',
    price: 299,
    rating: 4.8,
    reviews: 95,
    specs: {
      'Material': 'Aerospace Grade Titanium with DLC coating',
      'Weight': 'Less than 3.5 grams',
      'Sensors': 'Infrared PPG, NTC temperature sensor, accelerometer',
      'Battery Life': 'Up to 6 days charge',
      'Water Rating': '100m water immersion proof'
    },
    features: [
      'Zero-emission screenless bio-tracking',
      'Dynamic readiness state calculations',
      'Hypoallergenic smooth inner resin',
      'Sleek inductive docking cradle charger'
    ],
    colors: [
      { name: 'Polished Titanium', hex: '#6366f1' },
      { name: 'Satin Obsidian', hex: '#111111' }
    ],
    isAvailable: true
  }
];

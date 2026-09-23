export interface Product {
  id: string;
  name: string;
  category: 'steel' | 'wood' | 'chairs' | 'tables' | 'beds' | 'sofas' | 'custom';
  categories: Array<'steel' | 'wood' | 'chairs' | 'tables' | 'beds' | 'sofas' | 'custom'>;
  material: string;
  dimensions: string;
  description: string;
  detailedSpecs: string[];
  finishes: string[];
  sizes: string[];
  image: string;
  additionalImages?: string[];
  inStockBadge?: string;
}

export interface CategoryInfo {
  id: 'steel' | 'wood' | 'chairs' | 'tables' | 'beds' | 'sofas' | 'custom';
  name: string;
  subtitle: string;
  description: string;
  image: string;
  itemCountLabel: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'steel',
    name: 'STEEL FURNITURE',
    subtitle: 'Built for Maximum Durability',
    description: 'Precision welded, heavy-gauge steel framing with corrosion-resistant powder-coated finishing.',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Heavy-Duty & Weather-Ready',
  },
  {
    id: 'wood',
    name: 'WOOD FURNITURE',
    subtitle: 'Timeless Natural Beauty',
    description: 'Master-crafted hardwood and premium seasoned timber with rich grain finishes and mortise-tenon joinery.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Warm Hardwood Heritage',
  },
  {
    id: 'chairs',
    name: 'CHAIRS',
    subtitle: 'Ergonomic & Structural',
    description: 'Dining chairs, accent armchairs, barstools, and industrial office seating built for everyday heavy use.',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Indoor & Commercial',
  },
  {
    id: 'tables',
    name: 'TABLES',
    subtitle: 'Centerpieces of Strength',
    description: 'Dining tables, coffee tables, boardroom desks, and patio sets featuring steel bases and solid timber tops.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Custom Lengths & Widths',
  },
  {
    id: 'beds',
    name: 'BEDS',
    subtitle: 'Reinforced Sleep Engineering',
    description: 'Reinforced tubular steel beds, solid timber frames, and hybrid headboards engineered never to squeak or sag.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Single to King Sizes',
  },
  {
    id: 'sofas',
    name: 'SOFAS',
    subtitle: 'Industrial Comfort',
    description: 'Heavy steel and structural wood framed couches with high-density foam and weather-durable upholstery.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Modular & Custom Seating',
  },
  {
    id: 'custom',
    name: 'CUSTOM FURNITURE',
    subtitle: 'Your Idea, Our Craftsmanship',
    description: 'Bespoke designs fabricated to exact architectural drawings, photos, or room dimensions.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    itemCountLabel: 'Made to Measurement',
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'modern-steel-chair',
    name: 'Modern Steel Chair',
    category: 'chairs',
    categories: ['chairs', 'steel'],
    material: 'High-Tensile Tubular Steel & Baked Powder Coat',
    dimensions: '45cm W x 52cm D x 85cm H (Seat Height: 46cm)',
    description: 'Contemporary minimalist chair fabricated from reinforced steel tubing. Finished in scratch-resistant satin black powder coat, ideal for dining spaces, cafes, and outdoor patios.',
    detailedSpecs: [
      '25mm heavy gauge carbon steel frame',
      'Smooth argon gas welded joints without visible slag',
      'Dual layer anti-rust primer + exterior powder coat',
      'Non-marking heavy-duty rubber floor glides',
      'Tested to support 200kg static load',
    ],
    finishes: ['Matte Textured Black', 'Charcoal Gunmetal', 'Industrial Raw Steel Clear-Coat', 'Bronze Patina'],
    sizes: ['Standard Dining', 'Counter Bar Height (65cm)', 'High Bar Stool (75cm)'],
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Fast Workshop Turnaround',
  },
  {
    id: 'steel-dining-table',
    name: 'Steel Dining Table',
    category: 'tables',
    categories: ['tables', 'steel'],
    material: 'Heavy Box Steel Base with Solid Plate or Inset Top',
    dimensions: '200cm L x 100cm W x 76cm H (Seats 8)',
    description: 'Commanding industrial dining centerpiece featuring robust rectangular steel legs and a structural bridge beam. Engineered to remain rock-solid for decades in family homes and busy restaurants.',
    detailedSpecs: [
      '60x40mm box section structural steel construction',
      'Reinforced perimeter frame to prevent warping',
      'Electrostatic powder coating resistant to spills and scratches',
      'Integrated leveling feet for uneven tile or stone floors',
      'Available with steel top or prepared for timber/granite tops',
    ],
    finishes: ['Matte Black', 'Brushed Metallic Graphite', 'Industrial Charcoal', 'White Epoxy'],
    sizes: ['6 Seater (160 x 90 cm)', '8 Seater (200 x 100 cm)', '10 Seater (240 x 110 cm)', 'Custom Dimensions'],
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Top Seller',
  },
  {
    id: 'steel-frame-bed',
    name: 'Steel Frame Bed',
    category: 'beds',
    categories: ['beds', 'steel'],
    material: 'Industrial Heavy-Duty Structural Steel',
    dimensions: 'Queen (152cm x 188cm) / King (183cm x 188cm)',
    description: 'Uncompromising strength meets clean modern lines. Engineered with heavy tubular pillars, reinforced cross-beams, and rigid steel slats so your mattress gets optimal support without any creaking or bowing.',
    detailedSpecs: [
      'Reinforced 50mm corner support posts',
      'Zero-squeak bolt-locking corner brackets',
      'Close-spaced rigid steel support slats (no box spring required)',
      'Central spine support with twin stabilizing ground legs',
      'Underbed storage clearance: 30cm',
    ],
    finishes: ['Matte Black Steel', 'Dark Pewter', 'Vintage Hammered Bronze', 'Architectural Charcoal'],
    sizes: ['Single (91x188cm)', 'Three Quarter (107x188cm)', 'Double (137x188cm)', 'Queen (152x188cm)', 'King (183x188cm)'],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Built for Strength',
  },
  {
    id: 'steel-sofa',
    name: 'Steel Sofa',
    category: 'sofas',
    categories: ['sofas', 'steel'],
    material: 'Heavy Box Steel Frame with High-Density Weatherproof Cushions',
    dimensions: '220cm W x 88cm D x 78cm H (3 Seater)',
    description: 'An architectural statement piece combining raw industrial steel framework with plush, premium deep-seated cushions. Suitable for contemporary lounges, verandas, executive suites, and luxury lodges.',
    detailedSpecs: [
      'TIG-welded square steel profile structure',
      'Treated anti-corrosion coating for indoor or semi-outdoor use',
      'High-resilience foam core with supportive fiber wrap',
      'Removable, heavy-duty washable upholstery covers',
      'Wide steel armrests that double as beverage ledges',
    ],
    finishes: ['Industrial Black Frame', 'Raw Steel Clear Coat', 'Deep Graphite'],
    sizes: ['Single Armchair', '2-Seater Loveseat', '3-Seater Sofa', 'L-Shaped Sectional'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Signature Design',
  },
  {
    id: 'wooden-dining-table',
    name: 'Wooden Dining Table',
    category: 'tables',
    categories: ['tables', 'wood'],
    material: 'Kiln-Dried Hardwood Timber & Polyurethane Sealant',
    dimensions: '210cm L x 95cm W x 76cm H',
    description: 'Hand-crafted from selected solid hardwood timber showcasing deep organic grain patterns and natural warmth. Finished with a tough satin heat-and-stain resistant protective clear coat.',
    detailedSpecs: [
      'Solid 45mm thick timber slab tabletop',
      'Precision dowel and mortise joinery for thermal expansion',
      'Sanded through 5 grit stages for silk-smooth hand feel',
      'Moisture-cured protective sealant resistant to hot dish rings',
      'Heavy turned or straight timber pedestal legs',
    ],
    finishes: ['Natural Honey Teak', 'Dark Walnut Stain', 'Golden Mukwa', 'Rich Mahogany', 'Weathered Antique Oak'],
    sizes: ['4 Seater (140 x 90 cm)', '6 Seater (180 x 90 cm)', '8 Seater (220 x 100 cm)', '10-12 Seater Banquet'],
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Handcrafted',
  },
  {
    id: 'wooden-chair',
    name: 'Wooden Chair',
    category: 'chairs',
    categories: ['chairs', 'wood'],
    material: 'Solid Hardwood Frame with Contoured Ergonomic Backrest',
    dimensions: '48cm W x 54cm D x 88cm H',
    description: 'A masterclass in traditional carpentry. Designed with an ergonomically carved backrest and reinforced corner gussets that guarantee years of wobble-free service.',
    detailedSpecs: [
      'Solid kiln-dried timber components',
      'Interlocking glued and screwed corner blocks',
      'Sculpted seat contour for natural pressure relief',
      'Silky smooth protective wax-poly topcoat',
      'Fitted with felt base pads',
    ],
    finishes: ['Natural Teak', 'Deep Chestnut', 'Warm Mahogany', 'Ebony Stain'],
    sizes: ['Standard Dining', 'High-Back Dining', 'Armchair Carver Style'],
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Classic Comfort',
  },
  {
    id: 'wooden-bed',
    name: 'Wooden Bed',
    category: 'beds',
    categories: ['beds', 'wood'],
    material: 'Solid Hardwood Timber with Reinforced Slat Foundation',
    dimensions: 'King Size (183cm x 188cm) / Queen Size (152cm x 188cm)',
    description: 'Substantial, heirloom-quality solid wood bed with a high paneled headboard and massive timber legs. Brings natural warmth, presence, and quiet tranquility to any bedroom sanctuary.',
    detailedSpecs: [
      'Thick solid hardwood headboard and footboard posts',
      'Heavy-duty cast metal interlocking bed hooks',
      'Planed 22mm pine support slats spaced for air circulation',
      'Dual central spine beams with floor support studs',
      'Multi-coat hand-rubbed finish highlighting natural wood grain',
    ],
    finishes: ['Natural Mukwa', 'Dark Walnut', 'Golden Honey Teak', 'Espresso Charcoal'],
    sizes: ['Single', 'Three Quarter', 'Double', 'Queen', 'King', 'Super King (200x200cm)'],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Solid Hardwood',
  },
  {
    id: 'wooden-coffee-table',
    name: 'Wooden Coffee Table',
    category: 'tables',
    categories: ['tables', 'wood'],
    material: 'Natural Hardwood Slab with Storage Shelf',
    dimensions: '120cm L x 65cm W x 45cm H',
    description: 'Low-profile solid wood coffee table built with a generous tabletop and an integrated lower slatted shelf for magazines, books, and living room essentials.',
    detailedSpecs: [
      'Solid timber edge-glued construction for dimensional stability',
      'Smooth chamfered edges safe for kids and pets',
      'Spacious lower storage slatted tier',
      'Water and alcohol resistant protective coat',
    ],
    finishes: ['Natural Teak', 'Dark Mocha', 'Warm Amber', 'Vintage White Wash'],
    sizes: ['Square (90x90cm)', 'Rectangular (120x65cm)', 'Extended (140x70cm)'],
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Popular Living Room',
  },
  {
    id: 'custom-steel-and-wood-table',
    name: 'Custom Steel & Wood Table',
    category: 'custom',
    categories: ['custom', 'steel', 'wood', 'tables'],
    material: 'Industrial Box Steel Underframe + Solid Hardwood Planks',
    dimensions: 'Built to Custom Specifications (e.g. 240cm x 110cm)',
    description: 'The ultimate synthesis of Boss Gee craftsmanship: rugged architectural steel undercarriage paired with the rich, inviting warmth of seasoned solid hardwood. Custom fabricated to your exact room size.',
    detailedSpecs: [
      'Heavy 80x40mm laser-cut or mitered steel A-frame / Spider-frame / X-frame',
      'Solid 45mm thick timber top secured with slotted expansion fasteners',
      'Black powder-coated base with contrasting oiled hardwood timber',
      'Available with cable management cutouts for boardroom or home office use',
      'Tailored matching steel & wood benches available on request',
    ],
    finishes: ['Matte Black + Mukwa Hardwood', 'Charcoal Steel + Teak Hardwood', 'Brushed Metal + Walnut Hardwood'],
    sizes: ['Custom Tailored to Your Measurements (Send Size in Quote)'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80',
    ],
    inStockBadge: 'Hybrid Masterpiece',
  },
];

export const STEEL_FEATURES = [
  {
    title: 'Strong Frames',
    description: 'Constructed from heavy-gauge structural steel tubes and box sections that will never bend, splinter, or degrade.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Quality Welding',
    description: 'Precision MIG and TIG welding done by seasoned artisans, seamlessly ground for clean, flawless junction lines.',
    icon: 'Flame',
  },
  {
    title: 'Durable Construction',
    description: 'Engineered for high-traffic environments, commercial hospitality, schools, clinics, and demanding households.',
    icon: 'Hammer',
  },
  {
    title: 'Smooth Finishing',
    description: 'Multi-stage shot blasting followed by electrostatic powder coating baked to an ultra-resilient satin or matte touch.',
    icon: 'Sparkles',
  },
  {
    title: 'Custom Measurements',
    description: 'Need a non-standard length, specific ceiling clearance, or compact footprint? We build to your exact dimensions.',
    icon: 'Ruler',
  },
  {
    title: 'Custom Designs',
    description: 'From contemporary geometric profiles to ornate ironwork, bring your reference image and we forge it to life.',
    icon: 'Layers',
  },
];

export const WOOD_FEATURES = [
  {
    title: 'Natural Wood',
    description: 'We source quality timber with authentic grain patterns, character knots, and rich natural organic warmth.',
    icon: 'TreePine',
  },
  {
    title: 'Strong Construction',
    description: 'Built with proven joinery methods that allow the timber to breathe through seasonal weather without splitting.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Quality Finishing',
    description: 'Silky multi-layer sanding, rich stain enhancement, and durable polyurethane protective coats against moisture.',
    icon: 'Sparkles',
  },
  {
    title: 'Custom Designs',
    description: 'Traditional carved details, clean mid-century modern angles, or minimalist rustic farmhouse aesthetics.',
    icon: 'PenTool',
  },
  {
    title: 'Custom Sizes',
    description: 'Tables built to seat 4, 6, 8, 12 or more. Desks and beds calibrated perfectly for your available floor space.',
    icon: 'Maximize',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'CUSTOM DESIGNS',
    desc: 'Every home and office has unique dimensions. We craft furniture tailored to your exact floor plan, color palette, and preferred style.',
  },
  {
    title: 'QUALITY MATERIALS',
    desc: 'Only solid hardwoods, heavy-gauge steel, certified welding electrodes, and premium sealants make it into our workshop.',
  },
  {
    title: 'STRONG CONSTRUCTION',
    desc: 'Engineered for real life. Our joints are reinforced, our steel frames are load-tested, and our structures are built to last for generations.',
  },
  {
    title: 'PROFESSIONAL FINISHING',
    desc: 'Smooth seams, zero sharp edges, anti-rust coatings, and hand-rubbed wood finishes that feel luxurious to the touch.',
  },
  {
    title: 'STEEL & WOOD EXPERTISE',
    desc: 'Masters of both worlds. We know how metal and timber interact, enabling striking hybrid pieces that cannot be made by metal-only or wood-only shops.',
  },
  {
    title: 'PERSONALISED SERVICE',
    desc: 'Direct communication with the artisans building your piece. Receive progress updates and fast responses via WhatsApp and phone.',
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    author: 'T. Moyo',
    location: 'Harare (Borrowdale)',
    project: 'Custom 10-Seater Steel & Wood Dining Table',
    quote: 'The craftsmanship on our dining table is exceptional. The steel frame is rock-solid and the wood finish is smooth and stunning. Boss Gee was easy to reach on WhatsApp and delivered on time.',
    date: 'February 2026',
    verifiedNote: 'Verified Customer Experience (Sample Placeholder - Editable in Central Config)',
  },
  {
    id: 2,
    author: 'C. Sibanda',
    location: 'Bulawayo',
    project: 'Steel Frame Queen Beds & Accent Chairs',
    quote: 'Ordered two steel beds for our guest lodge. The steel welding is seamless and there is absolutely no squeaking. Strongest beds we have ever bought in Zimbabwe.',
    date: 'January 2026',
    verifiedNote: 'Verified Customer Experience (Sample Placeholder - Editable in Central Config)',
  },
  {
    id: 3,
    author: 'K. Mandaza',
    location: 'Harare (Avondale)',
    project: 'Custom Outdoor Steel Patio Set',
    quote: 'I sent them a picture from Pinterest and Boss Gee fabricated the exact piece. Weather-resistant finish and solid construction. Highly recommend them for custom work.',
    date: 'March 2026',
    verifiedNote: 'Verified Customer Experience (Sample Placeholder - Editable in Central Config)',
  },
];

import { Product, TradeMetric, CaseStudy } from './types';

// Official GenX Overseas Brand Logo - High Resolution Direct Link
export const LOGO_URL = "https://lh3.googleusercontent.com/u/0/d/17s24rYcvBRxt_Tn_jxpKcn6mJFT97zxb";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Turmeric Powder',
    category: 'Agriculture',
    description: 'Vibrant, high-curcumin turmeric powder (Haldi) sourced from the volcanic soils of Erode and Salem. Processed using advanced low-temperature grinding to retain 100% essential oils and natural color.',
    origin: 'India',
    image: 'https://lh3.googleusercontent.com/u/0/d/1reYuYetlPus94AjqPmTiCrkizu4wm-zn',
    specifications: ['Curcumin Content: 5.5%+', 'Moisture: < 10%', 'AFLATOXIN Certified']
  },
  {
    id: '2',
    name: 'Nasik Red Onions',
    category: 'Agriculture',
    description: 'World-famous red onions from the Nasik belt. Known for their pungent aroma, crisp texture, and exceptional 4-month shelf life for international sea freight.',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Size: 45mm - 65mm', 'Skin: Double Layer', 'Packing: 25kg Mesh Bags']
  },
  {
    id: '3',
    name: 'Premium Indian Fruits',
    category: 'Agriculture',
    description: 'Hand-picked selection of India\'s finest produce including Alphonso Mangoes, Pomegranates, and Table Grapes. Cold-chain preserved from farm to port.',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200',
    specifications: ['GlobalGAP Certified', 'Residue-free', 'Export-grade Grading']
  },
  {
    id: '4',
    name: 'High-End Mobile Accessories',
    category: 'Electronics',
    description: 'Precision-engineered mobile peripherals. Includes GaN 65W fast chargers, military-grade braided cables, and ergonomic tech cases for global retail.',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1200',
    specifications: ['BIS & CE Certified', 'RoHS Compliant', 'Eco-friendly Retail Pack']
  },
  {
    id: '6',
    name: 'Precision Cast Components',
    category: 'Industrial',
    description: 'High-tolerance industrial valves and pump components for oil, gas, and water management. Manufactured in Coimbatore using automated sand casting.',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Material: SS316 / CI', 'Tolerance: ±0.05mm', 'ISO 9001:2015 Compliant']
  },
  {
    id: '7',
    name: 'Basmati Long Grain Rice',
    category: 'Agriculture',
    description: 'Traditional aged Basmati rice from the Himalayan foothills. Famous for its delicate aroma, extra-long grains, and non-sticky texture after cooking.',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Aged: 2 Years', 'Average Grain Length: 8.3mm', 'Purity: 95%']
  },
  {
    id: '8',
    name: 'Kashmiri Saffron (Grade A1)',
    category: 'Agriculture',
    description: 'The world\'s most expensive spice, harvested by hand in the valleys of Pampore. High safranal content with deep crimson threads.',
    origin: 'India',
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Grade: Mongra (Top)', 'Moisture Content: < 12%', 'ISO 3632 Compliant']
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Digitalization of Mandis',
    subtitle: 'Research: AgTech Impact on Exports',
    description: 'Market research on how e-NAM and digital traceability systems in Indian Mandis have increased export transparency for Turmeric and Chillies.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
    stats: '28% Efficiency Gain',
    tags: ['Agriculture', 'Market Research', 'AgTech']
  },
  {
    id: 'cs2',
    title: 'GaN Semi-Conductor Hubs',
    subtitle: 'Industrial Research: Indian Tech Hubs',
    description: 'Evaluating the competitiveness of Indian electronics manufacturing clusters (EMC 2.0) in producing High-End GaN accessories vs. Global counterparts.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    stats: '12% Lower Capex',
    tags: ['Electronics', 'Industrial Research']
  },
  {
    id: 'cs3',
    title: 'North-East Sourcing Potential',
    subtitle: 'Product Discovery: Organic Frontiers',
    description: 'Comprehensive analysis of sourcing Lakadong Turmeric and Ginger from Meghalaya, highlighting the ultra-high curcumin content (>8%).',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    stats: '8.2% Curcumin Avg',
    tags: ['Sourcing', 'Research', 'Organic']
  },
  {
    id: 'cs4',
    title: 'Cold-Chain IoT Adoption',
    subtitle: 'Logistics Research: Waste Reduction',
    description: 'A study on real-time temperature monitoring for high-value fruit exports from Nashik, significantly reducing rejection rates in EU ports.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800',
    stats: '-35% Rejection Rate',
    tags: ['Logistics', 'IoT', 'Fruits']
  }
];

export const TRADE_DATA: TradeMetric[] = [
  { year: 2020, exports: 45, imports: 30, communityImpact: 12 },
  { year: 2021, exports: 52, imports: 35, communityImpact: 18 },
  { year: 2022, exports: 68, imports: 42, communityImpact: 25 },
  { year: 2023, exports: 85, imports: 55, communityImpact: 40 },
  { year: 2024, exports: 110, imports: 72, communityImpact: 58 }
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'AI Assistant', href: '#ai' },
  { label: 'Contact', href: '#contact' }
];
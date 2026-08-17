export interface WashOption {
  name: string;
  colorHex: string;
  code: string;
  image: string;
}

export type FitType = 
  | 'Skater Baggy' 
  | 'Slim Tapered' 
  | 'Classic Straight' 
  | 'Tactical Cargo' 
  | 'Relaxed Parachute' 
  | 'Comfort Stretch' 
  | 'Drop-Crotch Jogger' 
  | 'Ripped Biker' 
  | 'Smart Chino'
  | 'Relaxed Loose'
  | 'Wide Leg'
  | 'Cargo Jogger'
  | 'High Rise Flare'
  | 'Carpenter Utility'
  | 'Relaxed Straight'
  | 'Tactical 6-Pocket'
  | 'Cuffed Jogger'
  | 'Double Knee Work'
  | 'Classic Fit';

export type AgeGroup = 'all' | 'kids-3-7' | 'junior-8-14' | 'teens-15-25';

export type BottomCategory = 
  | 'all' 
  | 'jeans' 
  | 'trackpants' 
  | 'joggers' 
  | 'shorts' 
  | 'halfpants' 
  | 'cargos' 
  | 'chinos' 
  | 'trousers';

export type CategoryType = BottomCategory | AgeGroup | 'fits' | 'outerwear' | 'men' | 'women';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  ageGroup?: 'kids-3-7' | 'junior-8-14' | 'teens-15-25' | 'all-ages';
  ageLabel?: string; // e.g. "Ages 3–7 Yrs" | "Ages 8–14 Yrs" | "Ages 15–25 Yrs"
  targetAgeRange?: string; // e.g. "3 - 7 Years"
  gender?: 'boys' | 'men' | 'women' | 'unisex';
  fit: FitType;
  rise: 'Mid Rise' | 'Low Rise' | 'High Rise';
  waistStyle?: string;
  stretch: string;
  fabricWeight: string; // e.g. "12.5 oz Organic Stretch Selvedge"
  price: number; // in INR (₹)
  originalPrice?: number; // in INR (₹)
  description: string;
  story: string;
  details: string[];
  washes: WashOption[];
  sizes: string[]; // e.g. ["3-4Y", "5-6Y", "7-8Y"] or ["26W", "28W", "30W", "32W", "34W"]
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  millOrigin: string;
  createdAt?: string;
}

export interface CartItem {
  id?: string; // Unique cart line ID
  productId: string;
  productSlug?: string;
  productName: string;
  price: number; // In INR ₹
  originalPrice?: number;
  gender?: 'boys' | 'men' | 'women' | 'unisex';
  ageGroup?: string;
  image: string;
  selectedWash: string;
  selectedSize: string;
  ageLabel?: string;
  customHem?: string; // e.g. "Free Chainstitch Hemming"
  quantity: number;
}

export interface Address {
  fullName: string;
  street: string;
  aptSuite?: string;
  city: string;
  state: string;
  zipCode: string; // Indian PIN Code (e.g., 400001, 110001, 560001)
  country: string;
  phone?: string;
}

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  description: string;
}

export type OrderStatus = 
  | 'processing' 
  | 'confirmed' 
  | 'cut_sewn' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled'
  | 'returned';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number; // in INR ₹
  discount: number; // in INR ₹
  shippingFee: number; // in INR ₹
  total: number; // in INR ₹
  promoCode?: string;
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  courierAwb?: string;
  adminNotes?: string;
  estimatedDelivery: string;
  timeline: TrackingEvent[];
  paymentMethod: string; // e.g., "UPI (Google Pay / PhonePe / Paytm)", "Credit/Debit Card", "Cash on Delivery"
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Roomy';
  childAge?: string; // e.g. "Bought for 6 yr old boy" or "Bought for 19 yr old college"
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface FitProfile {
  age?: number; // 3 to 25
  waist?: number;
  inseam?: number;
  height?: string;
  weight?: string;
  heightCm?: number;
  weightKg?: number;
  preferredCategory?: string;
  preferredFit?: FitType | string;
  waistPreference?: string;
  stretchPreference?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin?: boolean;
  phone?: string;
  savedAddresses?: Address[];
  fitProfile?: FitProfile;
  wishlist?: string[]; // array of product IDs
  createdAt?: string;
}

export type SiteTheme = 'signature-red' | 'luxury-dark' | 'studio-light';

export interface CompanyInfo {
  legalName: string;
  brandName: string;
  proprietor: string;
  gstin: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    pincode: string;
    state: string;
  };
  email: string;
  phones: string[];
  bankDetails: {
    bankName: string;
    branch: string;
    accountNumber: string;
    ifscCode: string;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  legalName: 'M/s AVON ARTS',
  brandName: 'BLUE DUCK® BOYS BOTTOM JEANS',
  proprietor: 'BHAVESH SHAH',
  gstin: '27AACPS2620N1ZI',
  address: {
    line1: 'S.K.R. COMPOUND, OPP. GANPATI TEMPLE',
    line2: 'OPP. RAILWAY STATION, MAHIM EAST',
    city: 'MUMBAI',
    pincode: '400017',
    state: 'Maharashtra, India'
  },
  email: 'avonarts70@gmail.com',
  phones: ['9322231024', '9833441691', '+91 93231 30275'],
  bankDetails: {
    bankName: 'HDFC BANK',
    branch: 'DADAR WEST BRANCH',
    accountNumber: '50200012362578',
    ifscCode: 'HDFC0001119'
  }
};

export const AUTHORIZED_ADMIN_EMAILS: string[] = [
  'kalpitvora11@gmail.com',
  'avonarts70@gmail.com',
  'director@avonarts.in',
  'admin@avonarts.com'
];

// Utility currency formatter for Indian Rupees
export const formatINR = (val: number): string => {
  if (isNaN(val)) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
};

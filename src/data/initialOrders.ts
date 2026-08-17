import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-AVN-883491',
    userId: 'user_pooja_mumbai',
    userEmail: 'pooja.sharma@example.in',
    customerName: 'Pooja Sharma',
    customerPhone: '+91 98201 12345',
    shippingAddress: {
      fullName: 'Pooja Sharma',
      street: 'Flat 402, Sea Green Heights, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400018',
      country: 'India',
      phone: '+91 98201 12345'
    },
    items: [
      {
        id: 'item-ord-1',
        productId: 'avon-boy-1',
        productSlug: 'little-boys-active-play-denim',
        productName: 'Little Boys Active Play Jeans',
        price: 1599,
        quantity: 1,
        selectedSize: '5-6Y (116cm)',
        selectedWash: 'Classic Indigo',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
        gender: 'boys',
        ageGroup: 'kids-3-7'
      }
    ],
    subtotal: 1599,
    discount: 0,
    shippingFee: 0,
    total: 1599,
    status: 'shipped',
    trackingNumber: 'AVN-BLUEDART-883491',
    carrier: 'BlueDart Express',
    courierAwb: 'BLDT98412849',
    adminNotes: 'Priority delivery for school event.',
    estimatedDelivery: '2026-08-20T18:00:00Z',
    paymentMethod: 'UPI (Google Pay)',
    createdAt: '2026-08-16T10:30:00Z',
    timeline: [
      {
        status: 'shipped',
        location: 'Mumbai Central Sorting Hub, MH',
        timestamp: '2026-08-17T06:00:00Z',
        completed: true,
        description: 'Package handed over to BlueDart courier partner'
      },
      {
        status: 'cut_sewn',
        location: 'Avon Arts Mahim Workshop',
        timestamp: '2026-08-16T14:00:00Z',
        completed: true,
        description: 'Bar-tack stitching & quality inspection completed'
      },
      {
        status: 'processing',
        location: 'Avon Arts Store, Mumbai',
        timestamp: '2026-08-16T10:30:00Z',
        completed: true,
        description: 'Order confirmed and payment verified via UPI'
      }
    ]
  },
  {
    id: 'ORD-AVN-774120',
    userId: 'user_rajesh_blr',
    userEmail: 'rajesh.verma@example.in',
    customerName: 'Rajesh Verma',
    customerPhone: '+91 98450 99881',
    shippingAddress: {
      fullName: 'Rajesh Verma',
      street: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560066',
      country: 'India',
      phone: '+91 98450 99881'
    },
    items: [
      {
        id: 'item-ord-2',
        productId: 'avon-boy-2',
        productSlug: 'junior-skater-baggy-denim',
        productName: 'Junior Skater 90s Baggy Denim',
        price: 1899,
        quantity: 1,
        selectedSize: '10-11Y (146cm)',
        selectedWash: 'Vintage Acid Wash',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
        gender: 'boys',
        ageGroup: 'junior-8-14'
      },
      {
        id: 'item-ord-3',
        productId: 'avon-boy-3',
        productSlug: 'boys-tactical-6-pocket-cargo',
        productName: 'Boys Tactical 6-Pocket Cargos',
        price: 1999,
        quantity: 1,
        selectedSize: '12-13Y (158cm)',
        selectedWash: 'Olive Drab',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
        gender: 'boys',
        ageGroup: 'junior-8-14'
      }
    ],
    subtotal: 3898,
    discount: 300,
    shippingFee: 0,
    total: 3598,
    promoCode: 'OFFDUTY300',
    status: 'cut_sewn',
    trackingNumber: 'AVN-DELHIVERY-774120',
    carrier: 'Delhivery Surface',
    courierAwb: 'DLHV4499120',
    adminNotes: 'Extender waist button checked & QC passed.',
    estimatedDelivery: '2026-08-21T18:00:00Z',
    paymentMethod: 'Credit Card (HDFC)',
    createdAt: '2026-08-16T16:45:00Z',
    timeline: [
      {
        status: 'cut_sewn',
        location: 'Avon Arts Mahim Finishing Unit',
        timestamp: '2026-08-17T09:00:00Z',
        completed: true,
        description: 'Quality inspection and packing in eco denim bag'
      },
      {
        status: 'processing',
        location: 'Avon Arts Store, Mumbai',
        timestamp: '2026-08-16T16:45:00Z',
        completed: true,
        description: 'Order confirmed and ready for fulfillment'
      }
    ]
  },
  {
    id: 'ORD-AVN-661902',
    userId: 'user_karan_delhi',
    userEmail: 'karan.mehra@example.in',
    customerName: 'Karan Mehra',
    customerPhone: '+91 98110 54321',
    shippingAddress: {
      fullName: 'Karan Mehra',
      street: 'B-44, Greater Kailash Part 1',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110048',
      country: 'India',
      phone: '+91 98110 54321'
    },
    items: [
      {
        id: 'item-ord-4',
        productId: 'avon-boy-4',
        productSlug: 'young-men-14oz-japan-selvedge',
        productName: '14.5oz Japan Wide Raw Selvedge',
        price: 2499,
        quantity: 1,
        selectedSize: '30W',
        selectedWash: 'Raw Deep Indigo',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        gender: 'boys',
        ageGroup: 'teens-15-25'
      }
    ],
    subtotal: 2499,
    discount: 0,
    shippingFee: 0,
    total: 2499,
    status: 'delivered',
    trackingNumber: 'AVN-BLUEDART-661902',
    carrier: 'BlueDart Air',
    courierAwb: 'BLDT3319082',
    adminNotes: 'Delivered and verified by OTP.',
    estimatedDelivery: '2026-08-16T17:00:00Z',
    paymentMethod: 'Cash on Delivery (COD)',
    createdAt: '2026-08-14T11:20:00Z',
    timeline: [
      {
        status: 'delivered',
        location: 'New Delhi, DL',
        timestamp: '2026-08-16T16:30:00Z',
        completed: true,
        description: 'Delivered to customer at Greater Kailash'
      },
      {
        status: 'shipped',
        location: 'Delhi Airport Hub',
        timestamp: '2026-08-15T08:00:00Z',
        completed: true,
        description: 'Out for delivery'
      },
      {
        status: 'processing',
        location: 'Avon Arts Store, Mumbai',
        timestamp: '2026-08-14T11:20:00Z',
        completed: true,
        description: 'Order placed via COD'
      }
    ]
  }
];

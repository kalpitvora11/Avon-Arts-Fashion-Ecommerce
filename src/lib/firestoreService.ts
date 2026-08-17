import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, Order, Review, UserProfile } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/initialProducts';
import { INITIAL_ORDERS } from '../data/initialOrders';

const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';
const REVIEWS_COLLECTION = 'reviews';
const USERS_COLLECTION = 'users';

// Initialize or seed default products into Firestore
export async function seedProductsIfEmpty(): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(productsRef);
    
    if (snapshot.empty) {
      console.log('Seeding initial Avon Arts products to Firestore...');
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, PRODUCTS_COLLECTION, prod.id), {
          ...prod,
          createdAt: new Date().toISOString()
        });
      }

      // Also seed default reviews
      for (const rev of INITIAL_REVIEWS) {
        await setDoc(doc(db, REVIEWS_COLLECTION, rev.id), {
          ...rev,
          createdAt: rev.createdAt || new Date().toISOString()
        });
      }

      return INITIAL_PRODUCTS;
    }

    const products: Product[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Record<string, any>;
      products.push({ id: docSnap.id, ...data } as Product);
    });
    return products;
  } catch (error) {
    console.warn('Firestore fetch failed, returning initial products fallback:', error);
    return INITIAL_PRODUCTS;
  }
}

// Get all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(productsRef);
    if (snapshot.empty) {
      return await seedProductsIfEmpty();
    }
    const list: Product[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Record<string, any>;
      list.push({ id: docSnap.id, ...data } as Product);
    });
    return list;
  } catch (error) {
    console.warn('Error fetching products from Firestore:', error);
    return INITIAL_PRODUCTS;
  }
}

// Add or update a product (Admin)
export async function saveProduct(product: Product): Promise<Product> {
  try {
    const prodId = product.id || `avon-${Date.now()}`;
    const cleanProduct = { ...product, id: prodId, updatedAt: new Date().toISOString() };
    await setDoc(doc(db, PRODUCTS_COLLECTION, prodId), cleanProduct);
    return cleanProduct;
  } catch (error) {
    console.error('Error saving product to Firestore:', error);
    throw error;
  }
}

// Delete a product (Admin)
export async function deleteProduct(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
    throw error;
  }
}

const LOCAL_ORDERS_KEY = 'avon_all_orders_master_store';

function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not parse local orders cache', e);
  }
  return INITIAL_ORDERS;
}

function saveLocalOrders(orders: Order[]): void {
  try {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.warn('Could not save local orders cache', e);
  }
}

// Fetch orders (All for Admin, or by userId for Customers)
export async function fetchOrders(userId?: string): Promise<Order[]> {
  const localList = getLocalOrders();
  let firestoreList: Order[] = [];

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    let q;
    if (userId) {
      q = query(ordersRef, where('userId', '==', userId));
    } else {
      q = query(ordersRef);
    }
    const snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Record<string, any>;
      firestoreList.push({ id: docSnap.id, ...data } as Order);
    });
  } catch (error) {
    console.warn('Firestore fetchOrders warning (using local synced master):', error);
  }

  // Merge Firestore list and Local list by ID
  const orderMap = new Map<string, Order>();
  localList.forEach(ord => orderMap.set(ord.id, ord));
  firestoreList.forEach(ord => orderMap.set(ord.id, ord));

  let merged = Array.from(orderMap.values());

  // If filtered by userId
  if (userId) {
    merged = merged.filter(ord => ord.userId === userId || ord.userEmail?.toLowerCase() === userId.toLowerCase());
  }

  // Sort descending by creation date
  merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Save merged state back
  if (!userId) {
    saveLocalOrders(merged);
  }

  return merged;
}

// Create new order (Customer Checkout)
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'> & { createdAt?: string }): Promise<Order> {
  const customId = `ORD-AVN-${Math.floor(100000 + Math.random() * 900000)}`;
  const fullOrder: Order = {
    ...orderData,
    id: customId,
    createdAt: orderData.createdAt || new Date().toISOString()
  };

  // 1. Save to local storage master immediately
  const existing = getLocalOrders();
  const updated = [fullOrder, ...existing.filter(o => o.id !== customId)];
  saveLocalOrders(updated);

  // 2. Save to Firestore
  try {
    await setDoc(doc(db, ORDERS_COLLECTION, customId), fullOrder);

    // Update stock counts in products if possible
    for (const item of orderData.items) {
      try {
        const prodRef = doc(db, PRODUCTS_COLLECTION, item.productId);
        const prodSnap = await getDoc(prodRef);
        if (prodSnap.exists()) {
          const currentStock = prodSnap.data().stockCount || 10;
          await updateDoc(prodRef, {
            stockCount: Math.max(0, currentStock - item.quantity)
          });
        }
      } catch (err) {
        console.warn('Stock decrement skipped for item:', item.productId, err);
      }
    }
  } catch (error) {
    console.warn('Firestore createOrder non-blocking save notice:', error);
  }

  return fullOrder;
}

// Update complete order details (Admin CRUD Update)
export async function updateOrder(order: Order): Promise<void> {
  const existing = getLocalOrders();
  const updatedOrder = {
    ...order,
    updatedAt: new Date().toISOString()
  };
  const updatedList = existing.map(o => o.id === order.id ? updatedOrder : o);
  saveLocalOrders(updatedList);

  try {
    const orderRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(orderRef, updatedOrder, { merge: true });
  } catch (error) {
    console.warn('Firestore updateOrder non-blocking notice:', error);
  }
}

// Delete order (Admin CRUD Delete)
export async function deleteOrder(orderId: string): Promise<void> {
  // 1. Delete from local storage
  const existing = getLocalOrders();
  const filtered = existing.filter(o => o.id !== orderId);
  saveLocalOrders(filtered);

  // 2. Delete from Firestore
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
  } catch (error) {
    console.warn('Firestore deleteOrder notice:', error);
  }
}

// Update order status & tracking (Admin)
export async function updateOrderStatus(
  orderId: string, 
  status: Order['status'], 
  trackingNumber?: string, 
  carrier?: string,
  extraUpdates?: { courierAwb?: string; adminNotes?: string; timeline?: Order['timeline'] }
): Promise<void> {
  // 1. Update local cache
  const existing = getLocalOrders();
  const updatedList = existing.map(ord => {
    if (ord.id !== orderId) return ord;
    return {
      ...ord,
      status,
      updatedAt: new Date().toISOString(),
      trackingNumber: trackingNumber || ord.trackingNumber,
      carrier: carrier || ord.carrier,
      courierAwb: extraUpdates?.courierAwb !== undefined ? extraUpdates.courierAwb : ord.courierAwb,
      adminNotes: extraUpdates?.adminNotes !== undefined ? extraUpdates.adminNotes : ord.adminNotes,
      timeline: extraUpdates?.timeline || ord.timeline
    };
  });
  saveLocalOrders(updatedList);

  // 2. Update Firestore
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const updates: Partial<Order> = {
      status,
      updatedAt: new Date().toISOString(),
      ...(extraUpdates || {})
    };
    if (trackingNumber) updates.trackingNumber = trackingNumber;
    if (carrier) updates.carrier = carrier;

    await updateDoc(orderRef, updates);
  } catch (error) {
    console.warn('Firestore updateOrderStatus notice:', error);
  }
}

// Fetch reviews for a product
export async function fetchReviews(productId?: string): Promise<Review[]> {
  try {
    const revRef = collection(db, REVIEWS_COLLECTION);
    let q = revRef;
    if (productId) {
      const filteredQ = query(revRef, where('productId', '==', productId));
      const snapshot = await getDocs(filteredQ);
      if (snapshot.empty) {
        return INITIAL_REVIEWS.filter(r => r.productId === productId);
      }
      const reviews: Review[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Record<string, any>;
        reviews.push({ id: docSnap.id, ...data } as Review);
      });
      return reviews;
    } else {
      const snapshot = await getDocs(revRef);
      if (snapshot.empty) return INITIAL_REVIEWS;
      const reviews: Review[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Record<string, any>;
        reviews.push({ id: docSnap.id, ...data } as Review);
      });
      return reviews;
    }
  } catch (error) {
    console.warn('Error fetching reviews:', error);
    return productId ? INITIAL_REVIEWS.filter(r => r.productId === productId) : INITIAL_REVIEWS;
  }
}

// Submit a new review
export async function addReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  try {
    const revId = `rev-${Date.now()}`;
    const fullReview: Review = {
      ...review,
      id: revId,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, REVIEWS_COLLECTION, revId), fullReview);

    // Update product rating and review count
    try {
      const prodRef = doc(db, PRODUCTS_COLLECTION, review.productId);
      const prodSnap = await getDoc(prodRef);
      if (prodSnap.exists()) {
        const data = prodSnap.data() as Record<string, any>;
        const currentCount = data.reviewCount || 0;
        const currentRating = data.rating || 5;
        const newCount = currentCount + 1;
        const newRating = Number(((currentRating * currentCount + review.rating) / newCount).toFixed(1));
        await updateDoc(prodRef, {
          rating: newRating,
          reviewCount: newCount
        });
      }
    } catch (e) {
      console.warn('Error updating product rating average:', e);
    }

    return fullReview;
  } catch (error) {
    console.error('Error submitting review to Firestore:', error);
    return {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
  }
}

// User Profile Management (Firestore users collection)
export async function syncUserProfile(user: { uid: string; email: string | null; displayName: string | null; photoURL?: string | null }): Promise<UserProfile> {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() as Record<string, any>;
      return { uid: user.uid, ...data } as UserProfile;
    }
    const newProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'Denim Enthusiast',
      photoURL: user.photoURL || undefined,
      isAdmin: user.email?.toLowerCase().includes('admin') || user.email === 'admin@avonarts.com',
      wishlist: ['avon-selvedge-01'],
      createdAt: new Date().toISOString()
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  } catch (error) {
    console.warn('Error syncing user profile:', error);
    return {
      uid: user.uid,
      email: user.email || 'customer@avonarts.com',
      displayName: user.displayName || 'Denim Customer',
      isAdmin: user.email === 'admin@avonarts.com',
      wishlist: ['avon-selvedge-01']
    };
  }
}

// Update user wishlist
export async function updateUserWishlist(uid: string, wishlist: string[]): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, { wishlist });
  } catch (error) {
    console.warn('Error updating wishlist in Firestore:', error);
  }
}

// Update user fit measurements profile
export async function updateUserFitProfile(uid: string, fitProfile: any): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, { fitProfile });
  } catch (error) {
    console.warn('Error updating fit profile:', error);
  }
}

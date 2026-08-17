import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { 
  fetchProducts, 
  fetchOrders, 
  syncUserProfile, 
  updateUserWishlist, 
  createOrder as createFirestoreOrder,
  updateOrderStatus as updateFirestoreOrderStatus
} from '../lib/firestoreService';
import { Product, CartItem, Order, UserProfile, SiteTheme, AUTHORIZED_ADMIN_EMAILS } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface ToastInfo {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

export type AppTab = 
  | 'home' 
  | 'catalog' 
  | 'jeans'
  | 'trackpants'
  | 'joggers'
  | 'halfpants'
  | 'shorts'
  | 'cargos' 
  | 'chinos' 
  | 'kids' 
  | 'kids-3-7'
  | 'junior' 
  | 'junior-8-14'
  | 'teens' 
  | 'teens-15-25'
  | 'fits' 
  | 'about'
  | 'dashboard' 
  | 'admin';

interface StoreContextType {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
  currentUser: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  products: Product[];
  loadingProducts: boolean;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  loadingOrders: boolean;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCompanyModalOpen: boolean;
  setIsCompanyModalOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterFit: string;
  setFilterFit: (fit: string) => void;
  filterAgeGroup: string;
  setFilterAgeGroup: (age: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  filterWash: string;
  setFilterWash: (wash: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
  toasts: ToastInfo[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  loginWithGoogle: (customEmail?: string) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginAsAdminDirect: (email?: string) => void;
  logout: () => Promise<void>;
  switchDemoUser: (role: 'customer' | 'admin') => void;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  placeOrder: (orderPayload: Omit<Order, 'id' | 'createdAt'>) => Promise<Order>;
  updateOrderStatusAdmin: (orderId: string, status: Order['status'], tracking?: string, carrier?: string, extra?: { courierAwb?: string; adminNotes?: string }) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Visual Theme state with persistence
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    try {
      const saved = localStorage.getItem('blueduck_theme');
      if (saved === 'signature-red' || saved === 'luxury-dark' || saved === 'studio-light') {
        return saved;
      }
    } catch {}
    return 'signature-red';
  });

  const setTheme = (newTheme: SiteTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('blueduck_theme', newTheme);
    } catch {}
    showToast(`Applied Theme: ${newTheme === 'signature-red' ? 'Signature Red & Denim' : newTheme === 'luxury-dark' ? 'Modern Luxury Dark' : 'Clean Studio Light'}`, 'info');
  };

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('avon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(['avon-selvedge-teen-01', 'avon-junior-baggy-06']);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  
  // Filtering & search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterFit, setFilterFit] = useState<string>('all');
  const [filterAgeGroup, setFilterAgeGroup] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterWash, setFilterWash] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('avon_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }, [cart]);

  // Load products on mount
  const refreshProducts = async () => {
    setLoadingProducts(true);
    try {
      const list = await fetchProducts();
      setProducts(list);
    } catch (e) {
      console.warn('Failed to load products:', e);
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const profile = await syncUserProfile({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
          setCurrentUser(profile);
          if (profile.wishlist) {
            setWishlist(profile.wishlist);
          }
          // Load user orders
          loadOrders(user.uid, profile.isAdmin);
        } catch (err) {
          console.warn('Error loading user profile:', err);
        }
      } else {
        // Set guest profile by default so user can still shop and save wishlists
        if (!currentUser) {
          setCurrentUser({
            uid: 'guest-session',
            email: 'guest@avonarts.com',
            displayName: 'Guest Artisan',
            isAdmin: false,
            wishlist: ['avon-selvedge-01']
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const loadOrders = async (uid?: string, isAdmin?: boolean) => {
    setLoadingOrders(true);
    try {
      const fetched = await fetchOrders(isAdmin ? undefined : uid);
      setOrders(fetched);
    } catch (e) {
      console.warn('Error fetching orders:', e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const refreshOrders = async () => {
    if (currentUser) {
      await loadOrders(currentUser.uid, currentUser.isAdmin);
    } else {
      await loadOrders();
    }
  };

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Check if existing exact item with same wash, size, and hemming exists
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && 
             i.selectedWash === item.selectedWash && 
             i.selectedSize === item.selectedSize &&
             (i.customHem || '') === (item.customHem || '')
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.productName}" (${item.selectedSize}) to Bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Removed item from shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      let updated: string[];
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
        showToast('Removed from Wishlist', 'info');
      } else {
        updated = [...prev, productId];
        showToast('Saved to your Denim Wishlist ❤️', 'success');
      }
      if (currentUser && currentUser.uid !== 'guest-session') {
        updateUserWishlist(currentUser.uid, updated);
      }
      return updated;
    });
  };

  // Auth Methods
  const isEmailAdmin = (emailToCheck?: string | null): boolean => {
    if (!emailToCheck) return false;
    const clean = emailToCheck.trim().toLowerCase();
    return AUTHORIZED_ADMIN_EMAILS.some(e => e.toLowerCase() === clean) || clean.includes('admin') || clean.includes('director');
  };

  const loginWithGoogle = async (customEmail?: string) => {
    if (customEmail) {
      const isAdmin = isEmailAdmin(customEmail);
      const profile: UserProfile = {
        uid: `google-${Date.now()}`,
        email: customEmail,
        displayName: isAdmin ? 'Kalpit Vora (Avon Arts Admin)' : 'Verified Customer',
        isAdmin: isAdmin,
        wishlist: ['avon-selvedge-teen-01', 'avon-junior-baggy-06']
      };
      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      loadOrders(profile.uid, isAdmin);
      showToast(isAdmin ? `👑 Google Admin Verified: ${customEmail}` : `Signed in as ${customEmail}`, 'success');
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isAdmin = isEmailAdmin(result.user.email);
      const profile = await syncUserProfile({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      });
      profile.isAdmin = isAdmin || profile.isAdmin;
      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      showToast(isAdmin ? `👑 Admin Console Unlocked for ${profile.email}` : `Welcome back, ${profile.displayName}!`, 'success');
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      // Fallback for iframe restrictions if popup blocked
      switchDemoUser('customer');
      setIsAuthModalOpen(false);
      showToast('Signed in with Customer Profile', 'info');
    }
  };

  const loginAsAdminDirect = (adminEmail: string = 'kalpitvora11@gmail.com') => {
    const adminProfile: UserProfile = {
      uid: 'admin-google-auth-uid',
      email: adminEmail,
      displayName: adminEmail === 'avonarts70@gmail.com' ? 'Bhavesh Shah (Proprietor)' : 'Kalpit Vora (System Admin)',
      isAdmin: true,
      wishlist: ['avon-selvedge-teen-01', 'avon-junior-baggy-06'],
      savedAddresses: [{
        fullName: 'Avon Arts Headquarters',
        street: 'S.K.R. Compound, Opp. Ganpati Temple',
        aptSuite: 'Opp. Railway Station, Mahim East',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400017',
        country: 'India',
        phone: '+91 93231 30275'
      }]
    };
    setCurrentUser(adminProfile);
    setIsAuthModalOpen(false);
    loadOrders(adminProfile.uid, true);
    showToast(`👑 Admin Authenticated: ${adminEmail}`, 'success');
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const isAdmin = isEmailAdmin(email);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const profile = await syncUserProfile({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL
      });
      profile.isAdmin = isAdmin || profile.isAdmin;
      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      showToast(isAdmin ? `👑 Store Admin Access Granted: ${profile.email}` : `Welcome back, ${profile.displayName}!`, 'success');
    } catch (err: any) {
      // Demo fallback
      if (isAdmin) {
        loginAsAdminDirect(email);
      } else {
        const customerProfile: UserProfile = {
          uid: `user-${Date.now()}`,
          email,
          displayName: email.split('@')[0] || 'Customer',
          isAdmin: false,
          wishlist: []
        };
        setCurrentUser(customerProfile);
        setIsAuthModalOpen(false);
        showToast(`Signed in: ${email}`, 'success');
      }
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const isAdmin = isEmailAdmin(email);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
      const profile = await syncUserProfile({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: name,
      });
      profile.isAdmin = isAdmin;
      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      showToast(`Account created! Welcome to Blue Duck® by Avon Arts, ${name}.`, 'success');
    } catch (err: any) {
      const newProfile: UserProfile = {
        uid: `user-${Date.now()}`,
        email,
        displayName: name || 'Customer',
        isAdmin: isAdmin,
        wishlist: []
      };
      setCurrentUser(newProfile);
      setIsAuthModalOpen(false);
      showToast(`Account registered: ${name}`, 'success');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Signout note:', e);
    }
    setCurrentUser({
      uid: 'guest-session',
      email: 'guest@avonarts.com',
      displayName: 'Guest Artisan',
      isAdmin: false,
      wishlist: []
    });
    setOrders([]);
    setActiveTab('home');
    showToast('Signed out successfully', 'info');
  };

  // Demo user quick switcher for instant testing
  const switchDemoUser = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      loginAsAdminDirect('kalpitvora11@gmail.com');
    } else {
      const customerProfile: UserProfile = {
        uid: 'cust-demo-101',
        email: 'customer@avonarts.in',
        displayName: 'Aarav Patel (Parent of 6Y & 14Y Boys)',
        isAdmin: false,
        wishlist: ['avon-selvedge-teen-01', 'avon-cargo-youngmen-02'],
        savedAddresses: [{
          fullName: 'Aarav Patel',
          street: 'Flat 402, Sea Green Apartments, Bandra West',
          aptSuite: 'Near Carter Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400050',
          country: 'India',
          phone: '+91 98201 54321'
        }],
        fitProfile: {
          age: 12,
          heightCm: 152,
          weightKg: 42,
          preferredCategory: 'cargos',
          preferredFit: 'Tactical Cargo',
          waistPreference: '26W'
        }
      };
      setCurrentUser(customerProfile);
      loadOrders(customerProfile.uid, false);
      showToast('Switched to Customer Account (Aarav Patel)', 'info');
    }
  };

  // Place order wrapper
  const placeOrder = async (orderPayload: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const created = await createFirestoreOrder(orderPayload);
    setOrders(prev => [created, ...prev]);
    clearCart();
    return created;
  };

  // Admin order status update wrapper
  const updateOrderStatusAdmin = async (
    orderId: string, 
    status: Order['status'], 
    tracking?: string, 
    carrier?: string, 
    extra?: { courierAwb?: string; adminNotes?: string }
  ): Promise<void> => {
    await updateFirestoreOrderStatus(orderId, status, tracking, carrier, extra);
    setOrders(prev => prev.map(ord => {
      if (ord.id !== orderId) return ord;
      return {
        ...ord,
        status,
        trackingNumber: tracking || ord.trackingNumber,
        carrier: carrier || ord.carrier,
        courierAwb: extra?.courierAwb !== undefined ? extra.courierAwb : ord.courierAwb,
        adminNotes: extra?.adminNotes !== undefined ? extra.adminNotes : ord.adminNotes,
        updatedAt: new Date().toISOString()
      };
    }));
    showToast(`Order ${orderId} updated to ${status.toUpperCase()}`, 'success');
  };

  return (
    <StoreContext.Provider value={{
      theme,
      setTheme,
      currentUser,
      firebaseUser,
      products,
      loadingProducts,
      cart,
      wishlist,
      orders,
      loadingOrders,
      activeTab,
      setActiveTab,
      selectedProduct,
      setSelectedProduct,
      isCartOpen,
      setIsCartOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isCompanyModalOpen,
      setIsCompanyModalOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      searchQuery,
      setSearchQuery,
      filterFit,
      setFilterFit,
      filterAgeGroup,
      setFilterAgeGroup,
      filterCategory,
      setFilterCategory,
      filterWash,
      setFilterWash,
      sortOption,
      setSortOption,
      toasts,
      showToast,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail,
      loginAsAdminDirect,
      logout,
      switchDemoUser,
      refreshProducts,
      refreshOrders,
      placeOrder,
      updateOrderStatusAdmin
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

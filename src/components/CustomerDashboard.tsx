import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Heart, 
  Ruler, 
  RotateCcw, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  User, 
  Scissors, 
  ChevronRight, 
  ShoppingBag,
  Trash2,
  FileText,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, Product, FitProfile, formatINR } from '../types';
import { updateUserFitProfile } from '../lib/firestoreService';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    loadingOrders, 
    products, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setActiveTab, 
    showToast,
    refreshOrders
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'tracking' | 'wishlist' | 'fit-profile'>('orders');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [returnRequestedOrders, setReturnRequestedOrders] = useState<string[]>([]);

  // Fit profile state for boys
  const [boyAge, setBoyAge] = useState<number>(10);
  const [waist, setWaist] = useState<number>(currentUser?.fitProfile?.waist || 26);
  const [inseam, setInseam] = useState<number>(currentUser?.fitProfile?.inseam || 28);
  const [preferredFit, setPreferredFit] = useState<string>(currentUser?.fitProfile?.preferredFit || 'Slim Tapered');
  const [stretchPreference, setStretchPreference] = useState<string>(currentUser?.fitProfile?.stretchPreference || '1% Comfort Flex');
  const [isSavingFit, setIsSavingFit] = useState<boolean>(false);

  useEffect(() => {
    refreshOrders();
  }, []);

  // Filter wishlisted products from catalog
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleRequestReturn = (orderId: string) => {
    setReturnRequestedOrders(prev => [...prev, orderId]);
    showToast(`Free 7-Day Size Exchange initiated for Order #${orderId}`, 'success');
  };

  const handleSaveFitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSavingFit(true);
    try {
      const updatedFit: FitProfile = {
        waist,
        inseam,
        height: `${Math.floor(boyAge * 7 + 70)} cm`,
        weight: `${Math.floor(boyAge * 3 + 12)} kg`,
        preferredFit: preferredFit as any,
        stretchPreference
      };
      await updateUserFitProfile(currentUser.uid, updatedFit);
      showToast("Boy's Fit Profile saved! Perfect sizes will be highlighted.", 'success');
    } catch (err) {
      showToast('Error saving fit measurements', 'error');
    } finally {
      setIsSavingFit(false);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">Cutting & Packing</span>;
      case 'cut_sewn':
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">Quality Inspected</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">Out for Delivery (Courier)</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">Delivered</span>;
      case 'returned':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">Exchange Processed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px]">Processing</span>;
    }
  };

  return (
    <section className="py-12 bg-[#090d16] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Customer Header Banner */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-xl shadow-amber-950/40">
                {currentUser?.displayName?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentUser?.displayName || 'Avon Arts Member'}
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-bold uppercase">
                    Verified Customer
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
                <p className="text-[11px] text-amber-400 font-medium mt-1">
                  Avon Arts Boys Club Member • Special discounts on Kids & Teen Bottoms
                </p>
              </div>
            </div>

            {/* Quick KPI Stats */}
            <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-center px-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Orders</span>
                <strong className="text-lg font-mono font-extrabold text-white">{orders.length}</strong>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center px-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Wishlist</span>
                <strong className="text-lg font-mono font-extrabold text-rose-400">{wishlist.length}</strong>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center px-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Saved Size</span>
                <strong className="text-sm font-bold text-amber-400">{waist}W</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
            { id: 'wishlist', label: `Saved Favorites (${wishlistedProducts.length})`, icon: Heart },
            { id: 'fit-profile', label: "Boy's Fit & Size Profile", icon: Ruler },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                  activeSubTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUBTAB 1: ORDERS & SHIPMENT TRACKING */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#0b0f19] rounded-2xl border border-slate-800 p-8 space-y-4">
                <Package className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No orders placed yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When you order bottoms for your boy (Ages 3 to 25), you can track real-time delivery and exchange requests here.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Explore Boys Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const hasReturnReq = returnRequestedOrders.includes(order.id) || order.status === 'returned';
                  return (
                    <div 
                      key={order.id}
                      className="bg-[#0b0f19] rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-4 shadow-lg"
                    >
                      {/* Order Title Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-white">#{order.id}</span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} • {order.items.length} item(s)
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedOrderForTracking(order)}
                            className="px-3.5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5 text-blue-400" />
                            <span>Track Shipment</span>
                          </button>

                          {!hasReturnReq ? (
                            <button
                              onClick={() => handleRequestReturn(order.id)}
                              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                              <span>Free Size Exchange</span>
                            </button>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Exchange Pickup Scheduled
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Items inside this order */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 bg-slate-950 p-3 rounded-xl border border-slate-900">
                            <img src={item.image} alt={item.productName} className="w-16 h-20 object-cover rounded-lg bg-slate-900 shrink-0" />
                            <div className="space-y-1">
                              <h4 className="font-bold text-xs text-white line-clamp-1">{item.productName}</h4>
                              <p className="text-[11px] text-slate-400">Wash: <span className="text-slate-200">{item.selectedWash}</span></p>
                              <p className="text-[11px] text-slate-400">Size: <span className="text-amber-400 font-mono font-bold">{item.selectedSize}</span> (x{item.quantity})</p>
                              {item.customHem && <span className="text-[10px] text-blue-400 flex items-center gap-1"><Scissors className="w-2.5 h-2.5" />{item.customHem}</span>}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Tracking summary */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                        <div>
                          <span>Delivery Courier: <strong className="text-slate-200">{order.carrier}</strong></span>
                          <span className="mx-2">•</span>
                          <span>Tracking: <strong className="font-mono text-amber-400">{order.trackingNumber}</strong></span>
                        </div>
                        <div className="font-bold text-white">
                          Total Paid: <span className="text-amber-400 font-mono text-sm">{formatINR(order.total)}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: WISHLIST */}
        {activeSubTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#0b0f19] rounded-2xl border border-slate-800 p-8 space-y-4">
                <Heart className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Your wishlist is currently empty</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the heart icon on any boys jeans, joggers, or cargos to save them for later.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Browse Boys Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-[#0b0f19] rounded-2xl border border-slate-800 overflow-hidden p-4 space-y-3 flex flex-col justify-between shadow-lg"
                  >
                    <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-950">
                      <img src={product.washes[0]?.image || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/80 text-rose-400 hover:text-rose-300 backdrop-blur-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{product.ageLabel || product.fit}</span>
                      <h4 className="font-bold text-sm text-white">{product.name}</h4>
                      <p className="text-xs font-mono font-bold text-slate-300">{formatINR(product.price)}</p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart({
                          id: `${product.id}-${product.washes[0].code}-${product.sizes[0]}`,
                          productId: product.id,
                          productName: product.name,
                          price: product.price,
                          image: product.washes[0].image,
                          selectedWash: product.washes[0].name,
                          selectedSize: product.sizes[0] || '26W',
                          quantity: 1
                        });
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: BOY'S FIT PROFILE */}
        {activeSubTab === 'fit-profile' && (
          <div className="bg-[#0b0f19] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 max-w-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-amber-400" />
                <span>Boy's Personalized Size & Growth Profile</span>
              </h3>
              <p className="text-xs text-slate-400">
                Save your boy's age, waist, and preferred bottom style. We will recommend the best fit with room to grow.
              </p>
            </div>

            <form onSubmit={handleSaveFitProfile} className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Boy's Age</label>
                  <select
                    value={boyAge}
                    onChange={(e) => setBoyAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  >
                    {[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map(a => (
                      <option key={a} value={a}>Age {a} Years</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Waist (Inches)</label>
                  <input
                    type="number"
                    min="18"
                    max="40"
                    value={waist}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Inseam (Inches)</label>
                  <input
                    type="number"
                    min="14"
                    max="36"
                    value={inseam}
                    onChange={(e) => setInseam(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Preferred Silhouette / Cut</label>
                <select
                  value={preferredFit}
                  onChange={(e) => setPreferredFit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Slim Tapered">Slim Tapered (Smart & Trendy)</option>
                  <option value="Relaxed Loose">Relaxed Loose / Baggy (Streetwear Comfort)</option>
                  <option value="Cargo Jogger">Cargo Jogger (Elastic Ankle + Pockets)</option>
                  <option value="Classic Straight">Classic Straight (Everyday School & Casual)</option>
                  <option value="Chino Trousers">Smart Chino (Party & Festive)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Waistband Comfort Preference</label>
                <select
                  value={stretchPreference}
                  onChange={(e) => setStretchPreference(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Elastic Waistband + Drawstring">Full Elastic Ribbed Waistband + Drawstring</option>
                  <option value="Internal Button Extender">Internal Button Adjustable Extender Band</option>
                  <option value="Fixed Beltloop Waistband">Classic Fixed Waistband with Beltloops</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingFit}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSavingFit ? 'Saving to Profile...' : "Save Boy's Fit Profile"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dedicated Support Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 rounded-3xl border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Avon Arts Customer Care
            </span>
            <h4 className="text-lg font-bold text-white">Need help with Boy's Size or Exchange?</h4>
            <p className="text-xs text-slate-400 max-w-lg">
              Our sizing specialists in India assist with boy's waist measurements, fit suggestions, tracking status, and 7-day doorstep size swaps.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/919323130275"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp +91 93231 30275</span>
            </a>

            <a
              href="mailto:avonarts70@gmail.com"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>avonarts70@gmail.com</span>
            </a>
          </div>
        </div>

      </div>

      {/* TRACKING TIMELINE MODAL */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-xl bg-[#0b0f19] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedOrderForTracking(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Live Courier Dispatch
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Shipment #{selectedOrderForTracking.trackingNumber}
              </h3>
              <p className="text-xs text-slate-400">
                Carrier: {selectedOrderForTracking.carrier} • Est. Arrival: {selectedOrderForTracking.estimatedDelivery}
              </p>
            </div>

            {/* Timeline checkpoints */}
            <div className="space-y-4 pt-2">
              {selectedOrderForTracking.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx < selectedOrderForTracking.timeline.length - 1 && (
                    <div className="absolute left-3 top-7 bottom-0 w-0.5 bg-slate-800" />
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    event.completed 
                      ? 'bg-amber-500 text-slate-950 font-bold' 
                      : 'bg-slate-900 border border-slate-700 text-slate-500'
                  }`}>
                    {event.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-white">{event.status}</h5>
                    <p className="text-[11px] text-slate-400">{event.description}</p>
                    <span className="text-[10px] text-amber-400/80 font-mono">{event.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

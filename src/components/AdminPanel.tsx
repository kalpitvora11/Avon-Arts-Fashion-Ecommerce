import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  IndianRupee, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  RefreshCw, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  Star,
  Scissors,
  Save,
  Printer,
  FileText,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, FitType, formatINR, CartItem } from '../types';
import { 
  saveProduct, 
  deleteProduct, 
  updateOrderStatus, 
  updateOrder,
  deleteOrder,
  createOrder,
  seedProductsIfEmpty,
  fetchOrders
} from '../lib/firestoreService';

export const AdminPanel: React.FC = () => {
  const { products, refreshProducts, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders' | 'customers'>('orders');
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [searchOrderQuery, setSearchOrderQuery] = useState<string>('');

  // Order CRUD Modal States
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [viewingOrderDetails, setViewingOrderDetails] = useState<Order | null>(null);

  // Form states for manual Order Creation
  const [newOrderCustomer, setNewOrderCustomer] = useState<string>('');
  const [newOrderEmail, setNewOrderEmail] = useState<string>('');
  const [newOrderPhone, setNewOrderPhone] = useState<string>('+91 ');
  const [newOrderStreet, setNewOrderStreet] = useState<string>('');
  const [newOrderCity, setNewOrderCity] = useState<string>('Mumbai');
  const [newOrderState, setNewOrderState] = useState<string>('Maharashtra');
  const [newOrderZip, setNewOrderZip] = useState<string>('400016');
  const [newOrderProductId, setNewOrderProductId] = useState<string>('');
  const [newOrderSize, setNewOrderSize] = useState<string>('30W');
  const [newOrderWash, setNewOrderWash] = useState<string>('Classic Indigo');
  const [newOrderQty, setNewOrderQty] = useState<number>(1);
  const [newOrderPaymentMethod, setNewOrderPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('upi');
  const [newOrderStatus, setNewOrderStatus] = useState<Order['status']>('processing');
  const [newOrderCarrier, setNewOrderCarrier] = useState<string>('BlueDart Express');
  const [newOrderNotes, setNewOrderNotes] = useState<string>('');

  // Inventory modal & edit states
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inventorySearch, setInventorySearch] = useState<string>('');

  // Form states for new/edit product
  const [formName, setFormName] = useState<string>('');
  const [formPrice, setFormPrice] = useState<number>(1999);
  const [formAgeGroup, setFormAgeGroup] = useState<'kids-3-7' | 'junior-8-14' | 'teens-15-25'>('junior-8-14');
  const [formCategory, setFormCategory] = useState<string>('jeans');
  const [formFit, setFormFit] = useState<FitType>('Skater Baggy');
  const [formRise, setFormRise] = useState<'Low Rise' | 'Mid Rise' | 'High Rise'>('Mid Rise');
  const [formWaistStyle, setFormWaistStyle] = useState<string>('Inner Button Adjustable Extender Band');
  const [formStretch, setFormStretch] = useState<string>('2% Comfort Stretch');
  const [formFabric, setFormFabric] = useState<string>('11.5 oz Cotton Denim');
  const [formStock, setFormStock] = useState<number>(40);
  const [formDesc, setFormDesc] = useState<string>('');
  const [formImage, setFormImage] = useState<string>('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80');

  const loadAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const orders = await fetchOrders();
      setAllOrders(orders);
    } catch (e) {
      console.warn('Error loading admin orders:', e);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  // Compute KPI metrics in INR
  const totalRevenue = allOrders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = allOrders.length;
  const avgOrderValue = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount) : 0;
  const lowStockItems = products.filter(p => p.stockCount <= 10);

  // Initialize first product in select dropdown
  useEffect(() => {
    if (products.length > 0 && !newOrderProductId) {
      setNewOrderProductId(products[0].id);
    }
  }, [products, newOrderProductId]);

  // PRODUCT CRUD
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice(1999);
    setFormAgeGroup('junior-8-14');
    setFormCategory('jeans');
    setFormFit('Skater Baggy');
    setFormRise('Mid Rise');
    setFormWaistStyle('Inner Button Adjustable Extender Band');
    setFormStretch('2% Comfort Stretch');
    setFormFabric('11.5 oz Cotton Denim');
    setFormStock(35);
    setFormDesc('Durable Blue Duck boys bottomwear with bar-tack stitching and growth-friendly waistband.');
    setFormImage('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80');
    setIsAddingProduct(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormPrice(p.price);
    setFormAgeGroup(p.ageGroup || 'junior-8-14');
    setFormCategory((p.category as any) || 'jeans');
    setFormFit(p.fit);
    setFormRise(p.rise);
    setFormWaistStyle(p.waistStyle || 'Inner Button Adjustable Extender Band');
    setFormStretch(p.stretch as any);
    setFormFabric(p.fabricWeight);
    setFormStock(p.stockCount);
    setFormDesc(p.description);
    setFormImage(p.washes[0]?.image || p.images[0]);
    setIsAddingProduct(true);
  };

  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ageLabels: Record<string, string> = {
        'kids-3-7': 'Age 3 to 7 Yrs',
        'junior-8-14': 'Age 8 to 14 Yrs',
        'teens-15-25': 'Age 15 to 25 Yrs'
      };

      const defaultSizesByAge: Record<string, string[]> = {
        'kids-3-7': ['3-4Y (104cm)', '4-5Y (110cm)', '5-6Y (116cm)', '6-7Y (122cm)'],
        'junior-8-14': ['8-9Y (134cm)', '10-11Y (146cm)', '12-13Y (158cm)', '14Y (164cm)'],
        'teens-15-25': ['26W', '28W', '30W', '32W', '34W']
      };

      const productPayload: Product = {
        id: editingProduct?.id || `avon-boy-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/\s+/g, '-'),
        category: formCategory,
        gender: 'boys',
        ageGroup: formAgeGroup,
        ageLabel: ageLabels[formAgeGroup],
        targetAgeRange: ageLabels[formAgeGroup],
        waistStyle: formWaistStyle,
        fit: formFit,
        rise: formRise,
        stretch: formStretch,
        fabricWeight: formFabric,
        price: Number(formPrice),
        description: formDesc,
        story: 'Engineered specifically for active boys ages 3 to 25 with double-strength stitching.',
        details: [
          `Target Age: ${ageLabels[formAgeGroup]}`,
          `Waist Construction: ${formWaistStyle}`,
          'Bar-Tack Reinforced Pockets & Belt Loops',
          'Skin-safe, Scratch-Free Tags'
        ],
        washes: editingProduct?.washes || [
          {
            name: 'Classic Indigo Wash',
            colorHex: '#1e3a8a',
            code: 'classic-indigo',
            image: formImage
          }
        ],
        sizes: editingProduct?.sizes || defaultSizesByAge[formAgeGroup],
        inStock: formStock > 0,
        stockCount: Number(formStock),
        rating: editingProduct?.rating || 4.9,
        reviewCount: editingProduct?.reviewCount || 8,
        images: [formImage],
        millOrigin: 'Avon Arts Denim Mills, India'
      };

      await saveProduct(productPayload);
      await refreshProducts();
      setIsAddingProduct(false);
      showToast(`Product "${formName}" saved in Boys inventory!`, 'success');
    } catch (err) {
      showToast('Failed to save product in database', 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      try {
        await deleteProduct(id);
        await refreshProducts();
        showToast(`Deleted "${name}" from catalog`, 'info');
      } catch (err) {
        showToast('Failed to delete product', 'error');
      }
    }
  };

  // ORDER CRUD: Quick Status Update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const trackingCode = `AVN-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      await updateOrderStatus(orderId, newStatus, trackingCode);
      await loadAllOrders();
      showToast(`Order #${orderId} status changed to "${newStatus.toUpperCase()}"`, 'success');
    } catch (err) {
      showToast('Failed to update order status', 'error');
    }
  };

  // ORDER CRUD: Save Edit Order
  const handleSaveEditOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    try {
      await updateOrder(editingOrder);
      await loadAllOrders();
      setEditingOrder(null);
      showToast(`Order #${editingOrder.id} successfully updated!`, 'success');
    } catch (err) {
      showToast('Failed to update order', 'error');
    }
  };

  // ORDER CRUD: Execute Order Deletion
  const handleConfirmDeleteOrder = async () => {
    if (!deletingOrderId) return;
    try {
      await deleteOrder(deletingOrderId);
      setAllOrders(prev => prev.filter(o => o.id !== deletingOrderId));
      showToast(`Order #${deletingOrderId} permanently deleted.`, 'info');
      setDeletingOrderId(null);
    } catch (err) {
      showToast('Failed to delete order', 'error');
    }
  };

  // ORDER CRUD: Create Manual Order
  const handleCreateManualOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const selProduct = products.find(p => p.id === newOrderProductId) || products[0];
    if (!selProduct) {
      showToast('Please select a product first', 'error');
      return;
    }

    const price = selProduct.price;
    const subtotal = price * newOrderQty;
    const gst = Math.round(subtotal * 0.12);
    const shipping = subtotal >= 999 ? 0 : 99;
    const total = subtotal + gst + shipping;

    const newOrderPayload: Omit<Order, 'id' | 'createdAt'> = {
      userId: `guest_${Date.now()}`,
      userEmail: newOrderEmail || 'counter.sale@avonarts.com',
      customerName: newOrderCustomer || 'Walk-in Customer',
      customerPhone: newOrderPhone || '+91 93231 30275',
      items: [
        {
          productId: selProduct.id,
          productSlug: selProduct.slug,
          productName: selProduct.name,
          price: selProduct.price,
          quantity: newOrderQty,
          selectedSize: newOrderSize,
          selectedWash: newOrderWash,
          image: selProduct.washes[0]?.image || selProduct.images[0],
          gender: 'boys',
          ageGroup: selProduct.ageGroup
        }
      ],
      subtotal,
      discount: 0,
      shippingFee: shipping,
      total,
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toISOString(),
      status: newOrderStatus,
      shippingAddress: {
        fullName: newOrderCustomer || 'Counter Customer',
        street: newOrderStreet || 'Avon Arts Mahim Showroom',
        city: newOrderCity || 'Mumbai',
        state: newOrderState || 'Maharashtra',
        zipCode: newOrderZip || '400016',
        country: 'India',
        phone: newOrderPhone || '+91 93231 30275'
      },
      paymentMethod: newOrderPaymentMethod,
      trackingNumber: `AVN-AWB-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: newOrderCarrier,
      courierAwb: `DLHV-${Math.floor(10000000 + Math.random() * 90000000)}`,
      adminNotes: newOrderNotes || 'Created manually via Admin Portal.',
      timeline: [
        {
          status: newOrderStatus,
          location: 'Mumbai Central Logistics Hub, MH',
          timestamp: new Date().toISOString(),
          completed: true,
          description: `Order manually booked via Admin Console (${newOrderPaymentMethod.toUpperCase()})`
        }
      ]
    };

    try {
      const created = await createOrder(newOrderPayload);
      await loadAllOrders();
      setIsCreatingOrder(false);
      showToast(`New Order #${created.id} created successfully!`, 'success');
      // Reset form
      setNewOrderCustomer('');
      setNewOrderEmail('');
      setNewOrderPhone('+91 ');
      setNewOrderStreet('');
      setNewOrderNotes('');
    } catch (err) {
      showToast('Failed to create manual order', 'error');
    }
  };

  const handleResetCatalog = async () => {
    if (window.confirm('Reset Firestore inventory with default Avon Arts Boys Bottoms (Age 3-25)?')) {
      await seedProductsIfEmpty();
      await refreshProducts();
      showToast('Boys catalogue re-seeded successfully!', 'success');
    }
  };

  const filteredOrders = allOrders.filter(ord => {
    if (orderFilter !== 'all' && ord.status !== orderFilter) return false;
    if (searchOrderQuery.trim()) {
      const q = searchOrderQuery.toLowerCase();
      return ord.id.toLowerCase().includes(q) || 
             ord.userEmail.toLowerCase().includes(q) || 
             ord.customerName.toLowerCase().includes(q) ||
             (ord.customerPhone && ord.customerPhone.toLowerCase().includes(q)) ||
             (ord.shippingAddress?.city && ord.shippingAddress.city.toLowerCase().includes(q)) ||
             ord.trackingNumber.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredInventory = products.filter(p => {
    if (!inventorySearch.trim()) return true;
    const q = inventorySearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.fit.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">Processing</span>;
      case 'cut_sewn':
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider">QC Inspected</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">Dispatched (AWB)</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">Delivered</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase">{status}</span>;
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-[#090d16] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-extrabold tracking-wider uppercase">
                Admin Control Room & Order CRUD
              </span>
              <span className="text-xs text-slate-400">• Avon Arts Store Ops</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Avon Arts Master Console
            </h1>
            
            {/* Official Business Configuration Tag */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800/80">
              <span>Brand: <strong className="text-amber-400 font-bold">Avon Arts / Blue Duck</strong></span>
              <span className="text-slate-700">|</span>
              <span>Ops: <strong className="text-emerald-400 font-bold">Full Order CRUD Enabled</strong></span>
              <span className="text-slate-700">|</span>
              <span>Currency: <strong className="text-emerald-400 font-mono font-bold">₹ INR</strong></span>
              <span className="text-slate-700">|</span>
              <span>Support: <a href="tel:+919820048892" className="text-slate-300 hover:text-amber-400 font-mono">+91 98200 48892</a></span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={handleResetCatalog}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Catalog</span>
            </button>

            <button
              id="admin-create-order-btn"
              onClick={() => setIsCreatingOrder(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Order</span>
            </button>

            <button
              id="admin-add-product-btn"
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add SKU</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: `Orders Master (${allOrders.length})`, icon: ShoppingBag },
            { id: 'inventory', label: `Inventory & SKUs (${products.length})`, icon: Package },
            { id: 'overview', label: 'Sales & Metrics (₹)', icon: TrendingUp },
            { id: 'customers', label: 'Customer Accounts', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
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

        {/* TAB 1: ORDERS FULFILLMENT & FULL CRUD */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Orders Header & Search / Filter Controls */}
            <div className="bg-[#0b0f19] p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Active Orders Pipeline</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                      {filteredOrders.length} shown
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live Firestore order tracking with Full Edit, Update & Delete management rights.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingOrder(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Manual Phone/Counter Order</span>
                </button>
              </div>

              {/* Filter pills & Search box */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Orders' },
                    { id: 'processing', label: 'Processing' },
                    { id: 'cut_sewn', label: 'QC Inspected' },
                    { id: 'shipped', label: 'Dispatched' },
                    { id: 'delivered', label: 'Delivered' },
                    { id: 'cancelled', label: 'Cancelled' },
                  ].map(st => {
                    const count = st.id === 'all' ? allOrders.length : allOrders.filter(o => o.status === st.id).length;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setOrderFilter(st.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                          orderFilter === st.id 
                            ? 'bg-amber-500 text-slate-950 font-bold shadow' 
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        <span>{st.label}</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          orderFilter === st.id ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative max-w-sm w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search Order ID, Customer, Phone, City..."
                    value={searchOrderQuery}
                    onChange={(e) => setSearchOrderQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Orders Feed */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-16 bg-[#0b0f19] rounded-2xl border border-slate-800 p-8 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-300">No orders match the selected filter.</h4>
                  <p className="text-xs text-slate-500">
                    Try searching for another query or click below to create a new manual order.
                  </p>
                  <button
                    onClick={() => setIsCreatingOrder(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    + Create New Order
                  </button>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="bg-[#0b0f19] rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl hover:border-slate-700 transition-all">
                    
                    {/* Top Row: Order ID, Status, Customer & Actions */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono font-black text-white text-base">#{order.id}</span>
                          {getStatusBadge(order.status)}
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 font-bold">
                            {formatINR(order.total)}
                          </span>
                          <span className="text-[11px] text-slate-500 uppercase font-mono">
                            {order.paymentMethod?.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                          <span>👤 <strong>{order.customerName}</strong></span>
                          <span>• ✉️ {order.userEmail}</span>
                          {order.customerPhone && <span>• 📞 {order.customerPhone}</span>}
                          <span>• 🕒 {new Date(order.createdAt).toLocaleString()}</span>
                        </p>
                      </div>

                      {/* Action Controls: Quick Status, Edit, Delete, View */}
                      <div className="flex items-center gap-2 flex-wrap">
                        
                        {/* Status Quick Changer */}
                        <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-700">
                          <span className="text-[11px] text-slate-400 font-medium">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                            className="bg-transparent border-none text-xs text-amber-400 font-bold cursor-pointer focus:outline-none"
                          >
                            <option value="processing" className="bg-slate-900 text-white">Packing / Order Placed</option>
                            <option value="cut_sewn" className="bg-slate-900 text-white">QC Inspected</option>
                            <option value="shipped" className="bg-slate-900 text-white">Dispatched (BlueDart/Delhivery)</option>
                            <option value="delivered" className="bg-slate-900 text-white">Delivered</option>
                            <option value="cancelled" className="bg-slate-900 text-white">Cancelled</option>
                          </select>
                        </div>

                        {/* Edit Order Button */}
                        <button
                          onClick={() => setEditingOrder({ ...order })}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                          title="Edit Full Order Details"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Edit</span>
                        </button>

                        {/* View Order Modal / Invoice */}
                        <button
                          onClick={() => setViewingOrderDetails(order)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"
                          title="View Invoice & Full Details"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                          <span>Details</span>
                        </button>

                        {/* Delete Order Button */}
                        <button
                          onClick={() => setDeletingOrderId(order.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-800/40"
                          title="Delete Order (Admin Right)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>

                      </div>
                    </div>

                    {/* Order Details: items, shipping & logistics */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                      
                      {/* Left: Ordered items */}
                      <div className="md:col-span-7 space-y-2">
                        <span className="font-bold text-slate-400 uppercase tracking-wider block text-[11px]">
                          Ordered Items ({order.items.length})
                        </span>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.productName} 
                                  className="w-11 h-12 object-cover rounded bg-slate-900 shrink-0" 
                                />
                                <div>
                                  <h5 className="font-bold text-white text-xs">{item.productName}</h5>
                                  <p className="text-[11px] text-slate-400">
                                    Size: <strong className="text-amber-400 font-mono">{item.selectedSize}</strong> | Wash: {item.selectedWash}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-mono font-bold text-white block">{formatINR(item.price * item.quantity)}</span>
                                <span className="text-[10px] text-slate-500">Qty: {item.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Shipping Address & Tracking Info */}
                      <div className="md:col-span-5 bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                            Delivery & Logistics
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Carrier: {order.carrier || 'BlueDart Express'}
                          </span>
                        </div>

                        <div className="text-slate-300 leading-relaxed text-xs">
                          <p className="font-semibold text-white">{order.shippingAddress?.fullName || order.customerName}</p>
                          <p className="text-slate-400">{order.shippingAddress?.street}</p>
                          <p className="text-slate-400">
                            {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-slate-500">AWB Tracking:</span>{' '}
                            <strong className="text-amber-400 font-mono">{order.trackingNumber || 'Pending'}</strong>
                          </div>
                        </div>

                        {order.adminNotes && (
                          <div className="pt-1.5 text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                            <strong className="text-amber-400">Admin Note:</strong> {order.adminNotes}
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Search and stats bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search bottoms by name, category, or age group..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>

              <div className="text-xs text-slate-400">
                Managing <strong>{products.length}</strong> active Boys Bottom SKUs
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#0b0f19] rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Item & Style</th>
                      <th className="py-3.5 px-3">Age Group</th>
                      <th className="py-3.5 px-3">Fit & Waist</th>
                      <th className="py-3.5 px-3">Price (₹)</th>
                      <th className="py-3.5 px-3">Stock Units</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {filteredInventory.map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img src={prod.washes[0]?.image || prod.images[0]} alt={prod.name} className="w-12 h-14 object-cover rounded-lg bg-slate-900 shrink-0" />
                          <div>
                            <h4 className="font-bold text-white text-xs">{prod.name}</h4>
                            <p className="text-[10px] text-amber-400 font-mono">{prod.category.toUpperCase()}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            {prod.ageLabel || prod.targetAgeRange}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-white">{prod.fit}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{prod.waistStyle}</div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-white">
                          {formatINR(prod.price)}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                            prod.stockCount <= 10 ? 'bg-rose-950 text-rose-400 border border-rose-800/40' : 'bg-slate-900 text-emerald-400'
                          }`}>
                            {prod.stockCount} in stock
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(prod)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-rose-200"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: OVERVIEW & SALES IN RUPEES */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-[#0b0f19] p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Sales (INR)</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {formatINR(totalRevenue)}
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">↑ Synced live from Firestore</p>
              </div>

              <div className="bg-[#0b0f19] p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {totalOrdersCount}
                </div>
                <p className="text-[11px] text-slate-400">Across Little, Junior & Teen Boys</p>
              </div>

              <div className="bg-[#0b0f19] p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Average Order Value</span>
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {formatINR(avgOrderValue)}
                </div>
                <p className="text-[11px] text-amber-400 font-medium">Avg ~2 pairs per parent</p>
              </div>

              <div className="bg-[#0b0f19] p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Low Stock SKUs</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
                  {lowStockItems.length} Sizes
                </div>
                <p className="text-[11px] text-rose-400/80">Needs warehouse restock</p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS & PARENTS */}
        {activeTab === 'customers' && (
          <div className="bg-[#0b0f19] rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="font-bold text-base text-white">Registered Parents & Young Men</h3>
            <p className="text-xs text-slate-400">
              Customers shopping for boys bottoms (Ages 3 to 25) stored in Firestore.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                { name: 'Pooja Sharma', email: 'pooja.sharma@example.in', orders: 3, spend: '₹4,897', boyInfo: 'Boy Age 7 • 22W Slim', city: 'Mumbai, MH' },
                { name: 'Rajesh Verma', email: 'rajesh.v@example.in', orders: 2, spend: '₹3,298', boyInfo: 'Boy Age 12 • 26W Cargo', city: 'Bengaluru, KA' },
                { name: 'Karan Mehra', email: 'karan.m@college.in', orders: 4, spend: '₹6,496', boyInfo: 'Age 21 • 30W Baggy Denim', city: 'New Delhi, DL' },
              ].map((cust, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{cust.name}</h4>
                      <p className="text-[10px] text-slate-400">{cust.email}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-900 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div><span className="text-slate-500">Orders:</span> {cust.orders}</div>
                    <div><span className="text-slate-500">Total Spend:</span> <strong className="text-emerald-400 font-mono">{cust.spend}</strong></div>
                    <div><span className="text-slate-500">Preference:</span> {cust.boyInfo}</div>
                    <div><span className="text-slate-500">City:</span> {cust.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 1. EDIT ORDER MODAL (ADMIN CRUD UPDATE) */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b0f19] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto text-left">
            <button
              onClick={() => setEditingOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase">
                  Admin Edit Rights
                </span>
                <span className="font-mono text-white text-sm">#{editingOrder.id}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Update Order Details & Status
              </h3>
              <p className="text-xs text-slate-400">
                Modify customer contact, delivery address, shipping courier, AWB tracking, or order status.
              </p>
            </div>

            <form onSubmit={handleSaveEditOrder} className="space-y-4">
              
              {/* Order Status & Courier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Order Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="processing">📦 Packing / Order Placed</option>
                    <option value="cut_sewn">🧵 Quality Inspected</option>
                    <option value="shipped">🚚 Dispatched (In Transit)</option>
                    <option value="delivered">✅ Delivered</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Courier Partner</label>
                  <input
                    type="text"
                    value={editingOrder.carrier || 'BlueDart Express'}
                    onChange={(e) => setEditingOrder({ ...editingOrder, carrier: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Tracking / AWB & Total Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">AWB Tracking Number</label>
                  <input
                    type="text"
                    value={editingOrder.trackingNumber || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Total Order Value (₹ INR)</label>
                  <input
                    type="number"
                    value={editingOrder.total}
                    onChange={(e) => setEditingOrder({ ...editingOrder, total: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    value={editingOrder.customerName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={editingOrder.userEmail}
                    onChange={(e) => setEditingOrder({ ...editingOrder, userEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingOrder.customerPhone || editingOrder.shippingAddress?.phone || ''}
                    onChange={(e) => setEditingOrder({ 
                      ...editingOrder, 
                      customerPhone: e.target.value,
                      shippingAddress: { ...editingOrder.shippingAddress, phone: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Delivery Address
                </span>
                
                <div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={editingOrder.shippingAddress?.street || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingAddress: { ...editingOrder.shippingAddress, street: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={editingOrder.shippingAddress?.city || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingAddress: { ...editingOrder.shippingAddress, city: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={editingOrder.shippingAddress?.state || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingAddress: { ...editingOrder.shippingAddress, state: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    value={editingOrder.shippingAddress?.zipCode || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingAddress: { ...editingOrder.shippingAddress, zipCode: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Admin Internal Notes / Dispatch Instructions</label>
                <textarea
                  rows={2}
                  value={editingOrder.adminNotes || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, adminNotes: e.target.value })}
                  placeholder="e.g. Priority packing, double-check waistband extender"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setDeletingOrderId(editingOrder.id);
                    setEditingOrder(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-950/80 text-rose-400 hover:bg-rose-900 text-xs font-bold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Order</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Order Changes</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. CREATE MANUAL ORDER MODAL (ADMIN CRUD CREATE) */}
      {isCreatingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b0f19] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto text-left">
            <button
              onClick={() => setIsCreatingOrder(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                  Manual Order Creator
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Book Counter / Phone Order
              </h3>
              <p className="text-xs text-slate-400">
                Directly book an order for a walk-in parent, telephone inquiry, or custom bulk order.
              </p>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4">
              
              {/* Select Product SKU */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Select Product & Sizing
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-slate-300 block mb-1">Product Model</label>
                    <select
                      value={newOrderProductId}
                      onChange={(e) => setNewOrderProductId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} - ₹{p.price} ({p.ageLabel || p.targetAgeRange})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Size</label>
                    <select
                      value={newOrderSize}
                      onChange={(e) => setNewOrderSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono"
                    >
                      <option value="22W (Age 3-4Y)">22W (Age 3-4Y)</option>
                      <option value="24W (Age 5-7Y)">24W (Age 5-7Y)</option>
                      <option value="26W (Age 8-10Y)">26W (Age 8-10Y)</option>
                      <option value="28W (Age 11-13Y)">28W (Age 11-13Y)</option>
                      <option value="30W (Teens 14-17Y)">30W (Teens 14-17Y)</option>
                      <option value="32W (Young Men)">32W (Young Men)</option>
                      <option value="34W (Young Men)">34W (Young Men)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Wash / Color</label>
                    <input
                      type="text"
                      value={newOrderWash}
                      onChange={(e) => setNewOrderWash(e.target.value)}
                      placeholder="e.g. Classic Indigo Wash"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={newOrderQty}
                      onChange={(e) => setNewOrderQty(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Parent / Customer Name</label>
                  <input
                    type="text"
                    value={newOrderCustomer}
                    onChange={(e) => setNewOrderCustomer(e.target.value)}
                    placeholder="e.g. Meera Patel"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    value={newOrderEmail}
                    onChange={(e) => setNewOrderEmail(e.target.value)}
                    placeholder="e.g. meera@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newOrderPhone}
                    onChange={(e) => setNewOrderPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Delivery Address
                </span>
                
                <input
                  type="text"
                  placeholder="Street / Flat / Colony"
                  value={newOrderStreet}
                  onChange={(e) => setNewOrderStreet(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={newOrderCity}
                    onChange={(e) => setNewOrderCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newOrderState}
                    onChange={(e) => setNewOrderState(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    value={newOrderZip}
                    onChange={(e) => setNewOrderZip(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Payment & Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Payment Mode</label>
                  <select
                    value={newOrderPaymentMethod}
                    onChange={(e) => setNewOrderPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="cod">Cash on Delivery (COD)</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Initial Status</label>
                  <select
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="processing">Packing / Order Placed</option>
                    <option value="cut_sewn">QC Inspected</option>
                    <option value="shipped">Dispatched (BlueDart)</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Courier</label>
                  <input
                    type="text"
                    value={newOrderCarrier}
                    onChange={(e) => setNewOrderCarrier(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Order Notes</label>
                <textarea
                  rows={2}
                  value={newOrderNotes}
                  onChange={(e) => setNewOrderNotes(e.target.value)}
                  placeholder="e.g. Customer requested urgent dispatch before Saturday"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingOrder(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Book & Create Order</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 3. DELETE ORDER CONFIRMATION MODAL (ADMIN CRUD DELETE) */}
      {deletingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#0b0f19] rounded-3xl border border-rose-900/60 p-6 space-y-5 shadow-2xl text-left">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">
                Permanently Delete Order #{deletingOrderId}?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This action will delete the order record permanently from Firestore database and local cache. This cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingOrderId(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteOrder}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50"
              >
                Yes, Delete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. VIEW ORDER DETAILS & INVOICE MODAL */}
      {viewingOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0b0f19] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto text-left">
            <button
              onClick={() => setViewingOrderDetails(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">Avon Arts Tax Invoice</span>
                <h3 className="text-lg font-black text-white font-mono">Order #{viewingOrderDetails.id}</h3>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Customer & Date */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-900">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Customer</span>
                  <p className="font-bold text-white text-sm">{viewingOrderDetails.customerName}</p>
                  <p className="text-slate-400">{viewingOrderDetails.userEmail}</p>
                  <p className="text-slate-400">{viewingOrderDetails.customerPhone || viewingOrderDetails.shippingAddress?.phone}</p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Booking Info</span>
                  <p className="text-slate-300">{new Date(viewingOrderDetails.createdAt).toLocaleString()}</p>
                  <p className="text-slate-300">Payment: <strong className="text-emerald-400 uppercase">{viewingOrderDetails.paymentMethod}</strong></p>
                  <p className="text-slate-300">Status: <strong className="text-amber-400 uppercase">{viewingOrderDetails.status}</strong></p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                  Ordered Items
                </span>
                <div className="space-y-2">
                  {viewingOrderDetails.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-900">
                      <div>
                        <h5 className="font-bold text-white">{it.productName}</h5>
                        <p className="text-slate-400 text-[11px]">
                          Size: <strong className="text-amber-400 font-mono">{it.selectedSize}</strong> | Wash: {it.selectedWash} | Qty: {it.quantity}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-white">{formatINR(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-1.5 text-right font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>{formatINR(viewingOrderDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping:</span>
                  <span>{(viewingOrderDetails.shippingFee || 0) === 0 ? 'FREE' : formatINR(viewingOrderDetails.shippingFee || 0)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-amber-400">{formatINR(viewingOrderDetails.total)}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. ADD / EDIT PRODUCT MODAL */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b0f19] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto text-left">
            <button
              onClick={() => setIsAddingProduct(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">
                {editingProduct ? `Edit "${editingProduct.name}"` : "Add New Boy's Bottom to Inventory"}
              </h3>
              <p className="text-xs text-slate-400">
                Data is directly synchronized to the Firestore `products` collection.
              </p>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Model Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Boys Rugged Play Tapered Jeans"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Age Group</label>
                  <select
                    value={formAgeGroup}
                    onChange={(e) => setFormAgeGroup(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="kids-3-7">Little Boys (Age 3–7)</option>
                    <option value="junior-8-14">Junior Boys (Age 8–14)</option>
                    <option value="teens-15-25">Teens & Young Men (Age 15–25)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="jeans">👖 Jeans (Wide Variety & Selvedge)</option>
                    <option value="trackpants">🏃 Track Pants (Active & Terry)</option>
                    <option value="joggers">⚡ Joggers (Terry & Knit Denim)</option>
                    <option value="shorts">🩳 Half Pants & Denim Shorts</option>
                    <option value="cargos">🪖 Tactical Cargos</option>
                    <option value="chinos">👔 Chinos & Trousers</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Fit Silhouette</label>
                  <select
                    value={formFit}
                    onChange={(e) => setFormFit(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Skater Baggy">🛹 90s Skater Baggy</option>
                    <option value="Wide Leg">🌊 Acid Washed Wide Leg</option>
                    <option value="Carpenter Utility">🔨 Y2K Double-Knee Carpenter</option>
                    <option value="Ripped Biker">⚡ Ripped & Distressed Biker</option>
                    <option value="Relaxed Straight">👖 Heritage Relaxed Straight</option>
                    <option value="Slim Tapered">🎯 4-Way Stretch Slim Taper</option>
                    <option value="High Rise Flare">🪩 70s Vintage Flare Denim</option>
                    <option value="Double Knee Work">🛡️ Double Knee Work Jean</option>
                    <option value="Tactical 6-Pocket">🪖 Tactical 6-Pocket</option>
                    <option value="Cuffed Jogger">🏃 Cuffed Heavy French Terry</option>
                    <option value="Drop-Crotch Jogger">🔥 Street Denim Knit Jogger</option>
                    <option value="Classic Fit">👔 Classic Tailored</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Waist Construction</label>
                  <input
                    type="text"
                    value={formWaistStyle}
                    onChange={(e) => setFormWaistStyle(e.target.value)}
                    placeholder="e.g. Inner Button Adjustable Extender Band"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Description & Durability Highlights</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save to Firestore</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

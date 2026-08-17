import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Package, 
  Lock,
  Scissors,
  Smartphone,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Address, Order, formatINR } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    cart, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    currentUser, 
    placeOrder, 
    setActiveTab, 
    showToast 
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states (India defaults)
  const [fullName, setFullName] = useState<string>(currentUser?.displayName || 'Aarav Sharma');
  const [email, setEmail] = useState<string>(currentUser?.email || 'aarav.sharma@example.in');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [street, setStreet] = useState<string>('Flat 402, Nilgiri Heights, Bandra West');
  const [aptSuite, setAptSuite] = useState<string>('Near Hill Road');
  const [city, setCity] = useState<string>('Mumbai');
  const [state, setState] = useState<string>('Maharashtra');
  const [zipCode, setZipCode] = useState<string>('400050');
  const [country, setCountry] = useState<string>('India');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express');
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState<string>('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState<string>('4375 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState<string>('09/29');
  const [cardCvc, setCardCvc] = useState<string>('724');

  if (!isCheckoutOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round(rawSubtotal * 0.15); // 15% discount
  const shippingFee = rawSubtotal >= 999 ? 0 : 99;
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const shippingAddress: Address = {
      fullName,
      street: `${street}, ${aptSuite} (Phone: ${phone})`,
      aptSuite,
      city,
      state,
      zipCode,
      country
    };

    const trackingNum = `AVN-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrderData: Omit<Order, 'id' | 'createdAt'> = {
      userId: currentUser?.uid || 'guest-user',
      userEmail: email,
      customerName: fullName,
      shippingAddress,
      items: cart,
      subtotal: rawSubtotal,
      discount: discountAmount,
      shippingFee,
      total: totalAmount,
      promoCode: 'BOYS15',
      status: 'processing',
      trackingNumber: trackingNum,
      carrier: 'Avon Arts Express BlueDart / Delhivery Partner',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'card' ? 'Visa/Mastercard •••• 8821' : 'Cash on Delivery (COD)',
      timeline: [
        {
          status: 'Order Placed & Confirmed',
          location: 'Avon Arts Workshop & Dispatch, Mumbai Hub',
          timestamp: new Date().toISOString(),
          completed: true,
          description: 'Payment authorized. Boys bottom pattern size verified.'
        },
        {
          status: 'Quality Check & Bar-Tack Stitched',
          location: 'Quality Finishing Lab',
          timestamp: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
          completed: false,
          description: 'Comfort waistband inspected and double-stitch tested.'
        },
        {
          status: 'Packed in Eco-Friendly Bag',
          location: 'Fulfillment Station B',
          timestamp: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
          completed: false,
          description: 'Barcode tagged with Indian courier tracking.'
        },
        {
          status: 'Out for Delivery',
          location: `${city} Delivery Hub`,
          timestamp: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
          completed: false,
          description: 'Courier executive assigned for home delivery.'
        }
      ]
    };

    try {
      const order = await placeOrder(newOrderData);
      setCreatedOrder(order);
      setStep('success');

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // silent
      }

      showToast('Order confirmed and saved to Firestore!', 'success');
    } catch (err) {
      showToast('Failed to place order. Please check inputs.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoToDashboard = () => {
    setIsCheckoutOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-3xl bg-[#0b0f19] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {step === 'success' ? 'Order Confirmed!' : 'Avon Arts Boys Checkout'}
              </h2>
              <p className="text-xs text-slate-400">
                {step === 'success' ? 'Your boy’s bottoms are being prepped for dispatch' : '100% secure Pan-India checkout in Indian Rupees (₹)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          
          {/* SUCCESS SCREEN */}
          {step === 'success' && createdOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Thank You for Shopping at Avon Arts!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Order <strong>#{createdOrder.id}</strong> has been confirmed. Our team is packing the selected sizes for fast express delivery.
                </p>
              </div>

              {/* Order Recap Card */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 max-w-lg mx-auto text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Tracking Code:</span>
                  <span className="font-mono font-bold text-amber-400">{createdOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Est. Delivery Date:</span>
                  <span className="text-white font-medium">{createdOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Payment Mode:</span>
                  <span className="text-emerald-400 font-semibold">{createdOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Amount Paid:</span>
                  <span className="font-mono font-extrabold text-white text-base">{formatINR(createdOrder.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  id="checkout-track-order-btn"
                  onClick={handleGoToDashboard}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>View in Customer Dashboard</span>
                </button>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {/* CHECKOUT STEPS */}
          {step !== 'success' && (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className={`flex items-center gap-1.5 font-bold ${
                    step === 'shipping' ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">1</span>
                  <span>Delivery Address</span>
                </button>
                <span className="text-slate-700">—</span>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className={`flex items-center gap-1.5 font-bold ${
                    step === 'payment' ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">2</span>
                  <span>Payment (UPI / Cards / COD)</span>
                </button>
              </div>

              {/* STEP 1: SHIPPING DETAILS */}
              {step === 'shipping' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-white">Delivery Address in India</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Parent / Customer Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number (for Courier SMS / OTP)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email (for Order Confirmation)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Flat / House No. & Street</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">PIN Code (6 Digits)</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Shipping Speed Options */}
                  <div className="pt-3 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Select Delivery Speed</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label 
                        onClick={() => setShippingMethod('express')}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          shippingMethod === 'express' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="w-5 h-5 text-amber-400" />
                          <div>
                            <p className="text-xs font-bold text-white">Express Air Courier (2-3 Days)</p>
                            <p className="text-[10px] text-slate-400">BlueDart / Delhivery priority flight</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 uppercase">FREE</span>
                      </label>

                      <label 
                        onClick={() => setShippingMethod('standard')}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          shippingMethod === 'standard' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-xs font-bold text-white">Surface Delivery (4-6 Days)</p>
                            <p className="text-[10px] text-slate-400">Standard transport</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-300">FREE</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PAYMENT & ORDER SUMMARY */}
              {step === 'payment' && (
                <div className="space-y-6">
                  
                  {/* Payment selection */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-white">Choose Payment Method</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-semibold ${
                          paymentMethod === 'upi' ? 'bg-amber-500/10 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <Smartphone className="w-5 h-5 text-amber-400" />
                        <span>UPI / GPay / Paytm</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-semibold ${
                          paymentMethod === 'card' ? 'bg-blue-600/10 border-blue-500 text-blue-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <span>Cards / NetBanking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-semibold ${
                          paymentMethod === 'cod' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <Banknote className="w-5 h-5 text-emerald-400" />
                        <span>Cash on Delivery</span>
                      </button>
                    </div>
                  </div>

                  {/* UPI Inputs */}
                  {paymentMethod === 'upi' && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Enter UPI VPA / ID</label>
                        <input
                          type="text"
                          placeholder="e.g. yourname@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        An instant payment request will be sent to your UPI app (Google Pay, PhonePe, Paytm, BHIM).
                      </p>
                    </div>
                  )}

                  {/* Card Inputs */}
                  {paymentMethod === 'card' && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Card Number (Visa / Mastercard / RuPay)</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">CVV</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COD info */}
                  {paymentMethod === 'cod' && (
                    <div className="bg-emerald-950/20 border border-emerald-800/40 p-4 rounded-xl text-xs text-emerald-300 space-y-1">
                      <p className="font-bold">✓ Cash on Delivery Available</p>
                      <p className="text-slate-400">Pay cash or UPI directly to the courier delivery executive upon arrival at your doorstep.</p>
                    </div>
                  )}

                  {/* Final Order Review */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-slate-300 uppercase tracking-wider block">Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between py-1.5 border-b border-slate-900">
                        <span className="text-slate-300">
                          {item.productName} ({item.selectedWash}, Size: <strong>{item.selectedSize}</strong>) x{item.quantity}
                          {item.customHem && <span className="text-amber-400 block text-[10px]">Length: {item.customHem}</span>}
                        </span>
                        <span className="text-white font-mono font-bold">{formatINR(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-slate-400 pt-1">
                      <span>Discount (BOYS15)</span>
                      <span className="text-emerald-400 font-semibold">-{formatINR(discountAmount)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Pan-India Shipping</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                      <span>Total Payable</span>
                      <span className="text-amber-400 font-mono text-base">{formatINR(totalAmount)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      ← Back to Address
                    </button>

                    <button
                      id="complete-order-submit-btn"
                      type="submit"
                      disabled={isProcessing}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-950/50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isProcessing ? 'Confirming Order...' : `Pay & Place Order • ${formatINR(totalAmount)}`}</span>
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

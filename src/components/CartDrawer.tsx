import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Sparkles, 
  Scissors,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../types';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    setIsCheckoutOpen,
    showToast
  } = useStore();

  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>({
    code: 'BOYS15',
    discountPercent: 15
  });

  if (!isCartOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? Math.round(rawSubtotal * (appliedPromo.discountPercent / 100)) : 0;
  const shippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= shippingThreshold || appliedPromo?.code === 'FREESHIP';
  const shippingCost = rawSubtotal === 0 ? 0 : (isFreeShipping ? 0 : 99);
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'BOYS15') {
      setAppliedPromo({ code: 'BOYS15', discountPercent: 15 });
      showToast('Boys Festival code applied: 15% off!', 'success');
    } else if (code === 'FIRSTORDER') {
      setAppliedPromo({ code: 'FIRSTORDER', discountPercent: 20 });
      showToast('Welcome code applied: 20% off your first order!', 'success');
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountPercent: 0 });
      showToast('Free Express Shipping across India applied!', 'success');
    } else {
      showToast('Invalid promo code. Try "BOYS15" or "FIRSTORDER"', 'error');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div 
          id="cart-slideover-panel"
          className="w-screen max-w-md bg-[#0b0f19] border-l border-slate-800 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Boys Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter in INR */}
          <div className="bg-slate-950 p-3.5 border-b border-slate-800 text-xs text-left">
            {rawSubtotal >= shippingThreshold ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Check className="w-4 h-4" />
                <span>🎉 You unlocked FREE Express Delivery anywhere in India!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Add <strong>{formatINR(shippingThreshold - rawSubtotal)}</strong> more for Free Shipping</span>
                  <span className="font-bold text-amber-400">{Math.round((rawSubtotal / shippingThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (rawSubtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-left">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white">Your bag is currently empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our curated bottoms for boys ages 3 to 25.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Explore Bottoms
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3.5 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80"
                >
                  <img 
                    src={item.image} 
                    alt={item.productName} 
                    className="w-20 h-24 object-cover rounded-xl bg-slate-900 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-white line-clamp-1">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                        <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-300 font-bold font-mono">
                          Size: {item.selectedSize}
                        </span>
                        <span>• {item.selectedWash}</span>
                      </div>

                      {item.customHem && (
                        <div className="flex items-center gap-1 text-[10px] text-blue-400 mt-1">
                          <Scissors className="w-3 h-3" />
                          <span>{item.customHem}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                      <span className="font-bold text-sm text-white">
                        {formatINR(item.price * item.quantity)}
                      </span>

                      {/* Quantity adjuster */}
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4 text-left">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Coupon (BOYS15)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculation Table in INR */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Bag Subtotal</span>
                  <span>{formatINR(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Savings ({appliedPromo?.code})</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Pan-India Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : formatINR(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Final Payable Amount</span>
                  <span className="text-amber-400 font-mono text-base">{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Pay • {formatINR(totalAmount)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>UPI, Cards, NetBanking & Cash on Delivery (COD)</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

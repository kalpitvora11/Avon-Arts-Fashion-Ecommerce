import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Scissors, 
  Sparkles, 
  Ruler, 
  Check, 
  MessageSquare, 
  Send, 
  Award,
  Truck,
  RotateCcw,
  Zap,
  Tag
} from 'lucide-react';
import { Product, Review, WashOption, formatINR } from '../types';
import { useStore } from '../context/StoreContext';
import { fetchReviews, addReview } from '../lib/firestoreService';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { wishlist, toggleWishlist, addToCart, currentUser, showToast } = useStore();

  const [selectedWashIndex, setSelectedWashIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '28W');
  const [customHem, setCustomHem] = useState<string>('Standard Inseam');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newFitFeedback, setNewFitFeedback] = useState<'Runs Small' | 'True to Size' | 'Runs Roomy'>('True to Size');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  const isWishlisted = wishlist.includes(product.id);
  const activeWash: WashOption = product.washes[selectedWashIndex] || product.washes[0];

  // Images list: wash image first, then product images
  const allImages = [activeWash.image, ...product.images.filter(img => img !== activeWash.image)];
  const currentImage = allImages[activeImageIndex] || allImages[0];

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

  useEffect(() => {
    const loadProductReviews = async () => {
      setLoadingReviews(true);
      try {
        const data = await fetchReviews(product.id);
        setReviews(data);
      } catch (err) {
        console.warn('Could not fetch reviews:', err);
      } finally {
        setLoadingReviews(false);
      }
    };
    loadProductReviews();
  }, [product.id]);

  const handleWashChange = (index: number) => {
    setSelectedWashIndex(index);
    setActiveImageIndex(0);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${activeWash.code}-${selectedSize}-${customHem.replace(/\s+/g, '')}`,
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: currentImage,
      selectedWash: activeWash.name,
      selectedSize: selectedSize,
      customHem: customHem !== 'Standard Inseam' ? customHem : undefined,
      quantity: 1
    });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast('Please enter your review comments', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      const created = await addReview({
        productId: product.id,
        userId: currentUser?.uid || 'guest-reviewer',
        userName: currentUser?.displayName || 'Verified Parent / Buyer',
        rating: newRating,
        fitFeedback: newFitFeedback,
        title: newTitle.trim() || 'Great durable bottom for daily wear',
        comment: newComment.trim(),
        verifiedBuyer: true,
        helpfulCount: 0
      });

      setReviews(prev => [created, ...prev]);
      setIsWritingReview(false);
      setNewComment('');
      setNewTitle('');
      showToast('Thank you for reviewing! Your review is now live.', 'success');
    } catch (err) {
      showToast('Could not save review, please try again.', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-5xl bg-[#0b0f19] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Floating Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8 text-left">
          
          {/* Top Section: Gallery & Purchase Options */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Gallery (Col 6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <img 
                  src={currentImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                
                {/* Age & Fabric Spec tag */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
                    <span className="font-mono text-amber-400 font-bold">{product.fabricWeight}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-emerald-400 font-bold backdrop-blur-md">
                    {product.ageLabel || product.targetAgeRange}
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Angle view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Configuration (Col 6) */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                    {product.ageLabel || product.targetAgeRange}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60 text-[10px] font-bold uppercase tracking-wider">
                    {product.fit}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-semibold">
                    {product.rise}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-400 text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-200">{product.rating} / 5.0</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    ({product.reviewCount} verified reviews)
                  </button>
                </div>

                {/* Price in Rupees (₹) */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-extrabold text-white">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-500 line-through font-medium">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent && discountPercent > 0 && (
                    <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-2.5 py-0.5 rounded-full">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                  ✓ Inclusive of all taxes • Free delivery across India on this item
                </p>
              </div>

              {/* Waistband & Comfort Features */}
              {product.waistStyle && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Waist Comfort:</strong> {product.waistStyle}</span>
                </div>
              )}

              {/* Story summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color / Wash Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider">
                    Wash: <span className="text-amber-400">{activeWash.name}</span>
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono">{activeWash.code}</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.washes.map((wash, index) => (
                    <button
                      key={wash.code}
                      onClick={() => handleWashChange(index)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedWashIndex === index 
                          ? 'bg-slate-900 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-slate-600 shrink-0" 
                        style={{ backgroundColor: wash.colorHex }} 
                      />
                      <span>{wash.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider">
                    Select Boy's Size ({product.ageLabel || 'Age 3–25'})
                  </span>
                  <span className="text-blue-400 text-[11px] flex items-center gap-1 font-semibold">
                    <Ruler className="w-3.5 h-3.5" /> Room to Grow Cut
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center ${
                        selectedSize === sz
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-105'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Length/Inseam */}
              <div className="space-y-2 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5" />
                    Complimentary Custom Length Adjustment
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Free Service</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    'Standard Inseam',
                    'Cuffed / Ankle Cut (-1")',
                    'Extended Length (+1")',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setCustomHem(option)}
                      className={`p-2 rounded-lg text-center font-medium transition-colors text-[11px] ${
                        customHem === option 
                          ? 'bg-blue-950 text-blue-300 border border-blue-700 font-bold' 
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Bag • {formatINR(product.price)}</span>
                </button>

                <button
                  id="modal-wishlist-toggle-btn"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    isWishlisted 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' 
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
                  }`}
                  title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Value Props Micro Bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dispatches in 24h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>7-Day Size Exchange</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Play-Proof Guarantee</span>
                </div>
              </div>

            </div>

          </div>

          {/* Lower Tabs: Details & Story / Fabric Specs / Verified Reviews */}
          <div className="border-t border-slate-800 pt-6">
            
            {/* Tab buttons */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              {[
                { id: 'details', label: 'Play-Proof Construction & Details' },
                { id: 'specs', label: 'Fabric & Mill Specs' },
                { id: 'reviews', label: `Verified Reviews (${reviews.length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">The Story & Design Intent</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{product.story}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Key Boy-Friendly Features</h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Mill Specs Tab */}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Mill Origin</span>
                    <strong className="text-sm text-white">{product.millOrigin}</strong>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Fabric Weight</span>
                    <strong className="text-sm text-amber-400 font-mono">{product.fabricWeight}</strong>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Stretch Level</span>
                    <strong className="text-sm text-white">{product.stretch}</strong>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Hardware & Stitch</span>
                    <strong className="text-sm text-white">Rust-Proof Rivets + Bar-Tack</strong>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-extrabold text-white font-mono">{product.rating}</div>
                      <div>
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Based on {reviews.length} authentic customer reviews</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsWritingReview(!isWritingReview)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{isWritingReview ? 'Cancel' : 'Write a Review'}</span>
                    </button>
                  </div>

                  {/* Review Submission Form */}
                  {isWritingReview && (
                    <form onSubmit={handleReviewSubmit} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700 space-y-4">
                      <h4 className="font-bold text-sm text-white">Share Your Review & Sizing Feedback</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">Star Rating</label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewRating(star)}
                                className="p-1"
                              >
                                <Star className={`w-5 h-5 ${newRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1">Fit for Boy's Age/Height</label>
                          <select
                            value={newFitFeedback}
                            onChange={(e) => setNewFitFeedback(e.target.value as any)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                          >
                            <option value="Runs Small">Runs Snug (Order 1 size up)</option>
                            <option value="True to Size">True to Size (Accurate chart)</option>
                            <option value="Runs Roomy">Roomy / Great growth room</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Headline</label>
                        <input
                          type="text"
                          placeholder="e.g. Tough denim for an active 7 year old!"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Your Feedback</label>
                        <textarea
                          rows={3}
                          placeholder="How did the waist fit? Did it survive park play and washing?..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submittingReview ? 'Publishing...' : 'Post Review'}</span>
                      </button>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">{rev.userName}</span>
                            {rev.verifiedBuyer && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/50 text-[10px] font-medium flex items-center gap-1">
                                <Check className="w-2.5 h-2.5" /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} className={`w-3 h-3 ${rev.rating >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-slate-300">{rev.title}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                            Fit: {rev.fitFeedback}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp, Sparkles, MessageSquareQuote } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CustomerReviewCard {
  id: string;
  author: string;
  location: string;
  agePurchasedFor: string;
  productName: string;
  fitScore: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  userPhoto?: string;
}

export const OffdutyReviews: React.FC = () => {
  const { theme } = useStore();
  const isLight = theme === 'studio-light';

  const REVIEWS: CustomerReviewCard[] = [
    {
      id: 'rev-1',
      author: 'Rohit Shenoy',
      location: 'Bandra West, Mumbai',
      agePurchasedFor: '21 Yrs (Teens & College)',
      productName: '14.5oz Raw Redline Selvedge Skater Baggy',
      fitScore: 'Fits True to Size • Perfect Puddle Drape',
      rating: 5,
      date: '2 days ago',
      comment: 'Insane quality! I have bought baggy jeans from multiple fast fashion brands, but this 14.5oz heavyweight selvedge denim from Avon Arts is on another level. The redline coin pocket and ankle drape over my sneakers is 10/10.',
      verified: true,
      userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'rev-2',
      author: 'Pooja Agarwal (Mom of 2)',
      location: 'Koramangala, Bengaluru',
      agePurchasedFor: 'Ages 6 & 11 Yrs',
      productName: 'Kids & Junior Growth-Elastic Denim & Cargos',
      fitScore: 'Fits True to Size • Adjustable Waist Lifesaver',
      rating: 5,
      date: '5 days ago',
      comment: 'As a mom of active boys, pants usually rip at the knees in 2 months. Blue Duck double-reinforced knee stitching and the internal buttonhole elastic that expands as they grow is pure genius. Ordered 4 more pairs!',
      verified: true,
      userPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'rev-3',
      author: 'Aakash Verma',
      location: 'South Extension, New Delhi',
      agePurchasedFor: '19 Yrs (College Creator)',
      productName: 'Tactical Parachute 6-Pocket Multi Cargo',
      fitScore: 'Relaxed Street Fit • Deep Zip Pockets',
      rating: 5,
      date: '1 week ago',
      comment: 'The ankle bungee cinch cords let you switch between wide-leg baggy and tapered jogger style instantly. Super breathable pure cotton twill. Received in Delhi in just 2 days with free delivery.',
      verified: true,
      userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <section className={`py-14 border-b transition-colors ${
      isLight ? 'bg-white border-slate-200' : 'bg-[#070b13] border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Stats bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="space-y-2 text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#E52020] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> VERIFIED REVIEWS & STREET RATINGS
            </span>
            <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              Rated 4.9/5 by 14,000+ Indian Shoppers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Real feedback from parents, teenagers, and college students across 19,000+ Indian PIN codes.
            </p>
          </div>

          {/* Quick Fit Statistics */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-2xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-amber-400">4.9 ★</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Average Rating</div>
            </div>

            <div className={`p-3.5 rounded-2xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">94%</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">True to Size</div>
            </div>

            <div className={`p-3.5 rounded-2xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-red-500">100%</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Cotton Twill</div>
            </div>
          </div>
        </div>

        {/* Customer Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 rounded-2xl border space-y-4 flex flex-col justify-between transition-all ${
                isLight 
                  ? 'bg-slate-50 border-slate-200 shadow-sm hover:shadow-md' 
                  : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>

                {/* Fit meter pill */}
                <div className="inline-block px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20">
                  {rev.fitScore}
                </div>

                {/* Comment quote */}
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  "{rev.comment}"
                </p>
              </div>

              {/* Author and product metadata */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center gap-3">
                {rev.userPhoto && (
                  <img
                    src={rev.userPhoto}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500/30"
                  />
                )}
                <div>
                  <h4 className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {rev.author}
                  </h4>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {rev.location} • <span className="text-slate-400">{rev.productName}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

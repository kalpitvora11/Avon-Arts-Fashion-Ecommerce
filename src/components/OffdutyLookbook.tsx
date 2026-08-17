import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Flame, Sparkles, ShoppingBag, Eye, Heart, Star, CheckCircle, ArrowRight, Instagram } from 'lucide-react';
import { formatINR } from '../types';

interface LookbookItem {
  id: string;
  title: string;
  creatorTag: string;
  city: string;
  image: string;
  outfitBreakdown: string;
  matchedProductId: string;
  productName: string;
  productPrice: number;
  productFit: string;
  tag: string;
}

export const OffdutyLookbook: React.FC = () => {
  const { products, setSelectedProduct, addToCart, theme, setActiveTab } = useStore();
  const [activeLookIndex, setActiveLookIndex] = useState<number>(0);
  const isLight = theme === 'studio-light';

  const LOOKBOOK_ITEMS: LookbookItem[] = [
    {
      id: 'look-1',
      title: '90s Japan Baggy & Vintage Dunk Lows',
      creatorTag: '@kabir_streetwear',
      city: 'Bandra, Mumbai',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
      outfitBreakdown: 'Blue Duck® 14.5oz Raw Redline Selvedge Skater Baggy paired with boxy heavyweight tee and platform skate sneakers.',
      matchedProductId: 'blue-duck-selvedge-baggy-01',
      productName: '14.5oz Raw Redline Selvedge Skater Baggy',
      productPrice: 2999,
      productFit: 'Skater Baggy',
      tag: '🔥 VIRAL FIT'
    },
    {
      id: 'look-2',
      title: 'Tactical Parachute 6-Pocket In Olive Drab',
      creatorTag: '@arjun_stylefile',
      city: 'Indiranagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      outfitBreakdown: 'Heavyweight ripstop multi-cargo with bungee ankle cinch toggles. Built for campus and motorcycle rides.',
      matchedProductId: 'blue-duck-parachute-cargo-01',
      productName: 'Tactical Parachute 6-Pocket Multi Cargo',
      productPrice: 2499,
      productFit: 'Tactical 6-Pocket',
      tag: 'BESTSELLER'
    },
    {
      id: 'look-3',
      title: 'Pumice Marble Acid Washed Wide-Leg',
      creatorTag: '@rohan_fits',
      city: 'Hauz Khas, New Delhi',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      outfitBreakdown: 'Artisan pumice-stone 90s vintage wash with generous leg opening and authentic natural puddle hem drape.',
      matchedProductId: 'blue-duck-acid-wideleg-02',
      productName: '90s Vintage Acid Washed Wide-Leg Denim',
      productPrice: 2499,
      productFit: 'Wide Leg',
      tag: 'STREET HERO'
    },
    {
      id: 'look-4',
      title: 'Double-Knee Carpenter Work Jean',
      creatorTag: '@dev_creatives',
      city: 'Koregaon Park, Pune',
      image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      outfitBreakdown: 'Heritage hammer loop with dual knee reinforcement panels, antique copper hardware, and relaxed straight drape.',
      matchedProductId: 'blue-duck-carpenter-work-03',
      productName: 'Double-Knee Carpenter Utility Work Jean',
      productPrice: 2699,
      productFit: 'Carpenter Utility',
      tag: 'DURABILITY 10/10'
    }
  ];

  const handleProductSelect = (productId: string) => {
    const found = products.find(p => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    } else if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  };

  const handleQuickAddLook = (look: LookbookItem) => {
    const found = products.find(p => p.id === look.matchedProductId) || products[0];
    if (found) {
      addToCart({
        id: `${found.id}-${found.washes[0]?.code || 'default'}-${found.sizes[0] || '28W'}`,
        productId: found.id,
        productName: found.name,
        price: found.price,
        image: found.washes[0]?.image || found.images[0],
        selectedWash: found.washes[0]?.name || 'Standard Wash',
        selectedSize: found.sizes[0] || '28W',
        quantity: 1
      });
    }
  };

  return (
    <section className={`py-12 border-b transition-colors ${
      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060911] border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5" />
              <span>OFFDUTY STREET STYLE LOOKBOOK</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Styled On Indian Streets
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Real creators, skaters, and college students rocking Blue Duck® Japan Baggy and Tactical Cargos across Mumbai, Delhi, and Bangalore.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>Shop All Street Drops</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lookbook 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_ITEMS.map((look, index) => {
            return (
              <div
                key={look.id}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col text-left ${
                  isLight 
                    ? 'bg-white border-slate-200 hover:border-red-500/60 shadow-md hover:shadow-xl' 
                    : 'bg-[#0a0f1b] border-slate-800 hover:border-red-500/60 hover:shadow-red-950/20'
                }`}
              >
                {/* Look Visual */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[9px] font-black uppercase tracking-wider shadow">
                      {look.tag}
                    </span>
                  </div>

                  {/* Creator Tag & City */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-amber-400">{look.creatorTag}</span>
                      <span className="text-[10px] text-slate-300">{look.city}</span>
                    </div>
                    <p className="text-xs font-bold leading-tight line-clamp-1">
                      {look.title}
                    </p>
                  </div>
                </div>

                {/* Bottom Product Info & Quick Buy Button */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                      {look.productFit}
                    </span>
                    <h3 className={`text-xs font-extrabold line-clamp-1 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {look.productName}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-black text-[#E52020]">
                        {formatINR(look.productPrice)}
                      </span>
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Free Express Ship
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleProductSelect(look.matchedProductId)}
                      className={`flex-1 py-2 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Fit</span>
                    </button>

                    <button
                      onClick={() => handleQuickAddLook(look)}
                      className="flex-1 py-2 rounded-xl bg-[#E52020] hover:bg-red-600 text-white text-[11px] font-black transition-all flex items-center justify-center gap-1 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

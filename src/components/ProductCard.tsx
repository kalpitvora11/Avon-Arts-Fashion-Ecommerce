import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check, ShieldCheck, Sparkles, Tag, Zap, CheckCircle2 } from 'lucide-react';
import { Product, formatINR } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, setSelectedProduct, addToCart, theme, showToast } = useStore();
  const [selectedWashIndex, setSelectedWashIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '28W');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const isLight = theme === 'studio-light';
  const isWishlisted = wishlist.includes(product.id);
  const activeWash = product.washes[selectedWashIndex] || product.washes[0];
  
  // Secondary image on hover
  const primaryImage = activeWash?.image || product.images[0];
  const secondaryImage = product.images[1] || product.images[0] || primaryImage;
  const currentImage = (isHovered && secondaryImage) ? secondaryImage : primaryImage;

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

  const handleSizeQuickBuy = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart({
      id: `${product.id}-${activeWash.code}-${size}`,
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: primaryImage,
      selectedWash: activeWash.name,
      selectedSize: size,
      quantity: 1
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  // Color badge for age group
  const getAgeBadgeColor = () => {
    switch(product.ageGroup) {
      case 'kids-3-7':
        return isLight 
          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'junior-8-14':
        return isLight 
          ? 'bg-blue-100 text-blue-800 border-blue-300' 
          : 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'teens-15-25':
      default:
        return isLight 
          ? 'bg-red-100 text-red-800 border-red-300' 
          : 'bg-red-500/20 text-red-300 border-red-500/40';
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer text-left ${
        isLight 
          ? 'bg-white border-slate-200 hover:border-slate-900/60 hover:shadow-xl' 
          : 'bg-[#090d18] border-slate-800 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/20'
      }`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
        <img 
          src={currentImage} 
          alt={`${product.name} - ${activeWash.name}`}
          className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Offduty Tags & Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start pointer-events-none">
          {/* Age Tag */}
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border shadow-md backdrop-blur-md ${getAgeBadgeColor()}`}>
            {product.ageLabel || product.targetAgeRange}
          </span>

          {discountPercent && discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded bg-[#E52020] text-white text-[9px] font-black uppercase tracking-wider shadow">
              {discountPercent}% OFF
            </span>
          )}

          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow">
              BESTSELLER
            </span>
          )}

          {product.fabricWeight.includes('Selvedge') && (
            <span className="px-2 py-0.5 rounded bg-black/80 text-red-400 border border-red-500/50 text-[8px] font-mono font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              14.5oz Selvedge
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' 
              : isLight 
              ? 'bg-white/90 text-slate-700 hover:text-red-600 border border-slate-200 shadow-sm' 
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-900'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick Size Selector Drawer on Card Bottom (Offduty signature 1-click shop) */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-2 bottom-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
        >
          <div className={`p-2 rounded-xl backdrop-blur-md border shadow-2xl space-y-1.5 ${
            isLight ? 'bg-white/95 border-slate-300' : 'bg-slate-950/95 border-slate-700'
          }`}>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
              <span>Quick Add Size</span>
              {justAdded && (
                <span className="text-emerald-500 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Added to Bag
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleSizeQuickBuy(e, sz)}
                  className={`flex-1 min-w-[38px] py-1 px-1 rounded-lg text-[10px] font-black border transition-all text-center ${
                    selectedSize === sz
                      ? 'bg-red-600 text-white border-red-500 shadow-sm'
                      : isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200' 
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-left">
        
        <div className="space-y-1.5">
          {/* Fit & Age subtitle */}
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-black text-[#E52020] uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 fill-red-500" />
              {product.fit}
            </span>
            <span className="text-slate-500 font-mono">
              {product.fabricWeight.split(' ')[0]}
            </span>
          </div>

          {/* Product Name */}
          <h3 className={`font-extrabold text-sm line-clamp-1 group-hover:text-red-500 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {product.name}
          </h3>

          {/* Waist Band / Special feature note */}
          {product.waistStyle && (
            <p className={`text-[10px] font-medium truncate text-slate-400`}>
              • {product.waistStyle}
            </p>
          )}

          {/* Rating */}
          <div className={`flex items-center gap-1.5 text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-extrabold">{product.rating}</span>
            <span className="text-[10px] text-slate-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Wash Swatches Selector */}
        <div className={`space-y-1.5 text-left pt-2 border-t ${
          isLight ? 'border-slate-100' : 'border-slate-800/60'
        }`}>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Wash: <strong className={isLight ? 'text-slate-800' : 'text-slate-200'}>{activeWash.name}</strong></span>
            <span>{product.washes.length} Shades</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            {product.washes.map((wash, index) => (
              <button
                key={wash.code}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWashIndex(index);
                }}
                className={`w-5 h-5 rounded-full border transition-all ${
                  selectedWashIndex === index 
                    ? 'border-red-500 ring-2 ring-red-500/50 scale-110' 
                    : isLight ? 'border-slate-300 hover:border-slate-500' : 'border-slate-700 hover:border-slate-400'
                }`}
                style={{ backgroundColor: wash.colorHex }}
                title={wash.name}
              />
            ))}
          </div>
        </div>

        {/* Price in Rupees (₹) & Urgent Stock info */}
        <div className={`flex items-baseline justify-between pt-2 border-t ${
          isLight ? 'border-slate-100' : 'border-slate-800/80'
        }`}>
          <div className="flex items-baseline gap-2">
            <span className={`text-base font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            product.stockCount <= 5 
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
              : isLight 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          }`}>
            {product.stockCount <= 5 ? `⚡ Only ${product.stockCount} left` : 'In Stock'}
          </span>
        </div>

      </div>
    </div>
  );
};

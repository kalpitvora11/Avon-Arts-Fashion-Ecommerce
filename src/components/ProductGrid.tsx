import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Search, 
  Check, 
  ArrowUpDown,
  RefreshCw,
  Baby,
  Smile,
  Zap,
  Ruler,
  Layers
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';
import { FitType, BottomCategory, AgeGroup, formatINR } from '../types';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    loadingProducts, 
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
    activeTab,
    refreshProducts,
    theme
  } = useStore();

  const isLight = theme === 'studio-light';

  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [selectedStretch, setSelectedStretch] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number>(4500);
  const [selectedWaistStyle, setSelectedWaistStyle] = useState<string>('all');

  // Available Fits (covering the entire wide variety of jeans, joggers, track pants, and cargos)
  const ALL_FITS: { id: FitType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Cuts & Silhouettes' },
    { id: 'Skater Baggy', label: '🛹 90s Skater Baggy Denim' },
    { id: 'Wide Leg', label: '🌊 Acid Washed Wide Leg' },
    { id: 'Carpenter Utility', label: '🔨 Y2K Double-Knee Carpenter' },
    { id: 'Ripped Biker', label: '⚡ Ripped & Distressed Moto Biker' },
    { id: 'Relaxed Straight', label: '👖 Heritage Relaxed Straight' },
    { id: 'Slim Tapered', label: '🎯 4-Way Stretch Slim Taper' },
    { id: 'High Rise Flare', label: '🪩 70s Vintage Flare Denim' },
    { id: 'Double Knee Work', label: '🛡️ Double Knee Work Jean' },
    { id: 'Tactical 6-Pocket', label: '🪖 Tactical 6-Pocket Cargo' },
    { id: 'Cuffed Jogger', label: '🏃 Cuffed Heavy French Terry Jogger' },
    { id: 'Drop-Crotch Jogger', label: '🔥 Street Denim Knit Jogger' },
    { id: 'Classic Fit', label: '👔 Classic Tailored Chino' }
  ];

  // Active age filter resolution based on tab
  const effectiveAgeGroup = useMemo(() => {
    if (activeTab === 'kids') return 'kids-3-7';
    if (activeTab === 'junior') return 'junior-8-14';
    if (activeTab === 'teens') return 'teens-15-25';
    return filterAgeGroup;
  }, [activeTab, filterAgeGroup]);

  // Active category filter resolution based on tab
  const effectiveCategory = useMemo(() => {
    if (activeTab === 'jeans') return 'jeans';
    if (activeTab === 'trackpants') return 'trackpants';
    if (activeTab === 'joggers') return 'joggers';
    if (activeTab === 'halfpants' || activeTab === 'shorts') return 'shorts';
    if (activeTab === 'cargos') return 'cargos';
    if (activeTab === 'chinos') return 'chinos';
    return filterCategory;
  }, [activeTab, filterCategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesFit = product.fit.toLowerCase().includes(q);
        const matchesAge = (product.ageLabel || '').toLowerCase().includes(q) || (product.targetAgeRange || '').toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesWash = product.washes.some(w => w.name.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesFit && !matchesAge && !matchesCat && !matchesWash) {
          return false;
        }
      }

      // Age Group Filter
      if (effectiveAgeGroup !== 'all') {
        if (product.ageGroup !== effectiveAgeGroup) {
          return false;
        }
      }

      // Category Filter (jeans, trackpants, joggers, shorts/halfpants, cargos, chinos)
      if (effectiveCategory !== 'all') {
        if (effectiveCategory === 'shorts' || effectiveCategory === 'halfpants') {
          if (product.category !== 'shorts' && product.category !== 'halfpants') return false;
        } else if (product.category !== effectiveCategory) {
          return false;
        }
      }

      // Fit Filter
      if (filterFit !== 'all' && product.fit !== filterFit) {
        return false;
      }

      // Waist Style Filter
      if (selectedWaistStyle !== 'all') {
        if (!product.waistStyle?.toLowerCase().includes(selectedWaistStyle.toLowerCase())) {
          return false;
        }
      }

      // Stretch filter
      if (selectedStretch !== 'all') {
        if (!product.stretch.toLowerCase().includes(selectedStretch.toLowerCase())) {
          return false;
        }
      }

      // Stock filter
      if (onlyInStock && (!product.inStock || product.stockCount <= 0)) {
        return false;
      }

      // Price filter in INR
      if (product.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortOption === 'age') {
        const order: Record<string, number> = { 'kids-3-7': 1, 'junior-8-14': 2, 'teens-15-25': 3, 'all-ages': 4, 'all': 0 };
        return (order[a.ageGroup || 'kids-3-7'] || 0) - (order[b.ageGroup || 'kids-3-7'] || 0);
      }
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, searchQuery, effectiveAgeGroup, effectiveCategory, filterFit, selectedWaistStyle, selectedStretch, onlyInStock, priceRange, sortOption]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setFilterFit('all');
    setFilterAgeGroup('all');
    setFilterCategory('all');
    setFilterWash('all');
    setSelectedStretch('all');
    setSelectedWaistStyle('all');
    setOnlyInStock(false);
    setPriceRange(4500);
  };

  const getPageTitle = () => {
    if (activeTab === 'kids') return "Little Boys Bottomwear (Age 3 to 7)";
    if (activeTab === 'junior') return "Junior Boys Collection (Age 8 to 14)";
    if (activeTab === 'teens') return "Teens & Young Men Archive (Age 15 to 25)";
    if (effectiveCategory === 'jeans') return "Premium Boys Jeans (Wide Variety & Selvedge)";
    if (effectiveCategory === 'trackpants') return "Performance & Hyper-Stretch Track Pants";
    if (effectiveCategory === 'joggers') return "Heavy French Terry & Knit Denim Joggers";
    if (effectiveCategory === 'shorts' || effectiveCategory === 'halfpants') return "Boys Half Pants, Jorts & Tactical Cargo Shorts";
    if (effectiveCategory === 'cargos') return "Tactical & Parachute Cargos for Boys";
    if (effectiveCategory === 'chinos') return "Smart Cotton Chinos & Formal Bottoms";
    return "All Boys Bottoms Catalog (Ages 3 to 25)";
  };

  const getPageSubtitle = () => {
    if (activeTab === 'kids') return "Crafted with pinch-free inner elastic waistbands, reinforced double knee patches, and ultra-soft cotton stretch.";
    if (activeTab === 'junior') return "Built for school, skate parks, and active sports with durable twill, concealed button adjusters, and roomier silhouettes.";
    if (activeTab === 'teens') return "Authentic 14.5oz shuttle-loomed selvedge denim, 90s skater baggy silhouettes, acid washes, and college utility wear.";
    if (effectiveCategory === 'jeans') return "Explore raw selvedge, skater baggy, acid wash wide-leg, double-knee carpenter, distressed moto, and slim tapered jeans with minimum price ₹1,999.";
    if (effectiveCategory === 'trackpants') return "Pro-tech poly-spandex active track pants and retro side-stripe fleece pants engineered for active boys.";
    if (effectiveCategory === 'joggers') return "Heavy 450GSM organic French terry and indigo knit denim hybrid joggers with 2x2 ribbed cuffs.";
    if (effectiveCategory === 'shorts') return "90s raw-hem skater denim jorts, ripstop tactical cargo half pants, and summer graphic terry shorts.";
    return "Explore our complete curated catalog of jeans, track pants, joggers, half pants, tactical cargos, and chinos designed exclusively for boys.";
  };

  return (
    <section className={`py-8 min-h-screen transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#070a12] text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Bar & Quick Stats */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between pb-6 border-b gap-4 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div className="text-left space-y-1.5">
            <span className="text-xs font-extrabold text-[#E52020] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Blue Duck® Avon Arts Boys Collection
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {getPageTitle()}
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {getPageSubtitle()}
            </p>
          </div>

          {/* Sort & Mobile Filter Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            
            {/* Mobile Filter Toggle */}
            <button
              id="mobile-filter-drawer-btn"
              onClick={() => setMobileFilterOpen(true)}
              className={`lg:hidden px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 shadow ${
                isLight 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E52020]" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 text-xs ${
              isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
            }`}>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="text-slate-400 hidden sm:inline font-semibold">Sort:</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`bg-transparent font-bold focus:outline-none cursor-pointer ${
                  isLight ? 'text-slate-900' : 'text-slate-200'
                }`}
              >
                <option value="featured" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  Featured / Best Matches
                </option>
                <option value="price-low" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  Price: Low to High (₹)
                </option>
                <option value="price-high" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  Price: High to Low (₹)
                </option>
                <option value="rating" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  Highest Customer Rating
                </option>
                <option value="reviews" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  Most Reviewed Bottoms
                </option>
                <option value="age" className={isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  Age: Youngest First (3Y → 25Y)
                </option>
              </select>
            </div>

            {/* Refresh Catalog */}
            <button
              onClick={refreshProducts}
              className={`p-2.5 rounded-xl border transition-colors ${
                isLight 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Refresh inventory"
            >
              <RefreshCw className={`w-4 h-4 ${loadingProducts ? 'animate-spin text-[#E52020]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quick Age Demographic Pill Bar */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Boy's Age:
          </span>
          {[
            { id: 'all', label: 'All Ages (3–25Y)', icon: null },
            { id: 'kids-3-7', label: 'Little Boys (3–7Y)', icon: '🧒' },
            { id: 'junior-8-14', label: 'Junior (8–14Y)', icon: '🛹' },
            { id: 'teens-15-25', label: 'Teens & College (15–25Y)', icon: '⚡' },
          ].map((ag) => (
            <button
              key={ag.id}
              onClick={() => setFilterAgeGroup(ag.id)}
              className={`px-3.5 py-1.5 rounded-xl font-extrabold shrink-0 transition-all flex items-center gap-1.5 ${
                effectiveAgeGroup === ag.id
                  ? 'bg-[#E52020] text-white shadow-md shadow-red-900/30'
                  : isLight 
                  ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400' 
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {ag.icon && <span>{ag.icon}</span>}
              <span>{ag.label}</span>
            </button>
          ))}
        </div>

        {/* Systematic Category Chips Bar */}
        <div className="pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Category:
          </span>
          {[
            { id: 'all', label: '🔥 All Bottoms' },
            { id: 'jeans', label: '👖 Jeans (Wide Variety)' },
            { id: 'trackpants', label: '🏃 Track Pants' },
            { id: 'joggers', label: '⚡ Joggers' },
            { id: 'shorts', label: '🩳 Half Pants & Shorts' },
            { id: 'cargos', label: '🪖 Tactical Cargos' },
            { id: 'chinos', label: '👔 Cotton Chinos' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                effectiveCategory === cat.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : isLight 
                  ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400' 
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid Layout with Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 text-left">
            <div className={`rounded-2xl border p-5 space-y-6 sticky top-28 ${
              isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-[#0b0f19] border-slate-800'
            }`}>
              
              <div className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-100' : 'border-slate-800'
              }`}>
                <span className={`font-bold text-sm flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  <Filter className="w-4 h-4 text-[#E52020]" />
                  Filter Catalog ({filteredProducts.length})
                </span>
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-red-500 hover:text-red-400 font-bold"
                >
                  Clear All
                </button>
              </div>

              {/* Fit / Silhouette Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Fit & Cut Style
                </label>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {ALL_FITS.map(fit => (
                    <button
                      key={fit.id}
                      onClick={() => setFilterFit(fit.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                        filterFit === fit.id
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="truncate">{fit.label}</span>
                      {filterFit === fit.id && <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Waistband Construction Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Waistband Construction
                </label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Waist Styles' },
                    { id: 'Adjustable', label: 'Inner Adjustable Elastic (Growth)' },
                    { id: 'Drawstring', label: 'Drawstring & Ribbed Waist' },
                    { id: 'Belt', label: 'Belt Loops + Metal Shank' },
                  ].map(w => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWaistStyle(w.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                        selectedWaistStyle === w.id
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{w.label}</span>
                      {selectedWaistStyle === w.id && <Check className="w-3.5 h-3.5 text-red-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider (starts from ₹1,999) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Max Price</span>
                  <span className="font-bold text-[#E52020] font-mono">{formatINR(priceRange)}</span>
                </div>
                <input
                  id="price-range-slider"
                  type="range"
                  min="1999"
                  max="4500"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E52020]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>₹1,999</span>
                  <span>₹4,500</span>
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className={`pt-3 border-t ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className={`text-xs font-semibold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                    Ready to Ship (In Stock)
                  </span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[#E52020] focus:ring-red-500/50"
                  />
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid Cards Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className={`text-center py-16 rounded-2xl border p-8 space-y-4 ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0b0f19] border-slate-800'
              }`}>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  No bottoms found matching your filter
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting the age demographic, category type, or clearing active filters to see our full range from ages 3 to 25.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#E52020] hover:bg-red-600 text-white text-xs font-bold transition-colors shadow"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0b0f19] rounded-2xl border border-slate-800 p-6 space-y-6 max-h-[85vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#E52020]" /> Filter Boys Bottoms
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Age Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Age Group</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Ages (3–25Y)' },
                  { id: 'kids-3-7', label: 'Little Boys (3-7Y)' },
                  { id: 'junior-8-14', label: 'Junior (8-14Y)' },
                  { id: 'teens-15-25', label: 'Teens & Men (15-25Y)' },
                ].map(ag => (
                  <button
                    key={ag.id}
                    onClick={() => setFilterAgeGroup(ag.id)}
                    className={`p-2 rounded-lg text-xs font-bold text-center ${
                      effectiveAgeGroup === ag.id ? 'bg-[#E52020] text-white' : 'bg-slate-900 text-slate-300'
                    }`}
                  >
                    {ag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'jeans', label: 'Jeans' },
                  { id: 'trackpants', label: 'Track Pants' },
                  { id: 'joggers', label: 'Joggers' },
                  { id: 'shorts', label: 'Half Pants / Shorts' },
                  { id: 'cargos', label: 'Tactical Cargos' },
                  { id: 'chinos', label: 'Chinos' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setFilterCategory(c.id)}
                    className={`p-2 rounded-lg text-xs font-bold text-center ${
                      effectiveCategory === c.id ? 'bg-[#E52020] text-white' : 'bg-slate-900 text-slate-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider (starts at ₹1,999) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-bold">Max Budget</span>
                <span className="font-bold text-[#E52020] font-mono">{formatINR(priceRange)}</span>
              </div>
              <input
                type="range"
                min="1999"
                max="4500"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none accent-[#E52020]"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => { resetAllFilters(); setMobileFilterOpen(false); }}
                className="flex-1 py-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#E52020] text-white text-xs font-bold"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

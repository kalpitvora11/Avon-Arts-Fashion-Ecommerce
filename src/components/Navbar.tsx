import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  LogOut, 
  Package, 
  LayoutDashboard,
  CheckCircle2,
  Ruler,
  Building2,
  Phone,
  Lock,
  ChevronDown,
  ArrowRight,
  Flame,
  Layers,
  HelpCircle,
  Truck
} from 'lucide-react';
import { useStore, AppTab } from '../context/StoreContext';
import { formatINR, COMPANY_INFO } from '../types';
import { BlueDuckLogo } from './BlueDuckLogo';
import { ThemeSelector } from './ThemeSelector';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    cart, 
    wishlist, 
    activeTab, 
    setActiveTab, 
    setIsCartOpen, 
    setIsAuthModalOpen,
    setIsCompanyModalOpen,
    searchQuery,
    setSearchQuery,
    setFilterAgeGroup,
    setFilterCategory,
    setFilterFit,
    theme,
    logout
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const isLight = theme === 'studio-light';

  const handleNavClick = (tab: AppTab, ageGroup?: string, category?: string, fit?: string) => {
    setActiveTab(tab);
    if (ageGroup) setFilterAgeGroup(ageGroup);
    else setFilterAgeGroup('all');
    
    if (category) setFilterCategory(category);
    else if (tab === 'catalog') setFilterCategory('all');
    
    if (fit) setFilterFit(fit);
    else setFilterFit('all');
    
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors ${
      isLight 
        ? 'bg-white/95 text-slate-900 border-b border-slate-200 backdrop-blur-md shadow-sm' 
        : 'bg-[#060911]/95 text-slate-100 border-b border-slate-800/90 backdrop-blur-md'
    }`}>
      
      {/* =========================================================================
          TIER 1: TOP CORPORATE, COMPLIANCE & DISPATCH RIBBON
          ========================================================================= */}
      <div className={`text-xs py-1.5 px-4 border-b transition-colors ${
        isLight 
          ? 'bg-slate-100/90 border-slate-200 text-slate-700' 
          : 'bg-[#03060a] border-slate-800/80 text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Brand & Enterprise Identity */}
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-black uppercase tracking-wider text-[11px] text-[#E52020]">
              <Sparkles className="w-3.5 h-3.5" /> BLUE DUCK®
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-[11px] font-medium text-slate-400">
              Boys Bottomwear (Ages 3–25)
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-[11px]">
              Mfg by <strong className="font-semibold text-slate-200">M/s Avon Arts (Mahim, Mumbai)</strong> • GSTIN: <span className="font-mono text-amber-400 font-bold">{COMPANY_INFO.gstin}</span>
            </span>
          </div>

          {/* Quick Support, Free Shipping & Company Modal */}
          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <Truck className="w-3 h-3 text-emerald-400" />
              <span>All India Delivery (Min ₹1,999)</span>
            </div>

            <button
              onClick={() => setIsCompanyModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 text-[10px] font-extrabold transition-all"
            >
              <Building2 className="w-3 h-3" />
              <span>GST & Bank Dossier</span>
            </button>

            <a 
              href="tel:9322231024" 
              className="hidden md:inline-flex items-center gap-1 text-slate-300 hover:text-red-400 transition-colors text-[11px] font-mono font-medium"
              title="Call Avon Arts Mahim Office"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>9322231024 / 9833441691</span>
            </a>
          </div>

        </div>
      </div>

      {/* =========================================================================
          TIER 2: MAIN BRAND LOGO & SYSTEMATIC COMMAND HEADER
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border ${
                isLight 
                  ? 'text-slate-700 bg-slate-100 border-slate-200' 
                  : 'text-slate-300 bg-slate-900 border-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Official Blue Duck Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="cursor-pointer select-none"
            >
              <BlueDuckLogo size="sm" theme={isLight ? 'light' : 'dark'} showCompanySubtext={true} />
            </div>
          </div>

          {/* Center: Constructive Live Search Command Center */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-6">
            <div className="relative w-full flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="navbar-search-input"
                type="text"
                placeholder="Search jeans, track pants, joggers, half pants, 4Y, 30W, raw selvedge..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                className={`w-full text-xs pl-10 pr-9 py-2.5 rounded-full border transition-all ${
                  isLight 
                    ? 'bg-slate-100 text-slate-900 border-slate-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20' 
                    : 'bg-slate-900/90 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-red-500 focus:bg-slate-950 focus:ring-2 focus:ring-red-500/20'
                }`}
              />
              {searchQuery ? (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-slate-400 hover:text-white text-xs bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              ) : (
                <span className="absolute right-3 text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
                  ₹1,999+
                </span>
              )}
            </div>
          </div>

          {/* Right: Quick Tools, Wishlist, Cart & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Theme Switcher */}
            <ThemeSelector />

            {/* Age Fit Studio Shortcut Button */}
            <button
              id="navbar-fit-studio-btn"
              onClick={() => handleNavClick('fits')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                activeTab === 'fits'
                  ? 'bg-[#E52020] text-white border-red-600 shadow-md'
                  : 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'
              }`}
              title="Interactive Boys Age & Size Visualizer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Fit & Size Studio</span>
              <span className="xl:hidden">Fit Studio</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="navbar-wishlist-btn"
              onClick={() => handleNavClick('dashboard')}
              className={`relative p-2.5 rounded-xl border transition-all ${
                isLight 
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="Saved Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E52020] text-white text-[10px] font-extrabold flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with INR Total */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 sm:px-3 sm:py-2 rounded-xl border transition-all flex items-center gap-2 ${
                isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className={`w-4 h-4 ${totalCartCount > 0 ? 'text-[#E52020]' : ''}`} />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#E52020] text-white text-[10px] font-extrabold flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-semibold leading-none">Bag</span>
                <span className="text-xs font-black text-[#E52020] font-mono leading-tight">
                  {cartSubtotal > 0 ? formatINR(cartSubtotal) : '₹0'}
                </span>
              </div>
            </button>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {currentUser && currentUser.uid !== 'guest-session' ? (
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border transition-all text-xs ${
                    currentUser.isAdmin 
                      ? 'bg-red-950/60 border-red-500 text-red-300' 
                      : isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full text-white font-extrabold flex items-center justify-center text-xs shadow ${
                    currentUser.isAdmin ? 'bg-[#E52020]' : 'bg-slate-700'
                  }`}>
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-bold hidden lg:inline max-w-[80px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'User'}
                  </span>
                  {currentUser.isAdmin && (
                    <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[8px] font-black tracking-wider uppercase shadow-sm">
                      ADMIN
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              ) : (
                <button
                  id="navbar-signin-btn"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E52020] hover:bg-red-600 text-white font-extrabold text-xs transition-all shadow-md shadow-red-900/30"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In / Admin</span>
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-slate-800/80">
                    <p className="font-bold text-sm text-white truncate">{currentUser?.displayName}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser?.email}</p>
                    {currentUser?.isAdmin ? (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold tracking-wider uppercase">
                        👑 Verified Google Administrator
                      </span>
                    ) : (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                        Customer Account
                      </span>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg text-left"
                    >
                      <Package className="w-4 h-4 text-blue-400" />
                      Track Orders & Saved Sizes
                    </button>

                    <button
                      id="dropdown-about-btn"
                      onClick={() => handleNavClick('about')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg text-left"
                    >
                      <Building2 className="w-4 h-4 text-amber-400" />
                      About Avon Arts & Blue Duck®
                    </button>

                    <button
                      id="dropdown-admin-btn"
                      onClick={() => {
                        if (!currentUser?.isAdmin) {
                          setIsAuthModalOpen(true);
                        } else {
                          handleNavClick('admin');
                        }
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg text-left ${
                        currentUser?.isAdmin 
                          ? 'text-red-400 hover:bg-red-950/40' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-red-500" />
                      <span>{currentUser?.isAdmin ? 'Admin Inventory & Orders Hub' : 'Admin Login (Staff Only)'}</span>
                    </button>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          TIER 3: SYSTEMATIC CATEGORY & SUB-VARIETY NAVIGATION TASKBAR
          ========================================================================= */}
      <nav className={`hidden lg:block border-t border-b transition-colors ${
        isLight 
          ? 'bg-slate-50 border-slate-200' 
          : 'bg-[#080c16] border-slate-800/90'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs font-bold">
            
            {/* Left Category Tabs Group */}
            <div className="flex items-center gap-1 py-1">
              
              {/* 1. All Bottoms */}
              <button
                id="taskbar-all"
                onClick={() => handleNavClick('catalog', 'all', 'all')}
                className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'catalog'
                    ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                    : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>All Bottoms</span>
              </button>

              {/* 2. JEANS (WIDE VARIETY WITH HOVER DROPDOWN) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('jeans')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="taskbar-jeans"
                  onClick={() => handleNavClick('catalog', 'all', 'jeans')}
                  className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'jeans' || activeDropdown === 'jeans'
                      ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                      : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>👖 Jeans (Wide Variety)</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {/* Jeans Sub-Variety Dropdown Mega Menu */}
                {activeDropdown === 'jeans' && (
                  <div className="absolute left-0 top-full pt-1 z-50 w-80 text-left">
                    <div className="rounded-2xl bg-[#0d1322] border border-slate-800 shadow-2xl p-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-2 py-1 border-b border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                          Blue Duck® Jeans Variety
                        </span>
                        <span className="text-[10px] text-slate-400">Starting ₹1,999</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {[
                          { label: 'All Jeans & Denim Cuts', fit: 'all', desc: 'Browse complete 14+ jean varieties' },
                          { label: '14.5oz Raw Redline Selvedge', fit: 'Skater Baggy', desc: 'Shuttle-loomed rigid indigo & black' },
                          { label: '90s Skater Baggy Denim', fit: 'Skater Baggy', desc: 'Oversized puddle hem skater drape' },
                          { label: 'Vintage Acid Washed Wide Leg', fit: 'Wide Leg', desc: 'Marble acid blue & charcoal smoke' },
                          { label: 'Y2K Double-Knee Carpenter Jean', fit: 'Carpenter Utility', desc: 'Workwear panels with hammer loop' },
                          { label: 'Ripped & Distressed Moto Biker', fit: 'Ripped Biker', desc: 'Accordion knee ribs & power stretch' },
                          { label: 'Heritage Relaxed Straight', fit: 'Relaxed Straight', desc: 'Timeless clean 5-pocket selvedge' },
                          { label: '4-Way Comfort Stretch Slim Taper', fit: 'Slim Tapered', desc: 'Zero knee-bagging daily stretch' },
                          { label: '70s Vintage Flare Bell Bottom', fit: 'High Rise Flare', desc: 'Retro flare over high-top sneakers' },
                          { label: 'Little Boys Double-Knee (3-7Y)', ageGroup: 'kids-3-7', desc: 'Pinch-free elastic waist & play patches' }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick('catalog', item.ageGroup || 'all', 'jeans', item.fit)}
                            className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                          >
                            <p className="font-bold text-xs group-hover:text-red-400 flex items-center justify-between">
                              <span>{item.label}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                            </p>
                            <p className="text-[10px] text-slate-500">{item.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. TRACK PANTS (WITH DROPDOWN) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('trackpants')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="taskbar-trackpants"
                  onClick={() => handleNavClick('catalog', 'all', 'trackpants')}
                  className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'trackpants' || activeDropdown === 'trackpants'
                      ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                      : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>🏃 Track Pants</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {activeDropdown === 'trackpants' && (
                  <div className="absolute left-0 top-full pt-1 z-50 w-72 text-left">
                    <div className="rounded-2xl bg-[#0d1322] border border-slate-800 shadow-2xl p-3 space-y-2">
                      <div className="px-2 py-1 border-b border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                          Performance Track Pants
                        </span>
                        <span className="text-[10px] text-slate-400">₹1,999 - ₹2,399</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {[
                          { label: 'Pro-Tech Poly-Spandex Active Tracks', desc: '12% Hyper-stretch with zip phone pockets' },
                          { label: 'Retro Heavy French Terry Stripe Pants', desc: '380 GSM combed cotton with side tape' },
                          { label: 'Junior Active Strike Tricot (8-14Y)', desc: 'Snag-resistant sports track pants' },
                          { label: 'Little Boys Warm-Up Tricot (3-7Y)', desc: 'Ultra-soft pull-up elastic comfort' }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick('catalog', 'all', 'trackpants')}
                            className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                          >
                            <p className="font-bold text-xs group-hover:text-red-400">{item.label}</p>
                            <p className="text-[10px] text-slate-500">{item.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. JOGGERS (WITH DROPDOWN) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('joggers')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="taskbar-joggers"
                  onClick={() => handleNavClick('catalog', 'all', 'joggers')}
                  className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'joggers' || activeDropdown === 'joggers'
                      ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                      : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>⚡ Joggers</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {activeDropdown === 'joggers' && (
                  <div className="absolute left-0 top-full pt-1 z-50 w-72 text-left">
                    <div className="rounded-2xl bg-[#0d1322] border border-slate-800 shadow-2xl p-3 space-y-2">
                      <div className="px-2 py-1 border-b border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                          Street & Denim Joggers
                        </span>
                        <span className="text-[10px] text-slate-400">₹1,999 - ₹2,399</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {[
                          { label: 'Heavy 450GSM French Terry Street Joggers', desc: 'Ultra-heavy structure with 2x2 ribbed cuffs' },
                          { label: 'Indigo Knit Denim Flex Cuffed Joggers', desc: 'Hybrid denim knit rope-dyed yarn' },
                          { label: 'Junior Cargo Denim Knit Joggers (8-14Y)', desc: 'Dual cargo pockets with growth waistband' },
                          { label: 'Little Boys Knee-Patch Cloud Joggers (3-7Y)', desc: 'Circular knee pads for toddler crawling' }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick('catalog', 'all', 'joggers')}
                            className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                          >
                            <p className="font-bold text-xs group-hover:text-red-400">{item.label}</p>
                            <p className="text-[10px] text-slate-500">{item.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. HALF PANTS / SHORTS (WITH DROPDOWN) */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('shorts')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="taskbar-shorts"
                  onClick={() => handleNavClick('catalog', 'all', 'shorts')}
                  className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'halfpants' || activeTab === 'shorts' || activeDropdown === 'shorts'
                      ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                      : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>🩳 Half Pants / Shorts</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {activeDropdown === 'shorts' && (
                  <div className="absolute left-0 top-full pt-1 z-50 w-72 text-left">
                    <div className="rounded-2xl bg-[#0d1322] border border-slate-800 shadow-2xl p-3 space-y-2">
                      <div className="px-2 py-1 border-b border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                          Boys Summer Half Pants
                        </span>
                        <span className="text-[10px] text-slate-400">Starting ₹1,999</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {[
                          { label: '90s Raw-Hem Skater Denim Shorts (Jorts)', desc: 'Below-the-knee raw hem with wide drape' },
                          { label: 'Ripstop Tactical 6-Pocket Cargo Half Pants', desc: 'Integrated webbing belt with snap pockets' },
                          { label: 'French Terry Graphic Sweat Shorts', desc: 'Above-the-knee 7" inseam with zip pockets' },
                          { label: 'Junior Multi-Pocket Stretch Denim Shorts', desc: 'Concealed buttonhole waist adjusters' },
                          { label: 'Little Boys Elastic Drawstring Play Shorts', desc: 'Pinch-free cotton twill for nursery play' }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick('catalog', 'all', 'shorts')}
                            className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors group"
                          >
                            <p className="font-bold text-xs group-hover:text-red-400">{item.label}</p>
                            <p className="text-[10px] text-slate-500">{item.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. TACTICAL CARGOS */}
              <button
                id="taskbar-cargos"
                onClick={() => handleNavClick('catalog', 'all', 'cargos')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'cargos'
                    ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                    : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                🪖 Tactical Cargos
              </button>

              {/* 7. CHINOS & TROUSERS */}
              <button
                id="taskbar-chinos"
                onClick={() => handleNavClick('catalog', 'all', 'chinos')}
                className={`px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'chinos'
                    ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                    : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                👔 Chinos
              </button>

              {/* 8. ABOUT US */}
              <button
                id="taskbar-about"
                onClick={() => handleNavClick('about')}
                className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'about'
                    ? 'bg-[#E52020] text-white shadow-sm font-extrabold'
                    : isLight ? 'text-slate-800 hover:bg-slate-200' : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>About Us</span>
              </button>

            </div>

            {/* Right: Age Demographics Filter Chips */}
            <div className="flex items-center gap-1.5 py-1 border-l border-slate-800/80 pl-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 hidden xl:inline">
                Ages:
              </span>
              
              <button
                onClick={() => handleNavClick('kids', 'kids-3-7', 'all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all flex items-center gap-1 ${
                  activeTab === 'kids'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                }`}
              >
                <span>3–7Y</span>
              </button>

              <button
                onClick={() => handleNavClick('junior', 'junior-8-14', 'all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all flex items-center gap-1 ${
                  activeTab === 'junior'
                    ? 'bg-blue-500 text-slate-950 shadow-sm'
                    : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30'
                }`}
              >
                <span>8–14Y</span>
              </button>

              <button
                onClick={() => handleNavClick('teens', 'teens-15-25', 'all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all flex items-center gap-1 ${
                  activeTab === 'teens'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <span>15–25Y</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER (SYSTEMATIC & CONSTRUCTIVE)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#070b14] text-left p-4 space-y-5 animate-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search jeans, track pants, joggers, half pants..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalog') setActiveTab('catalog');
              }}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-red-500"
            />
          </div>

          {/* Categories Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-red-500">
              Categories (All Starting ₹1,999)
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleNavClick('catalog', 'all', 'all')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-white hover:border-red-500 flex items-center justify-between"
              >
                <span>🔥 All Bottoms</span>
                <ArrowRight className="w-3 h-3 text-red-500" />
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'all', 'jeans')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-white hover:border-red-500 flex items-center justify-between"
              >
                <span>👖 Jeans & Selvedge</span>
                <ArrowRight className="w-3 h-3 text-red-500" />
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'all', 'trackpants')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-white hover:border-red-500 flex items-center justify-between"
              >
                <span>🏃 Track Pants</span>
                <ArrowRight className="w-3 h-3 text-red-500" />
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'all', 'joggers')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-white hover:border-red-500 flex items-center justify-between"
              >
                <span>⚡ Joggers</span>
                <ArrowRight className="w-3 h-3 text-red-500" />
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'all', 'shorts')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-white hover:border-red-500 flex items-center justify-between"
              >
                <span>🩳 Half Pants / Shorts</span>
                <ArrowRight className="w-3 h-3 text-red-500" />
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'all', 'cargos')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-white hover:border-red-500 flex items-center justify-between"
              >
                <span>🪖 Tactical Cargos</span>
                <ArrowRight className="w-3 h-3 text-red-500" />
              </button>
            </div>
          </div>

          {/* Jeans Variety Quick Sub-List */}
          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              Popular Jeans Varieties
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
              {[
                { name: '14.5oz Raw Selvedge', fit: 'Skater Baggy' },
                { name: '90s Skater Baggy', fit: 'Skater Baggy' },
                { name: 'Acid Washed Wide Leg', fit: 'Wide Leg' },
                { name: 'Double-Knee Carpenter', fit: 'Carpenter Utility' },
                { name: 'Ripped Moto Biker', fit: 'Ripped Biker' },
                { name: 'Comfort Slim Taper', fit: 'Slim Tapered' }
              ].map((v, i) => (
                <button
                  key={i}
                  onClick={() => handleNavClick('catalog', 'all', 'jeans', v.fit)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-red-600 transition-colors"
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Age Demographics Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Filter by Boy's Age Group
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold text-center">
              <button
                onClick={() => handleNavClick('kids', 'kids-3-7', 'all')}
                className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              >
                🧒 3–7 Years
              </button>
              <button
                onClick={() => handleNavClick('junior', 'junior-8-14', 'all')}
                className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400"
              >
                🛹 8–14 Years
              </button>
              <button
                onClick={() => handleNavClick('teens', 'teens-15-25', 'all')}
                className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400"
              >
                ⚡ 15–25 Years
              </button>
            </div>
          </div>

          {/* Utility Quick Links */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => handleNavClick('about')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold hover:border-red-500"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-red-500" />
                <span>About Avon Arts & Blue Duck®</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleNavClick('fits')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                <span>Interactive Age Fit Studio</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsCompanyModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Avon Arts GSTIN & Bank Details</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </header>
  );
};

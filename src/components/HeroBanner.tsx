import React from 'react';
import { Sparkles, ArrowRight, Shield, Award, Ruler, RefreshCcw, CheckCircle2, Zap, Building2, Flame, Tag, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatINR, COMPANY_INFO } from '../types';
import { BlueDuckLogo } from './BlueDuckLogo';

export const HeroBanner: React.FC = () => {
  const { setActiveTab, setFilterAgeGroup, setFilterCategory, setFilterFit, theme, setIsCompanyModalOpen } = useStore();

  const handleAgeSelect = (ageGroup: string, tab: any = 'catalog') => {
    setFilterAgeGroup(ageGroup);
    setFilterCategory('all');
    setFilterFit('all');
    setActiveTab(tab);
  };

  const handleQuickFitClick = (fit: string) => {
    setFilterFit(fit);
    setFilterCategory('all');
    setFilterAgeGroup('all');
    setActiveTab('catalog');
  };

  const isLight = theme === 'studio-light';

  return (
    <section className={`relative overflow-hidden border-b transition-colors ${
      isLight 
        ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100 border-slate-200 text-slate-900' 
        : 'bg-gradient-to-b from-[#05070d] via-[#090e1b] to-[#05070d] border-slate-800 text-white'
    }`}>
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top running discount ticker banner */}
      <div className="bg-red-600 text-white py-1.5 px-4 text-center text-xs font-black tracking-wide overflow-hidden flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 fill-white" /> NEW JAPAN BAGGY & PARACHUTE CARGO COLLECTION DROPPED
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">USE CODE: <strong>OFFDUTY10</strong> FOR 10% OFF ON UPI</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden md:inline">FREE EXPRESS DELIVERY ACROSS 19,000+ PIN CODES</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Official Badge & Logo Banner */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black tracking-wider uppercase shadow-inner">
                <Flame className="w-3.5 h-3.5 fill-red-500" />
                <span>THE MEN'S BOTTOMWEAR EDIT • SIZES 3Y TO 25Y</span>
              </div>

              {/* Blue Duck Brand Display */}
              <div className="py-1">
                <BlueDuckLogo size="lg" theme={isLight ? 'light' : 'dark'} showCompanySubtext={false} />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              The New Wave of <br />
              <span className="text-[#E52020]">
                Japan Baggy & Parachute Cargos
              </span>
            </h1>

            {/* Description */}
            <p className={`text-sm sm:text-base max-w-xl font-normal leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Engineered with 100% Indian ringspun cotton twill, deep 90s puddle hems, and tactical multi-pockets. Crafted in Mumbai by <strong>M/s Avon Arts</strong> with double-bar tack reinforcement for boys and young men ages 3 to 25.
            </p>

            {/* Offduty Popular Fit Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                ⚡ POPULAR SILHOUETTES:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickFitClick('Skater Baggy')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isLight ? 'bg-white hover:bg-slate-100 border-slate-300' : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700'
                  }`}
                >
                  <span>🛹 90s Japan Baggy</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-600 text-white font-black">HOT</span>
                </button>

                <button
                  onClick={() => {
                    setFilterCategory('cargos');
                    setActiveTab('cargos');
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isLight ? 'bg-white hover:bg-slate-100 border-slate-300' : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700'
                  }`}
                >
                  <span>🪂 Parachute 6-Pocket</span>
                </button>

                <button
                  onClick={() => handleQuickFitClick('Wide Leg')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isLight ? 'bg-white hover:bg-slate-100 border-slate-300' : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700'
                  }`}
                >
                  <span>🌊 Acid Washed Wide-Leg</span>
                </button>

                <button
                  onClick={() => handleQuickFitClick('Carpenter Utility')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isLight ? 'bg-white hover:bg-slate-100 border-slate-300' : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700'
                  }`}
                >
                  <span>🔨 Double-Knee Carpenter</span>
                </button>
              </div>
            </div>

            {/* Age Category Filter Quick-Buttons */}
            <div className="space-y-2 pt-1">
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                🎯 SHOP BY DEMOGRAPHIC:
              </span>
              <div className="grid grid-cols-3 gap-2.5 max-w-lg">
                <button
                  id="hero-age-3-7-btn"
                  onClick={() => handleAgeSelect('kids-3-7', 'kids')}
                  className={`p-3 rounded-2xl border transition-all text-left group ${
                    isLight 
                      ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-500 shadow-sm' 
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-500/60'
                  }`}
                >
                  <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider block">Age 3 – 7 Yrs</span>
                  <span className="text-xs font-bold block">Little Boys</span>
                  <span className="text-[10px] text-slate-400">Growth Elastic</span>
                </button>

                <button
                  id="hero-age-8-14-btn"
                  onClick={() => handleAgeSelect('junior-8-14', 'junior')}
                  className={`p-3 rounded-2xl border transition-all text-left group ${
                    isLight 
                      ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-500 shadow-sm' 
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-blue-500/60'
                  }`}
                >
                  <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-wider block">Age 8 – 14 Yrs</span>
                  <span className="text-xs font-bold block">Junior Tweens</span>
                  <span className="text-[10px] text-slate-400">Skater & Cargos</span>
                </button>

                <button
                  id="hero-age-15-25-btn"
                  onClick={() => handleAgeSelect('teens-15-25', 'teens')}
                  className={`p-3 rounded-2xl border transition-all text-left group ${
                    isLight 
                      ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-red-500 shadow-sm' 
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-red-500/60'
                  }`}
                >
                  <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider block">Age 15 – 25 Yrs</span>
                  <span className="text-xs font-bold block">Young Men</span>
                  <span className="text-[10px] text-slate-400">Japan Baggy & Selvedge</span>
                </button>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-shop-all-btn"
                onClick={() => {
                  setFilterAgeGroup('all');
                  setFilterCategory('all');
                  setFilterFit('all');
                  setActiveTab('catalog');
                }}
                className="px-6 py-3.5 rounded-xl bg-[#E52020] hover:bg-red-600 text-white font-black text-xs sm:text-sm transition-all shadow-xl shadow-red-950/50 flex items-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All Bottomwear</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-fit-guide-btn"
                onClick={() => setActiveTab('fits')}
                className={`px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 ${
                  isLight 
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <Ruler className="w-4 h-4 text-red-500" />
                <span>Which Fit Are You? (Guide)</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t ${
              isLight ? 'border-slate-200' : 'border-slate-800/80'
            }`}>
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Double-Knee Durability</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Zap className="w-4 h-4 text-red-500 shrink-0" />
                <span>100% Cotton & 4-Way Flex</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Ruler className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Growth Elastic Tabs</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <RefreshCcw className="w-4 h-4 text-amber-500 shrink-0" />
                <span>7-Day Doorstep Exchange</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Feature Box */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className={`relative rounded-3xl overflow-hidden border shadow-2xl group ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'
              }`}>
                <img 
                  src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80" 
                  alt="Blue Duck Boys Bottomwear" 
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                
                {/* Floating Spec Badges */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#090d16]/90 backdrop-blur-md border border-slate-700 text-left shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                      BLUE DUCK® GENUINE
                    </span>
                  </div>
                  <p className="text-xs text-white font-bold mt-0.5">14.5oz Raw Redline Selvedge Skater</p>
                </div>

                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#090d16]/95 backdrop-blur-md border border-slate-700 flex items-center justify-between shadow-xl text-left">
                  <div>
                    <span className="text-[10px] text-red-400 uppercase font-black tracking-wider">🔥 Offduty Top Pick</span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">14.5oz Selvedge Skater Baggy</h3>
                    <p className="text-xs text-emerald-400 font-bold mt-0.5">
                      {formatINR(2999)} <span className="text-slate-400 line-through text-[11px] font-normal">{formatINR(3799)}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setFilterFit('Skater Baggy');
                      setActiveTab('catalog');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md transition-colors"
                  >
                    Shop Drop
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

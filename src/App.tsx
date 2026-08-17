/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sparkles, 
  Ruler, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Info, 
  AlertCircle, 
  X, 
  IndianRupee, 
  Building2, 
  Lock, 
  Layers, 
  Flame,
  Instagram
} from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { OffdutyCategoryBubbles } from './components/OffdutyCategoryBubbles';
import { OffdutyTopRatedGrid } from './components/OffdutyTopRatedGrid';
import { OffdutyLookbook } from './components/OffdutyLookbook';
import { OffdutyReviews } from './components/OffdutyReviews';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ProductGrid } from './components/ProductGrid';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminPanel } from './components/AdminPanel';
import { FitGuideVisualizer } from './components/FitGuideVisualizer';
import { AboutUs } from './components/AboutUs';
import { AuthModal } from './components/AuthModal';
import { CompanyDetailsModal } from './components/CompanyDetailsModal';
import { BlueDuckLogo } from './components/BlueDuckLogo';
import { COMPANY_INFO, formatINR } from './types';

const MainStoreContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    products, 
    selectedProduct, 
    setSelectedProduct,
    toasts,
    theme,
    setIsCompanyModalOpen,
    setIsAuthModalOpen
  } = useStore();

  const featuredProducts = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 6);
  const isLight = theme === 'studio-light';

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isLight 
        ? 'bg-[#f8fafc] text-slate-900 selection:bg-red-500 selection:text-white' 
        : theme === 'signature-red'
        ? 'bg-[#0a0e1a] text-slate-100 selection:bg-red-600 selection:text-white'
        : 'bg-[#05070c] text-slate-100 selection:bg-red-600 selection:text-white'
    }`}>
      
      {/* Fixed Toast Notifications System */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-300 ${
              toast.type === 'error'
                ? 'bg-rose-950/95 border-rose-800 text-rose-200'
                : toast.type === 'info'
                ? 'bg-blue-950/95 border-blue-800 text-blue-200'
                : 'bg-slate-900/95 border-red-500/60 text-slate-100'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <p className="text-xs font-medium flex-1 text-left">{toast.text}</p>
          </div>
        ))}
      </div>

      {/* Top Main Navigation */}
      <Navbar />

      {/* Main Content Views Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section with Offduty Streetwear Aesthetic */}
            <HeroBanner />

            {/* Offduty Visual Category Story Bubbles */}
            <OffdutyCategoryBubbles />

            {/* Offduty Top Rated Denim Styles Banner Grid (matching OffDuty) */}
            <OffdutyTopRatedGrid />

            {/* Offduty Streetwear Lookbook Grid */}
            <OffdutyLookbook />

            {/* Featured Best Sellers Section */}
            <section className={`py-14 sm:py-18 border-b transition-colors ${
              isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-[#070a10] border-slate-800/80'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div className="text-left space-y-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#E52020] flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 fill-red-500" /> BLUE DUCK® BESTSELLER DROPS
                    </span>
                    <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      Trending Street Bottoms
                    </h2>
                    <p className={`text-xs sm:text-sm max-w-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Japan baggy denim, tactical multi-pocket cargos, and selvedge skater bottoms engineered starting at ₹1,999.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('catalog')}
                    className={`self-start sm:self-auto px-5 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all group ${
                      isLight 
                        ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300' 
                        : 'bg-slate-900 hover:bg-slate-800 text-red-400 border-slate-700/80'
                    }`}
                  >
                    <span>View All Bottoms ({products.length})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive Fit & Growth Guide Visualizer Component */}
            <FitGuideVisualizer />

            {/* Offduty Verified Customer Reviews Wall */}
            <OffdutyReviews />

            {/* The Avon Arts Craftsmanship for Boys */}
            <section className={`py-16 border-b text-left transition-colors ${
              isLight 
                ? 'bg-white border-slate-200' 
                : 'bg-gradient-to-b from-[#090d16] via-[#0f172a] to-[#070a10] border-slate-800'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      <span>The Avon Arts Guarantee</span>
                    </div>

                    <h2 className={`text-3xl sm:text-4xl font-black tracking-tight leading-snug ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      Heavy Ringspun Twill <br />
                      <span className="text-[#E52020]">& Growth-Adaptive Elastic Tabs</span>
                    </h2>

                    <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Every bottom at Avon Arts features reinforced double-layer knees, heavy-duty bar-tack pocket stitching, and concealed internal button-hole elastic tabs that expand up to 2.5 inches as boys grow.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className={`p-4 rounded-xl border space-y-1 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}>
                        <span className="text-xl font-extrabold text-[#E52020] font-mono">2X</span>
                        <h4 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>Reinforced Knees</h4>
                        <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Tested to withstand sliding, cycling, skateboarding, and active playground turf.</p>
                      </div>

                      <div className={`p-4 rounded-xl border space-y-1 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}>
                        <span className="text-xl font-extrabold text-blue-500 font-mono">3-Year</span>
                        <h4 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>Growth Extenders</h4>
                        <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Expandable waistband gives up to 2.5 inches of growth adjustment without sagging.</p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab('catalog')}
                        className="px-6 py-3 rounded-xl bg-[#E52020] hover:bg-red-600 text-white font-extrabold text-xs transition-colors shadow-lg shadow-red-950/50"
                      >
                        Explore Streetwear Catalog
                      </button>
                      <button
                        onClick={() => setActiveTab('about')}
                        className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all ${
                          isLight 
                            ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        About Avon Arts Mumbai
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[3/4]">
                          <img
                            src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80"
                            alt="Boy wearing denim jeans"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`p-4 rounded-xl border text-xs ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/90 border-slate-800 text-slate-300'
                        }`}>
                          <strong className="text-red-500 block mb-1">Comfort Flex Stretch</strong>
                          Organic cotton with 2% elastane enables 360° unrestricted freedom.
                        </div>
                      </div>

                      <div className="space-y-4 pt-6">
                        <div className={`p-4 rounded-xl border text-xs ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/90 border-slate-800 text-slate-300'
                        }`}>
                          <strong className="text-blue-500 block mb-1">Free 7-Day Size Exchange</strong>
                          Easy doorstep exchange across all Indian pin codes if size doesn't fit.
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[3/4]">
                          <img
                            src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80"
                            alt="Active boys lifestyle"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

        {(activeTab === 'catalog' || 
          activeTab === 'kids' || 
          activeTab === 'kids-3-7' || 
          activeTab === 'junior' || 
          activeTab === 'junior-8-14' || 
          activeTab === 'teens' || 
          activeTab === 'teens-15-25' || 
          activeTab === 'jeans' || 
          activeTab === 'trackpants' || 
          activeTab === 'joggers' || 
          activeTab === 'shorts' || 
          activeTab === 'halfpants' || 
          activeTab === 'cargos' || 
          activeTab === 'chinos') && (
          <div>
            <OffdutyCategoryBubbles />
            <ProductGrid />
          </div>
        )}

        {activeTab === 'about' && (
          <AboutUs />
        )}

        {activeTab === 'fits' && (
          <div>
            <FitGuideVisualizer />
            <ProductGrid />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <CustomerDashboard />
        )}

        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* WhatsApp Floating Chat Button */}
      <WhatsAppButton />

      {/* Global Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer />

      {/* Bespoke Checkout Modal */}
      <CheckoutModal />

      {/* Auth Modal */}
      <AuthModal />

      {/* Verified Enterprise Details Modal */}
      <CompanyDetailsModal />

      {/* Official Footer with Offduty Vibe */}
      <footer className={`mt-auto border-t text-left transition-colors ${
        isLight ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-[#03060b] text-slate-400 border-slate-800/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            
            {/* Col 1: Brand & Enterprise Info */}
            <div className="lg:col-span-2 space-y-4">
              <BlueDuckLogo size="md" theme="dark" showCompanySubtext={false} />
              
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                India's premier manufacturer of growth-adaptive and durable bottoms for boys and young men ages 3 to 25. Engineered with 100% long-staple Indian cotton and reinforced double-needle seams in Mahim, Mumbai.
              </p>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span><strong>{COMPANY_INFO.legalName}</strong> (Prop. {COMPANY_INFO.proprietor})</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>GSTIN: <strong className="font-mono text-emerald-400">{COMPANY_INFO.gstin}</strong></span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('about')}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
                >
                  About Avon Arts
                </button>
                <button
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                >
                  GST & Bank Details
                </button>
              </div>
            </div>

            {/* Col 2: Streetwear Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">
                Silhouettes
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => {
                      setActiveTab('catalog');
                    }}
                    className="hover:text-red-400 transition-colors"
                  >
                    🛹 Japan Baggy Jeans
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('cargos')}
                    className="hover:text-red-400 transition-colors"
                  >
                    🪂 Parachute & Tactical Cargos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('jeans')}
                    className="hover:text-red-400 transition-colors"
                  >
                    👖 14.5oz Raw Selvedge
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('joggers')}
                    className="hover:text-red-400 transition-colors"
                  >
                    🏃 Combed French Terry Track
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('shorts')}
                    className="hover:text-red-400 transition-colors"
                  >
                    🩳 Bermuda & Cargo Shorts
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('chinos')}
                    className="hover:text-red-400 transition-colors"
                  >
                    👔 Tailored Stretch Chinos
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Boy's Demographics */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">
                Shop By Age
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setActiveTab('kids')}
                    className="hover:text-red-400 transition-colors text-emerald-400 font-bold"
                  >
                    👦 Ages 3–7 (Little Boys)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('junior')}
                    className="hover:text-red-400 transition-colors text-blue-400 font-bold"
                  >
                    🛹 Ages 8–14 (Junior Tweens)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('teens')}
                    className="hover:text-red-400 transition-colors text-red-400 font-bold"
                  >
                    🔥 Ages 15–25 (Young Men)
                  </button>
                </li>
                <li className="pt-2">
                  <button 
                    onClick={() => setActiveTab('fits')}
                    className="hover:text-white text-slate-300 font-bold flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5 text-red-500" />
                    <span>Fit & Size Guide</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Factory Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">
                Factory & Support
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address.line1}, Mahim East, Mumbai - 400017</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phones[0]}`} className="hover:text-white font-mono">
                    +91 {COMPANY_INFO.phones[0]}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                    {COMPANY_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Security note */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit SSL Encrypted Checkout • 100% Tax Compliant GST Invoices</span>
            </div>
            <div>
              © 1998–2026 <strong>M/s Avon Arts</strong> & <strong>BLUE DUCK®</strong>. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainStoreContent />
    </StoreProvider>
  );
}

export default App;

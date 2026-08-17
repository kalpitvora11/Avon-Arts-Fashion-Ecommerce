import React from 'react';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Scissors, 
  Layers, 
  Sparkles,
  HeartHandshake,
  Clock,
  Compass
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO } from '../types';
import { BlueDuckLogo } from './BlueDuckLogo';

export const AboutUs: React.FC = () => {
  const { theme, setActiveTab, setIsCompanyModalOpen } = useStore();
  const isLight = theme === 'studio-light';

  return (
    <div className={`min-h-screen py-12 text-left transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#070a10] text-slate-100'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Breadcrumb & Clean Header */}
        <div className="space-y-4 text-center sm:text-left border-b pb-8 border-slate-800/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold">
            <span className="text-red-500 uppercase tracking-widest font-black">About The Enterprise</span>
            <span className="text-slate-600">•</span>
            <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>M/s Avon Arts (Est. 1998, Mumbai)</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-500 font-mono">GSTIN: {COMPANY_INFO.gstin}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                Avon Arts & Blue Duck®
              </h1>
              <p className={`text-sm sm:text-base mt-2 max-w-2xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Pioneering India's most durable, growth-adaptive bottomwear engineered exclusively for boys and young men ages 3 to 25.
              </p>
            </div>

            <div className="flex items-center gap-3 self-center sm:self-auto">
              <button
                onClick={() => setActiveTab('catalog')}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-950/40 transition-all flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCompanyModalOpen(true)}
                className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                  isLight 
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300' 
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>GST & Bank Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Story & Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> OUR HERITAGE & ORIGIN
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                Crafted in Mahim, Mumbai Since 1998
              </h2>
            </div>

            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Founded by <strong>Bhavesh Shah</strong> in the vibrant textile corridor of Mahim East, Mumbai, <strong>M/s Avon Arts</strong> was established with a singular focus: to engineer tough, comfortable, and modern bottoms that keep pace with the active life of growing boys.
            </p>

            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Under our registered brand <strong>BLUE DUCK®</strong>, we design and produce a wide spectrum of bottomwear—ranging from heavyweight selvedge denim jeans and tactical multi-pocket cargos to super-combed track pants and skater baggies. Every piece is crafted starting from ₹1,999 with fair Indian pricing and zero middlemen markups.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-2xl font-black text-red-500 font-mono">25+</div>
                <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Years of Craft</div>
                <div className="text-[11px] text-slate-500">Continuous Mumbai ops</div>
              </div>

              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-2xl font-black text-blue-500 font-mono">3–25</div>
                <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Age Demographics</div>
                <div className="text-[11px] text-slate-500">Tailored fit grades</div>
              </div>

              <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'} col-span-2 sm:col-span-1`}>
                <div className="text-2xl font-black text-emerald-500 font-mono">100%</div>
                <div className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>GST Compliant</div>
                <div className="text-[11px] text-slate-500">Official tax invoices</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className={`p-6 rounded-2xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0c1220] border-slate-800'
            } space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <BlueDuckLogo size="sm" theme={isLight ? 'light' : 'dark'} />
                <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 text-[10px] font-black uppercase">
                  Verified Brand
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Legal Enterprise:</span>
                  <strong className={isLight ? 'text-slate-900' : 'text-white'}>{COMPANY_INFO.legalName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Brand Identity:</span>
                  <strong className="text-red-500">{COMPANY_INFO.brandName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Proprietor:</span>
                  <strong className={isLight ? 'text-slate-900' : 'text-white'}>{COMPANY_INFO.proprietor}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">GSTIN Registration:</span>
                  <strong className="font-mono text-amber-400">{COMPANY_INFO.gstin}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-500">Registered Office:</span>
                  <span className="text-right max-w-[200px] text-[11px] text-slate-400">
                    {COMPANY_INFO.address.line1}, Mahim East, Mumbai - 400017
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phones[0]}`}
                  className="w-full py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us: +91 {COMPANY_INFO.phones[0]}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* The Four Core Pillars of Engineering */}
        <div className="space-y-8 border-t pt-12 border-slate-800/60">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-red-500 flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4" /> THE BLUE DUCK® STANDARDS
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
              Why Boys & Parents Trust Avon Arts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className={`font-extrabold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                1. Shuttle-Loom Denims
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Woven from 100% long-staple Indian cotton and blended with 2% Lycra for effortless movement, cycling, running, and skateboarding.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className={`font-extrabold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                2. Built-In Growth System
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Internal buttonhole elastic tabs in sizes 3Y to 14Y expand up to 2.5 inches, ensuring 2+ years of wear without sagging or tight waistlines.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <Award className="w-5 h-5" />
              </div>
              <h3 className={`font-extrabold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                3. Double-Knee Durability
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Reinforced bar-tack anchors at pocket edges, heavy brass zipper flies, and twin-needle stitched inseams prevent rips during active sports.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className={`font-extrabold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                4. Hassle-Free Exchange
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                7-day direct doorstep size exchange across 19,000+ PIN codes in India. Direct courier pickup with instant replacement dispatch.
              </p>
            </div>

          </div>
        </div>

        {/* Manufacturing Workshop & Quality Assurance */}
        <div className={`rounded-3xl border p-8 sm:p-12 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0a0f1d] border-slate-800'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                Factory & Artisan Lab
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Precision Pattern Cutting & Eco-Friendly Washing
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Our workshop in Mahim uses computer-graded patterns optimized for Indian boys' body ergonomics. In our wet processing lab, we utilize ozone wash and enzyme bio-polishing to achieve authentic vintage fading while saving over 60% water compared to conventional denim laundering.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Zero harmful AZO dyes and skin-friendly hypoallergenic finishes</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Smooth pocket linings that never cause chafing on sensitive skin</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Pre-shrunk fabric to prevent post-wash shrinkage at home</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden aspect-square border border-slate-800 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80"
                    alt="Denim craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium text-center">Selvedge Weave Inspection</p>
              </div>

              <div className="space-y-2 pt-4">
                <div className="rounded-2xl overflow-hidden aspect-square border border-slate-800 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=600&q=80"
                    alt="Boys bottom stitching"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium text-center">Double-Needle Construction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Contact & Verification Directory */}
        <div className="space-y-6 border-t pt-12 border-slate-800/60">
          <div className="text-center sm:text-left space-y-1">
            <h3 className={`text-xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Connect Directly with Avon Arts Team
            </h3>
            <p className="text-xs text-slate-500">Reach our factory office for retail queries, order support, or sizing advice.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'} space-y-2`}>
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <MapPin className="w-4 h-4" />
                <span>Factory & Dispatch Office</span>
              </div>
              <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2}, {COMPANY_INFO.address.city} - {COMPANY_INFO.address.pincode}, {COMPANY_INFO.address.state}.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'} space-y-2`}>
              <div className="flex items-center gap-2 text-blue-500 font-bold">
                <Phone className="w-4 h-4" />
                <span>Customer Helplines</span>
              </div>
              <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                <strong>+91 93222 31024</strong> / <strong>+91 98334 41691</strong><br />
                Direct Landline: +91 93231 30275 (10 AM - 7 PM IST)
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'} space-y-2`}>
              <div className="flex items-center gap-2 text-emerald-500 font-bold">
                <Mail className="w-4 h-4" />
                <span>Official Email Inquiries</span>
              </div>
              <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                Orders: <a href="mailto:avonarts70@gmail.com" className="text-red-500 font-bold">avonarts70@gmail.com</a><br />
                Director: Bhavesh Shah
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

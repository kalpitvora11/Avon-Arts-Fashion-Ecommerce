import React, { useState } from 'react';
import { Ruler, Sparkles, Check, ArrowRight, Compass, Scissors } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FitType } from '../types';

interface FitDetail {
  id: FitType;
  title: string;
  subtitle: string;
  rise: string;
  thigh: string;
  knee: string;
  legOpening: string;
  description: string;
  bestFor: string;
  stretch: string;
  silhouetteSvgPath: string;
  categoryTag: 'Men & Women' | 'Men' | 'Women' | 'Unisex';
  recommendedModel: string;
}

const FITS_DATA: FitDetail[] = [
  {
    id: 'Slim Tapered',
    title: 'The Slim Tapered',
    subtitle: 'Crisp, contemporary silhouette with clean sneaker drape',
    rise: '10.5" Mid Rise',
    thigh: 'Trim & Sculpted',
    knee: '15.5" Tailored',
    legOpening: '13.5" Narrow Taper',
    description: 'Fitted through the hip and seat with a smooth, continuous taper from knee to hem. Perfect for modern minimalist styling with low-profile boots or sneakers.',
    bestFor: 'Slim to athletic builds seeking clean lines without excess fabric',
    stretch: 'Available in 100% Rigid Raw or 1% Comfort Flex',
    silhouetteSvgPath: 'M 35 10 L 30 80 L 38 180 L 42 270 L 58 270 L 62 180 L 70 80 L 65 10 Z',
    categoryTag: 'Men',
    recommendedModel: 'The 1968 Heritage Slim Tapered'
  },
  {
    id: 'Classic Straight',
    title: 'The Classic Straight',
    subtitle: 'Timeless 90s archive proportions with balanced ease',
    rise: '11.0" Mid-to-High Rise',
    thigh: 'Relaxed & Roomy',
    knee: '17.5" Straight',
    legOpening: '16.5" Classic Straight',
    description: 'The golden ratio of vintage denim. Drops straight down from the knee with zero taper, giving a commanding drape over heavy boots and derbies.',
    bestFor: 'All body types; effortless daily wear and all-day comfort',
    stretch: '13.0oz 100% Organic Ringspun Cotton',
    silhouetteSvgPath: 'M 30 10 L 25 80 L 25 180 L 25 270 L 75 270 L 75 180 L 75 80 L 70 10 Z',
    categoryTag: 'Men & Women',
    recommendedModel: 'Artisan Classic Straight 90s'
  },
  {
    id: 'High Rise Flare',
    title: 'The 70s High-Rise Flare',
    subtitle: 'Dramatic leg-lengthening flare with zero waist-gapping',
    rise: '11.5" Ultra High Rise',
    thigh: 'Contoured Hug',
    knee: '14.0" Tailored In',
    legOpening: '22.0" Bell Flare',
    description: 'Hugs the waist and hips firmly before tapering in through the knee and expanding out into an elegant bell flare. Pairs stunningly with heels and platform footwear.',
    bestFor: 'Hourglass and tall silhouettes wanting elongated lines',
    stretch: '2% Shape-Retention Performance Stretch',
    silhouetteSvgPath: 'M 36 10 L 32 80 L 38 160 L 18 270 L 82 270 L 62 160 L 68 80 L 64 10 Z',
    categoryTag: 'Women',
    recommendedModel: 'The Sienna High-Rise 70s Flare'
  },
  {
    id: 'Wide Leg',
    title: 'The Studio Wide Leg',
    subtitle: 'Architectural volume with fluid tailored drape',
    rise: '12.0" High Rise',
    thigh: 'Full Volume',
    knee: '22.0" Relaxed',
    legOpening: '26.0" Statement Opening',
    description: 'Generous volume from the hip down with pleated waist options. Creates a striking high-fashion silhouette with unparalleled ease of movement.',
    bestFor: 'Fashion-forward layering, oversized silhouettes, and warm weather airiness',
    stretch: '12.0oz Lightweight Italian Drape Weave',
    silhouetteSvgPath: 'M 32 10 L 20 80 L 15 180 L 10 270 L 90 270 L 85 180 L 80 80 L 68 10 Z',
    categoryTag: 'Women',
    recommendedModel: 'Palazzo Studio Wide Leg Jean'
  },
  {
    id: 'Carpenter Utility',
    title: 'The Workshop Carpenter',
    subtitle: 'Heavyweight double-knee utility with tool loops',
    rise: '11.2" Mid Rise',
    thigh: 'Extra Roomy Work Cut',
    knee: '19.0" Double Paneled',
    legOpening: '18.0" Boot Drape',
    description: 'Built for durability and mobility with hammer loops, ruler pockets, and double knee chaps that take heavy abuse in stride.',
    bestFor: 'Utilitarian streetwear and hands-on workshop crafting',
    stretch: '14.5oz Heavy Duck Twill & Indigo Selvedge',
    silhouetteSvgPath: 'M 28 10 L 22 80 L 20 180 L 20 270 L 80 270 L 80 180 L 78 80 L 72 10 Z',
    categoryTag: 'Men & Women',
    recommendedModel: 'The Workshop Carpenter Utility Jean'
  },
  {
    id: 'Relaxed Loose',
    title: 'The Kyoto Relaxed Taper',
    subtitle: 'Japanese street style with deep rise and carrot taper',
    rise: '11.8" Relaxed Rise',
    thigh: 'Full & Baggy',
    knee: '18.0" Easy',
    legOpening: '14.5" Sharp Ankle Taper',
    description: 'Spacious seat and thigh tapering down aggressively towards the hem, preventing dragging on footwear while offering relaxed comfort.',
    bestFor: 'Streetwear enthusiasts, athletic quads, relaxed daily ease',
    stretch: '13.5oz Natural Green-Cast Indigo',
    silhouetteSvgPath: 'M 30 10 L 18 80 L 22 170 L 32 270 L 68 270 L 78 170 L 82 80 L 70 10 Z',
    categoryTag: 'Men',
    recommendedModel: 'The Kyoto Relaxed Loose Taper'
  }
];

export const FitGuideVisualizer: React.FC = () => {
  const [activeFit, setActiveFit] = useState<FitDetail>(FITS_DATA[0]);
  const { setActiveTab, setFilterFit } = useStore();

  const handleFilterByFit = (fitName: string) => {
    setFilterFit(fitName);
    setActiveTab('catalog');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#090d16] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Fit Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find Your Signature Silhouette
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every Avon Arts jean is engineered with precise mathematical proportions. 
            Select a fit below to inspect the leg profile, measurements, and recommended pairings.
          </p>
        </div>

        {/* Fit Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {FITS_DATA.map((fit) => (
            <button
              key={fit.id}
              id={`fit-tab-${fit.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveFit(fit)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeFit.id === fit.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold scale-105'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{fit.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                activeFit.id === fit.id ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
              }`}>
                {fit.categoryTag}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Fit Display Stage */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Silhouette Vector Visualizer */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#070a10] rounded-xl p-8 border border-slate-800/80 relative overflow-hidden">
              
              {/* Measurement Grid Lines */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-4">
                  Silhouette Profile • {activeFit.title}
                </span>

                {/* SVG Silhouette */}
                <div className="relative w-48 h-72 flex items-center justify-center">
                  <svg viewBox="0 0 100 280" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {/* Background silhouette */}
                    <path
                      d={activeFit.silhouetteSvgPath}
                      fill="#1e3a8a"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      className="transition-all duration-500 ease-out"
                    />
                    {/* Selvedge ID Red Stripe on left seam */}
                    <line x1="30" y1="120" x2="30" y2="270" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>Denim Form</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span>Selvedge Redline</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fit Technical Specifications & Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Pattern Cut Specifications</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeFit.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  {activeFit.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {activeFit.description}
              </p>

              {/* 4 Point Spec Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Front Rise</span>
                  <strong className="text-sm text-white font-mono">{activeFit.rise}</strong>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Thigh Cut</span>
                  <strong className="text-sm text-white font-mono">{activeFit.thigh}</strong>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Knee Spec</span>
                  <strong className="text-sm text-white font-mono">{activeFit.knee}</strong>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Leg Opening</span>
                  <strong className="text-sm text-white font-mono">{activeFit.legOpening}</strong>
                </div>
              </div>

              {/* Recommendations & Stretch info */}
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Ideal For:</strong> {activeFit.bestFor}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Weave & Stretch:</strong> {activeFit.stretch}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  id={`browse-fit-${activeFit.id.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => handleFilterByFit(activeFit.id)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 group"
                >
                  <span>Shop All {activeFit.title} Models</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

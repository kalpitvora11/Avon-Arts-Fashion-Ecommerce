import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

interface TopRatedCategoryCard {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  image: string;
  filterFit?: string;
  filterCategory?: string;
  filterAgeGroup?: string;
  tabTarget?: any;
}

export const OffdutyTopRatedGrid: React.FC = () => {
  const { setActiveTab, setFilterCategory, setFilterFit, setFilterAgeGroup, theme } = useStore();
  const isLight = theme === 'studio-light';

  const TOP_RATED_CATEGORIES: TopRatedCategoryCard[] = [
    {
      id: 'cat-1',
      badge: 'MENS',
      title: 'BESTSELLER\nDENIMS',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
      filterCategory: 'jeans',
      tabTarget: 'jeans'
    },
    {
      id: 'cat-2',
      badge: 'MENS',
      title: 'PANTS &\nTROUSERS',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      filterCategory: 'chinos',
      tabTarget: 'chinos'
    },
    {
      id: 'cat-3',
      badge: 'MENS',
      title: 'TRENDING\nCARGOS',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      filterCategory: 'cargos',
      tabTarget: 'cargos'
    },
    {
      id: 'cat-4',
      badge: 'MENS',
      title: 'JAPAN BAGGY\n& SKATER',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      filterFit: 'Skater Baggy',
      tabTarget: 'catalog'
    }
  ];

  const handleCardClick = (card: TopRatedCategoryCard) => {
    if (card.filterCategory) {
      setFilterCategory(card.filterCategory);
    }
    if (card.filterFit) {
      setFilterFit(card.filterFit);
    }
    if (card.filterAgeGroup) {
      setFilterAgeGroup(card.filterAgeGroup);
    }
    setActiveTab(card.tabTarget || 'catalog');
  };

  return (
    <section className="w-full">
      {/* 1. Top High-Contrast Black Marquee Bar */}
      <div className="bg-black text-white py-3 px-4 overflow-hidden border-y border-slate-800">
        <div className="flex items-center justify-around gap-6 text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-2">
            <span className="text-[#E52020]">★</span> Shop the latest collection
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-2 text-amber-400">
            35,291+ Reviews
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            New arrivals every week
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="hidden md:flex items-center gap-2">
            Shop the latest collection
          </span>
        </div>
      </div>

      {/* 2. Top Rated Section Title */}
      <div className={`py-6 sm:py-8 border-b transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#060911] border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-1 mb-6 sm:mb-8">
            <h2 className={`text-base sm:text-lg font-bold tracking-tight ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>
              Top Rated Denim Styles From OffDuty
            </h2>
            <div className="w-12 h-0.5 bg-[#E52020] mx-auto rounded-full" />
          </div>

          {/* 3. 4-Column Banner Grid matching Screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TOP_RATED_CATEGORIES.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-800/80 bg-slate-950"
              >
                {/* Background Model Photo */}
                <img
                  src={card.image}
                  alt={card.title.replace('\n', ' ')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-95"
                  loading="lazy"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Top-Left 'MENS' badge matching exact screenshot */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white text-black font-black text-[11px] tracking-wider rounded uppercase shadow-md">
                    {card.badge}
                  </span>
                </div>

                {/* Centered Yellow Bold Block Title Box */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center">
                  <div className="bg-black/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 w-full max-w-[220px]">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#FFE600] whitespace-pre-line leading-tight drop-shadow-md">
                      {card.title}
                    </h3>
                  </div>

                  {/* Red 'SHOP NOW' Button */}
                  <div className="mt-4">
                    <button className="px-5 py-2 rounded bg-[#E52020] group-hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg group-hover:scale-105 transition-all flex items-center gap-1.5">
                      <span>SHOP NOW</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

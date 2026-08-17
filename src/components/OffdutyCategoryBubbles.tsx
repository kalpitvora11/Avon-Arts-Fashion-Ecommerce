import React from 'react';
import { useStore } from '../context/StoreContext';
import { Flame, Sparkles, Zap, Star } from 'lucide-react';

interface CategoryBubble {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  badge?: string;
  type: 'category' | 'fit' | 'age';
  filterKey: string;
  filterValue: string;
  tabKey?: any;
}

export const OffdutyCategoryBubbles: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    filterCategory, 
    setFilterCategory, 
    filterFit, 
    setFilterFit, 
    filterAgeGroup, 
    setFilterAgeGroup,
    theme 
  } = useStore();

  const isLight = theme === 'studio-light';

  const BUBBLES: CategoryBubble[] = [
    {
      id: 'korean-baggy',
      name: 'Japan Baggy',
      subtitle: '90s Puddle Hem',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80',
      badge: '🔥 TRENDING',
      type: 'fit',
      filterKey: 'fit',
      filterValue: 'Skater Baggy',
      tabKey: 'catalog'
    },
    {
      id: 'parachute-cargos',
      name: 'Parachute Cargos',
      subtitle: '6-Pocket Tactical',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&q=80',
      badge: 'BESTSELLER',
      type: 'category',
      filterKey: 'category',
      filterValue: 'cargos',
      tabKey: 'cargos'
    },
    {
      id: 'wide-leg',
      name: 'Wide-Leg Skater',
      subtitle: 'Acid & Vintage Wash',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80',
      badge: 'VIRAL',
      type: 'fit',
      filterKey: 'fit',
      filterValue: 'Wide Leg',
      tabKey: 'catalog'
    },
    {
      id: 'carpenter-denim',
      name: 'Carpenter Utility',
      subtitle: 'Double-Knee Y2K',
      image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=400&q=80',
      type: 'fit',
      filterKey: 'fit',
      filterValue: 'Carpenter Utility',
      tabKey: 'catalog'
    },
    {
      id: 'selvedge-raw',
      name: '14.5oz Selvedge',
      subtitle: 'Arvind Heritage',
      image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&q=80',
      badge: 'PREMIUM',
      type: 'category',
      filterKey: 'category',
      filterValue: 'jeans',
      tabKey: 'jeans'
    },
    {
      id: 'heavy-joggers',
      name: 'Combed Joggers',
      subtitle: 'French Terry Track',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=400&q=80',
      type: 'category',
      filterKey: 'category',
      filterValue: 'joggers',
      tabKey: 'joggers'
    },
    {
      id: 'summer-shorts',
      name: 'Bermuda Shorts',
      subtitle: 'Cargo & Denim Cuts',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80',
      type: 'category',
      filterKey: 'category',
      filterValue: 'shorts',
      tabKey: 'shorts'
    },
    {
      id: 'smart-chinos',
      name: 'Stretch Chinos',
      subtitle: 'Formal & Casual',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80',
      type: 'category',
      filterKey: 'category',
      filterValue: 'chinos',
      tabKey: 'chinos'
    },
    {
      id: 'age-kids',
      name: 'Little Boys (3-7Y)',
      subtitle: 'Growth-Elastic Waist',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&q=80',
      badge: 'PINCH-FREE',
      type: 'age',
      filterKey: 'ageGroup',
      filterValue: 'kids-3-7',
      tabKey: 'kids'
    },
    {
      id: 'age-junior',
      name: 'Juniors (8-14Y)',
      subtitle: 'School & Skater',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80',
      type: 'age',
      filterKey: 'ageGroup',
      filterValue: 'junior-8-14',
      tabKey: 'junior'
    },
    {
      id: 'age-teens',
      name: 'Teens & Men (15-25Y)',
      subtitle: 'College Streetwear',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: 'CAMPUS HIT',
      type: 'age',
      filterKey: 'ageGroup',
      filterValue: 'teens-15-25',
      tabKey: 'teens'
    }
  ];

  const handleBubbleClick = (bubble: CategoryBubble) => {
    if (bubble.type === 'category') {
      setFilterCategory(bubble.filterValue);
      setFilterFit('all');
      setFilterAgeGroup('all');
      if (bubble.tabKey) setActiveTab(bubble.tabKey);
    } else if (bubble.type === 'fit') {
      setFilterFit(bubble.filterValue);
      setFilterCategory('all');
      setFilterAgeGroup('all');
      setActiveTab('catalog');
    } else if (bubble.type === 'age') {
      setFilterAgeGroup(bubble.filterValue);
      setFilterCategory('all');
      setFilterFit('all');
      if (bubble.tabKey) setActiveTab(bubble.tabKey);
    }
  };

  const isBubbleActive = (bubble: CategoryBubble) => {
    if (bubble.type === 'category') return filterCategory === bubble.filterValue;
    if (bubble.type === 'fit') return filterFit === bubble.filterValue;
    if (bubble.type === 'age') return filterAgeGroup === bubble.filterValue;
    return false;
  };

  return (
    <div className={`py-6 border-b transition-colors ${
      isLight ? 'bg-white border-slate-200' : 'bg-[#080c14] border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#E52020] flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-red-500" /> EXPLORE BY SILHOUETTE & FIT
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline">Offduty Style Streetwear Edit</span>
          </div>

          <button
            onClick={() => {
              setFilterCategory('all');
              setFilterFit('all');
              setFilterAgeGroup('all');
              setActiveTab('catalog');
            }}
            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            View All ({BUBBLES.length})
          </button>
        </div>

        {/* Scrollable Story Bubbles / Category Grid */}
        <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-700 select-none">
          {BUBBLES.map((bubble) => {
            const active = isBubbleActive(bubble);
            return (
              <button
                key={bubble.id}
                onClick={() => handleBubbleClick(bubble)}
                className="group flex flex-col items-center shrink-0 text-center focus:outline-none transition-transform active:scale-95"
                style={{ width: '92px' }}
              >
                {/* Bubble Circular Avatar */}
                <div className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 transition-all duration-300 ${
                  active 
                    ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-slate-900 scale-105 shadow-lg shadow-red-950/40' 
                    : 'ring-1 ring-slate-700/80 group-hover:ring-red-400 group-hover:scale-105'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={bubble.image}
                      alt={bubble.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>

                  {/* Badge */}
                  {bubble.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-red-600 text-white text-[8px] font-black uppercase tracking-tight shadow-md border border-red-400/40">
                      {bubble.badge}
                    </span>
                  )}
                </div>

                {/* Title and Subtitle */}
                <div className="mt-2.5 space-y-0.5">
                  <span className={`text-[11px] font-bold block leading-tight truncate w-22 ${
                    active 
                      ? 'text-red-500 font-extrabold' 
                      : isLight ? 'text-slate-800 group-hover:text-red-600' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {bubble.name}
                  </span>
                  <span className="text-[9px] text-slate-500 block truncate w-22 font-medium">
                    {bubble.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

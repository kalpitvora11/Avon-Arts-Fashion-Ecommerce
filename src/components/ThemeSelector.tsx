import React, { useState } from 'react';
import { Palette, Check, Sparkles, Sun, Moon, Flame, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SiteTheme } from '../types';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions: {
    id: SiteTheme;
    name: string;
    description: string;
    icon: any;
    tag: string;
    colors: { bg: string; accent: string; card: string; text: string };
  }[] = [
    {
      id: 'signature-red',
      name: 'Signature Red & Denim',
      description: 'Official Blue Duck® red branding with deep indigo denim & crisp contrast',
      icon: Flame,
      tag: 'Official Brand Identity',
      colors: {
        bg: '#0a0e1a',
        accent: '#E52020',
        card: '#121829',
        text: '#ffffff'
      }
    },
    {
      id: 'luxury-dark',
      name: 'Modern Luxury Obsidian',
      description: 'Deep black obsidian backdrop with golden amber & crimson neon aura',
      icon: Moon,
      tag: 'Dark Luxury Aesthetic',
      colors: {
        bg: '#05070c',
        accent: '#f59e0b',
        card: '#0c101c',
        text: '#f8fafc'
      }
    },
    {
      id: 'studio-light',
      name: 'Clean Studio Light',
      description: 'High-contrast pure white retail boutique style with crisp denim borders',
      icon: Sun,
      tag: 'Bright Retail Storefront',
      colors: {
        bg: '#f8fafc',
        accent: '#dc2626',
        card: '#ffffff',
        text: '#0f172a'
      }
    }
  ];

  const currentThemeObj = themeOptions.find(t => t.id === theme) || themeOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
          theme === 'studio-light'
            ? 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
            : 'bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-red-500/60'
        }`}
        title="Change Website Design & Visual Theme"
      >
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: currentThemeObj.colors.accent }} />
        <Palette className="w-3.5 h-3.5 text-red-500" />
        <span className="hidden sm:inline">{currentThemeObj.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop click dismiss */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0b0f19] border border-slate-700 shadow-2xl p-3 z-50 space-y-2 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Select Website Design</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">3 Curated Themes</span>
            </div>

            <div className="space-y-1.5">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.id;
                const IconComponent = opt.icon;

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-red-500/80 shadow-md ring-1 ring-red-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    {/* Swatch & Icon */}
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 shadow-inner"
                      style={{ backgroundColor: opt.colors.bg }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: opt.colors.accent }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                          {opt.name}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] text-red-400 font-bold bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {opt.description}
                      </p>

                      {/* Color Palette Indicators */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-4 h-2 rounded-sm border border-white/20" style={{ backgroundColor: opt.colors.bg }} title="Background" />
                        <div className="w-4 h-2 rounded-sm border border-white/20" style={{ backgroundColor: opt.colors.card }} title="Surface Card" />
                        <div className="w-4 h-2 rounded-sm border border-white/20" style={{ backgroundColor: opt.colors.accent }} title="Brand Accent" />
                        <span className="text-[9px] text-slate-500 font-medium ml-1">
                          {opt.tag}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

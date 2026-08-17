import React from 'react';

interface BlueDuckLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showJeansWatermark?: boolean;
  showCompanySubtext?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'colored';
}

export const BlueDuckLogo: React.FC<BlueDuckLogoProps> = ({
  size = 'md',
  showJeansWatermark = true,
  showCompanySubtext = true,
  className = '',
  theme = 'dark'
}) => {
  // Height & scale presets
  const sizeStyles = {
    sm: {
      container: 'h-9 py-0.5',
      mainText: 'text-lg tracking-tight',
      subText: 'text-[9px] tracking-[0.2em]',
      trademark: 'text-[9px]',
      watermark: 'text-2xl',
      companyText: 'text-[9px]'
    },
    md: {
      container: 'h-12 py-1',
      mainText: 'text-2xl sm:text-3xl tracking-tight',
      subText: 'text-[10px] sm:text-[11px] tracking-[0.25em]',
      trademark: 'text-[11px]',
      watermark: 'text-4xl sm:text-5xl',
      companyText: 'text-[10px]'
    },
    lg: {
      container: 'h-16 py-1.5',
      mainText: 'text-3xl sm:text-4xl tracking-tighter',
      subText: 'text-xs sm:text-sm tracking-[0.3em]',
      trademark: 'text-sm',
      watermark: 'text-6xl sm:text-7xl',
      companyText: 'text-xs'
    },
    xl: {
      container: 'h-24 py-2',
      mainText: 'text-4xl sm:text-6xl tracking-tighter',
      subText: 'text-sm sm:text-base tracking-[0.35em]',
      trademark: 'text-base',
      watermark: 'text-8xl sm:text-9xl',
      companyText: 'text-sm'
    },
    hero: {
      container: 'h-32 py-3',
      mainText: 'text-5xl sm:text-7xl md:text-8xl tracking-tighter',
      subText: 'text-base sm:text-lg md:text-xl tracking-[0.4em]',
      trademark: 'text-lg sm:text-xl',
      watermark: 'text-9xl sm:text-[12rem]',
      companyText: 'text-base'
    }
  };

  const currentSize = sizeStyles[size];

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none font-black ${className}`}>
      
      {/* Background Watermark "JEANS" */}
      {showJeansWatermark && (
        <div 
          className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-25 font-black uppercase tracking-widest ${
            theme === 'light' ? 'text-slate-400/30' : 'text-slate-500/25'
          }`}
          style={{
            fontFamily: 'system-ui, -apple-system, Impact, sans-serif',
            zIndex: 0,
            transform: 'scaleY(1.3)'
          }}
          aria-hidden="true"
        >
          <span className={`${currentSize.watermark} font-extrabold tracking-tighter`}>
            JEANS
          </span>
        </div>
      )}

      {/* Main Brand Container */}
      <div className={`relative z-10 flex flex-col items-center justify-center text-center ${currentSize.container}`}>
        
        {/* Top "BLUE DUCK ®" Title */}
        <div className="flex items-start justify-center leading-none">
          <span 
            className={`font-black uppercase text-[#E52020] drop-shadow-[0_2px_10px_rgba(229,32,32,0.35)] ${currentSize.mainText}`}
            style={{
              fontFamily: '"Arial Black", Impact, "Montserrat", sans-serif',
              letterSpacing: '-0.03em',
              fontWeight: 950
            }}
          >
            BLUE DUCK
          </span>
          <span className={`text-[#E52020] font-bold ml-1 -mt-1 ${currentSize.trademark}`}>
            ®
          </span>
        </div>

        {/* Bottom "BOYS BOTTOM" Boxed Banner */}
        <div className="mt-0.5 w-full flex items-center justify-center">
          <div className="relative px-2 py-0.5 bg-transparent border-t-2 border-b-2 border-[#E52020] flex items-center justify-center w-full">
            <span 
              className={`font-extrabold uppercase text-[#E52020] whitespace-nowrap ${currentSize.subText}`}
              style={{
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                fontWeight: 900
              }}
            >
              BOYS BOTTOM
            </span>
          </div>
        </div>

      </div>

      {/* Sub Company Note: M/s AVON ARTS */}
      {showCompanySubtext && (
        <div className="relative z-10 mt-1 flex items-center justify-center gap-1.5 opacity-90">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
            M/s <strong className={`${theme === 'light' ? 'text-slate-900' : 'text-white'} font-bold`}>AVON ARTS</strong>
          </span>
          <span className="text-slate-500 text-[9px]">•</span>
          <span className="text-[9px] text-amber-500 font-medium">MUMBAI-17</span>
        </div>
      )}

    </div>
  );
};

import { Grid3x3, GitCompare } from 'lucide-react';
import type { ViewType } from '@/lib/urlState';

interface SidebarProps {
  currentView: ViewType;
  selectedCount: number;
  onNavigate: (view: ViewType) => void;
}

const Sidebar = ({ currentView, selectedCount, onNavigate }: SidebarProps) => {
  const isDiscoverActive = currentView === 'discover';
  const isCompareActive = currentView === 'compare';
  const isCompareDisabled = selectedCount === 0;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 border-r-2 border-foreground bg-background md:w-60">
      <div className="flex h-full flex-col gap-2 p-2 md:p-4">
        {/* Discover Button */}
        <button
          onClick={() => onNavigate('discover')}
          className={`
            group relative flex items-center justify-center gap-3 border-l-4 px-3 py-4 transition-all
            md:justify-start md:px-4 md:py-3
            ${isDiscoverActive 
              ? 'border-l-blue-500 bg-muted font-bold' 
              : 'border-l-transparent hover:bg-muted/50'
            }
          `}
          aria-current={isDiscoverActive ? 'page' : undefined}
          aria-label="Discover protocols"
        >
          <Grid3x3 className="h-6 w-6 shrink-0 md:h-5 md:w-5" />
          <span className="hidden font-pixel text-sm md:inline">
            Discover
          </span>
        </button>

        {/* Compare Button */}
        <button
          onClick={() => !isCompareDisabled && onNavigate('compare')}
          disabled={isCompareDisabled}
          className={`
            group relative flex items-center justify-center gap-3 border-l-4 px-3 py-4 transition-all
            md:justify-start md:px-4 md:py-3
            ${isCompareActive 
              ? 'border-l-green-500 bg-muted font-bold' 
              : 'border-l-transparent hover:bg-muted/50'
            }
            ${isCompareDisabled 
              ? 'cursor-not-allowed opacity-50' 
              : ''
            }
          `}
          aria-current={isCompareActive ? 'page' : undefined}
          aria-label={`Compare protocols (${selectedCount} selected)`}
          aria-disabled={isCompareDisabled}
        >
          <GitCompare className="h-6 w-6 shrink-0 md:h-5 md:w-5" />
          <span className="hidden font-pixel text-sm md:inline">
            Compare
          </span>
          
          {/* Count Badge */}
          {selectedCount > 0 && (
            <span 
              className={`
                absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full 
                font-pixel text-[10px] transition-all
                md:relative md:right-auto md:top-auto md:ml-auto
                ${selectedCount >= 6 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-green-500 text-white'
                }
              `}
              aria-label={`${selectedCount} protocol${selectedCount !== 1 ? 's' : ''} selected`}
            >
              {selectedCount}
            </span>
          )}
        </button>

        {/* Spacer to push branding to bottom */}
        <div className="flex-1" />

        {/* Bottom Branding (optional) */}
        <div className="hidden border-t-2 border-foreground pt-4 md:block">
          <p className="font-pixel text-[8px] text-muted-foreground">
            YBP v1.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

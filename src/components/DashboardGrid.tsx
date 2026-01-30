import ProtocolCard from './ProtocolCard';
import type { Protocol } from '@/data/mockProtocols';

interface DashboardGridProps {
  protocols: Protocol[];
  selectedForComparison: string[];
  onComparisonToggle: (protocolId: string) => void;
}

const DashboardGrid = ({ protocols, selectedForComparison, onComparisonToggle }: DashboardGridProps) => {
  if (protocols.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center border-2 border-dashed border-muted-foreground/30">
        <div className="text-center">
          <p className="font-pixel text-xs text-muted-foreground">NO PROTOCOLS FOUND</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {protocols.map((protocol) => (
        <ProtocolCard 
          key={protocol.id} 
          protocol={protocol}
          isSelected={selectedForComparison.includes(protocol.id)}
          onToggleComparison={onComparisonToggle}
          isDisabled={!selectedForComparison.includes(protocol.id) && selectedForComparison.length >= 6}
        />
      ))}
    </div>
  );
};

export default DashboardGrid;

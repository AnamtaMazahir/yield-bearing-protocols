import { X } from 'lucide-react';
import type { Protocol } from '@/data/mockProtocols';

interface ComparisonBarProps {
  selectedProtocols: Protocol[];
  onRemove: (protocolId: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

const ComparisonBar = ({ selectedProtocols, onRemove, onClear, onCompare }: ComparisonBarProps) => {
  if (selectedProtocols.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-foreground bg-background p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-pixel text-xs">
              COMPARE ({selectedProtocols.length}/6)
            </span>
            
            <div className="flex gap-2">
              {selectedProtocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className="flex items-center gap-2 border-2 border-foreground px-3 py-1"
                  style={{ borderColor: protocol.accentColor }}
                >
                  <span className="text-sm">{protocol.icon}</span>
                  <span className="font-mono text-xs">{protocol.name}</span>
                  <button
                    onClick={() => onRemove(protocol.id)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClear}
              className="border-2 border-foreground px-4 py-2 font-pixel text-[10px] transition-colors hover:bg-foreground hover:text-background"
            >
              CLEAR
            </button>
            <button
              onClick={onCompare}
              disabled={selectedProtocols.length < 2}
              className="border-2 border-foreground bg-foreground px-4 py-2 font-pixel text-[10px] text-background transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              COMPARE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;

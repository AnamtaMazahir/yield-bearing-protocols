import { ExternalLink, X, ArrowLeft } from 'lucide-react';
import type { Protocol } from '@/data/mockProtocols';
import EmptyCompareState from './EmptyCompareState';

interface CompareViewProps {
  selectedProtocols: Protocol[];
  onRemove: (protocolId: string) => void;
  onClear: () => void;
  onNavigateToDiscover: () => void;
}

const CompareView = ({
  selectedProtocols,
  onRemove,
  onClear,
  onNavigateToDiscover,
}: CompareViewProps) => {
  // Show empty state if no protocols selected
  if (selectedProtocols.length === 0) {
    return <EmptyCompareState onNavigateToDiscover={onNavigateToDiscover} />;
  }

  const comparisonFields = [
    { label: 'APY', key: 'yield' as const, format: (val: number) => `${val.toFixed(1)}%` },
    { label: 'Strategy', key: 'strategy' as const },
    { label: 'Risk', key: 'risk' as const },
    { label: 'Email', key: 'email' as const, format: (val: string | undefined) => val || 'N/A' },
    { label: 'Founder X', key: 'founderTwitter' as const, format: (val: string | undefined) => val ? 'View' : 'N/A' },
    { label: 'Project X', key: 'projectTwitter' as const, format: (val: string | undefined) => val ? 'View' : 'N/A' },
    { label: 'Funders', key: 'funders' as const, format: (val: string[]) => val.length > 0 ? val.join(', ') : 'N/A' },
  ];

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-pixel text-2xl">PROTOCOL COMPARISON</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Comparing {selectedProtocols.length} protocol{selectedProtocols.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onNavigateToDiscover}
            className="flex items-center gap-2 border-2 border-foreground px-4 py-2 font-pixel text-xs transition-colors hover:bg-foreground hover:text-background"
          >
            <ArrowLeft className="h-3 w-3" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <button
            onClick={onClear}
            className="border-2 border-foreground px-4 py-2 font-pixel text-xs transition-colors hover:bg-foreground hover:text-background"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Protocol Preview Cards */}
      <div className="mb-6 flex gap-4 overflow-x-auto pb-4">
        {selectedProtocols.map((protocol) => (
          <div
            key={protocol.id}
            className="pixel-box relative min-w-[200px] overflow-hidden"
          >
            {/* Accent strip */}
            <div className="h-1 w-full" style={{ backgroundColor: protocol.accentColor }} />
            
            {/* Remove button */}
            <button
              onClick={() => onRemove(protocol.id)}
              className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center border-2 border-foreground bg-background transition-colors hover:bg-foreground hover:text-background"
              aria-label={`Remove ${protocol.name}`}
            >
              <X className="h-3 w-3" />
            </button>

            <div className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center border-2 border-foreground text-lg"
                  style={{ backgroundColor: `${protocol.accentColor}20` }}
                >
                  {protocol.icon}
                </div>
                <span className="font-pixel text-[10px] leading-tight">{protocol.name}</span>
              </div>
              
              <div className="text-center">
                <span className="font-pixel text-xl" style={{ color: protocol.accentColor }}>
                  {protocol.yield.toFixed(1)}%
                </span>
                <span className="ml-1 font-mono text-xs text-muted-foreground">APY</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-4 border-foreground">
          <thead>
            <tr className="border-b-2 border-foreground bg-muted">
              <th className="border-r-2 border-foreground p-3 text-left font-pixel text-xs">
                FIELD
              </th>
              {selectedProtocols.map((protocol) => (
                <th
                  key={protocol.id}
                  className="border-r-2 border-foreground p-3 last:border-r-0"
                  style={{ borderColor: protocol.accentColor }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex h-12 w-12 items-center justify-center border-2 border-foreground text-2xl"
                      style={{ backgroundColor: `${protocol.accentColor}20` }}
                    >
                      {protocol.icon}
                    </div>
                    <span className="font-pixel text-[10px]">{protocol.name}</span>
                    <a
                      href={protocol.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map((field, index) => (
              <tr
                key={field.label}
                className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
              >
                <td className="border-r-2 border-t-2 border-foreground p-3 font-pixel text-xs">
                  {field.label}
                </td>
                {selectedProtocols.map((protocol) => {
                  const value = protocol[field.key];
                  let displayValue: string;
                  
                  if (field.format) {
                    displayValue = field.format(value as never);
                  } else {
                    displayValue = String(value);
                  }

                  const isAPY = field.key === 'yield';
                  const isLink = field.key === 'founderTwitter' || field.key === 'projectTwitter';
                  
                  return (
                    <td
                      key={protocol.id}
                      className="border-r-2 border-t-2 border-foreground p-3 text-center font-mono text-xs last:border-r-0"
                      style={
                        isAPY
                          ? {
                              backgroundColor: `${protocol.accentColor}20`,
                              borderColor: protocol.accentColor,
                            }
                          : {}
                      }
                    >
                      {isAPY ? (
                        <span
                          className="font-pixel text-lg font-bold"
                          style={{ color: protocol.accentColor }}
                        >
                          {displayValue}
                        </span>
                      ) : isLink && value ? (
                        <a
                          href={value as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {displayValue}
                        </a>
                      ) : (
                        <span className="text-xs">{displayValue}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareView;

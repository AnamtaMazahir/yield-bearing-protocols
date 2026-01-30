import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';
import type { Protocol } from '@/data/mockProtocols';

interface ComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  protocols: Protocol[];
}

const ComparisonModal = ({ open, onOpenChange, protocols }: ComparisonModalProps) => {
  if (protocols.length === 0) return null;

  const comparisonFields = [
    { label: 'APY', key: 'yield' as const, format: (val: number) => `${val.toFixed(1)}%` },
    { label: 'Strategy', key: 'strategy' as const },
    { label: 'Risk', key: 'risk' as const },
    { label: 'Founder', key: 'founder' as const },
    { label: 'Funders', key: 'funders' as const, format: (val: string[]) => val.join(', ') },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl border-4 border-foreground">
        <DialogHeader>
          <DialogTitle className="font-pixel text-xl">PROTOCOL COMPARISON</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-2 border-foreground">
            <thead>
              <tr className="border-b-2 border-foreground bg-muted">
                <th className="border-r-2 border-foreground p-3 text-left font-pixel text-xs">
                  FIELD
                </th>
                {protocols.map((protocol) => (
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
                  {protocols.map((protocol, pIndex) => {
                    const value = protocol[field.key];
                    const displayValue = field.format
                      ? field.format(value as any)
                      : value;

                    // Special styling for APY
                    const isAPY = field.key === 'yield';
                    
                    return (
                      <td
                        key={protocol.id}
                        className={`border-r-2 border-t-2 border-foreground p-3 text-center font-mono text-xs last:border-r-0 ${
                          pIndex % 2 === 0 ? '' : ''
                        }`}
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

        <div className="mt-4 text-center">
          <button
            onClick={() => onOpenChange(false)}
            className="border-2 border-foreground bg-foreground px-6 py-2 font-pixel text-xs text-background transition-colors hover:bg-background hover:text-foreground"
          >
            CLOSE
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;

import { ExternalLink, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';
import type { Protocol } from '@/data/mockProtocols';
import { Checkbox } from '@/components/ui/checkbox';

interface ProtocolCardProps {
  protocol: Protocol;
  isSelected?: boolean;
  onToggleComparison?: (protocolId: string) => void;
  isDisabled?: boolean;
}

// Remove hardcoded strategy colors - use protocol.accentColor dynamically

const riskColors: Record<string, string> = {
  'Low': 'bg-risk-low text-risk-low-foreground',
  'Medium': 'bg-risk-medium text-risk-medium-foreground',
  'High': 'bg-risk-high text-risk-high-foreground',
};

const ProtocolCard = ({ protocol, isSelected = false, onToggleComparison, isDisabled = false }: ProtocolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate progress bar width (max at 25% yield for visual)
  const progressWidth = Math.min((protocol.yield / 25) * 100, 100);

  // Check if there's any hover content to show
  const hasHoverContent = protocol.founderTwitter || 
                          protocol.projectTwitter || 
                          protocol.email || 
                          protocol.funders.length > 0;

  return (
    <div
      className="pixel-box pixel-hover relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? protocol.accentColor : undefined,
      }}
    >
      {/* Accent strip at top */}
      <div 
        className="h-1 w-full"
        style={{ backgroundColor: protocol.accentColor }}
      />
      
      <div className="p-4">
        {/* Header row */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center border-2 border-foreground text-xl"
              style={{ backgroundColor: `${protocol.accentColor}20` }}
            >
              {protocol.icon}
            </div>
            <span className="font-pixel text-[10px] leading-tight">
              {protocol.name}
            </span>
          </div>
          
          <a
            href={protocol.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        
        {/* Yield display */}
        <div className="mb-4">
          <div className="mb-2 text-center">
            <span className="font-pixel text-2xl" style={{ color: protocol.accentColor }}>
              {protocol.yield.toFixed(1)}%
            </span>
            <span className="ml-1 font-mono text-xs text-muted-foreground">APY</span>
          </div>
          
          {/* Pixel progress bar */}
          <div className="pixel-progress">
            <div 
              className="pixel-progress-fill transition-all duration-300"
              style={{ 
                width: `${progressWidth}%`,
                backgroundColor: protocol.accentColor,
              }}
            />
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <span 
              className="border-2 px-2 py-1 font-mono text-[10px]"
              style={{ 
                borderColor: protocol.accentColor,
                color: protocol.accentColor 
              }}
            >
              {protocol.strategy}
            </span>
            <span className={`border-2 border-transparent px-2 py-1 font-mono text-[10px] ${riskColors[protocol.risk]}`}>
              {protocol.risk}
            </span>
          </div>
          
          {/* Comparison checkbox - bottom right */}
          {onToggleComparison && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleComparison(protocol.id)}
              disabled={isDisabled}
              className="border-2 border-foreground bg-background data-[state=checked]:bg-foreground data-[state=checked]:text-background"
            />
          )}
        </div>
        
        {/* Hover reveal - Contact \u0026 Funding Info */}
        {hasHoverContent && (
          <div 
            className={`
              mt-4 overflow-hidden border-t border-dashed border-muted-foreground/30 pt-3
              transition-all duration-200
              ${isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="space-y-1.5">
              {protocol.founderTwitter && (
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] text-muted-foreground">FOUNDER X:</span>
                  <a
                    href={protocol.founderTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              )}
              
              {protocol.projectTwitter && (
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] text-muted-foreground">PROJECT X:</span>
                  <a
                    href={protocol.projectTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              )}
              
              {protocol.email && (
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] text-muted-foreground">EMAIL:</span>
                  <a
                    href={`mailto:${protocol.email}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              )}
              
              {protocol.funders.length > 0 && (
                <p className="font-mono text-xs text-muted-foreground">
                  <span className="font-pixel text-[10px]">FUNDERS:</span> {protocol.funders.join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtocolCard;

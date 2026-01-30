interface FilterPillsProps {
  availableStrategies: string[];
  selectedStrategies: string[];
  selectedRisks: string[];
  onStrategyToggle: (strategy: string) => void;
  onRiskToggle: (risk: string) => void;
}

const riskLevels = ['Low', 'Medium', 'High'] as const;

const riskColors: Record<string, string> = {
  'Low': 'bg-risk-low text-risk-low-foreground',
  'Medium': 'bg-risk-medium text-risk-medium-foreground',
  'High': 'bg-risk-high text-risk-high-foreground',
};

const FilterPills = ({
  availableStrategies,
  selectedStrategies,
  selectedRisks,
  onStrategyToggle,
  onRiskToggle,
}: FilterPillsProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      {/* Strategy filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-pixel text-[8px] text-muted-foreground uppercase">Strategy:</span>
        {availableStrategies.map((strategy) => {
          const isSelected = selectedStrategies.includes(strategy);
          return (
            <button
              key={strategy}
              onClick={() => onStrategyToggle(strategy)}
              className={`
                border-2 px-3 py-1.5 font-mono text-xs transition-all whitespace-nowrap
                ${isSelected 
                  ? 'border-foreground bg-foreground text-background' 
                  : 'border-muted-foreground/30 text-muted-foreground hover:border-foreground hover:text-foreground'
                }
              `}
            >
              {strategy}
            </button>
          );
        })}
      </div>

      {/* Risk filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-pixel text-[8px] text-muted-foreground uppercase">Risk:</span>
        {riskLevels.map((risk) => {
          const isSelected = selectedRisks.includes(risk);
          return (
            <button
              key={risk}
              onClick={() => onRiskToggle(risk)}
              className={`
                border-2 border-transparent px-3 py-1.5 font-mono text-xs transition-all
                ${isSelected 
                  ? riskColors[risk]
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {risk}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPills;

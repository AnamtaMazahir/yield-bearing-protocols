import { GitCompare } from 'lucide-react';

interface EmptyCompareStateProps {
  onNavigateToDiscover: () => void;
}

const EmptyCompareState = ({ onNavigateToDiscover }: EmptyCompareStateProps) => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="max-w-md space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center border-4 border-foreground bg-muted">
            <GitCompare className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="font-pixel text-xl">No Protocols Selected</h2>
          <p className="font-mono text-sm text-muted-foreground">
            Please select up to 6 protocols to compare
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onNavigateToDiscover}
          className="border-2 border-foreground bg-foreground px-6 py-3 font-pixel text-sm text-background transition-colors hover:bg-background hover:text-foreground"
        >
          Discover Protocols →
        </button>

        {/* Helper Text */}
        <p className="font-mono text-xs text-muted-foreground">
          Click the checkboxes on protocol cards to add them to comparison
        </p>
      </div>
    </div>
  );
};

export default EmptyCompareState;

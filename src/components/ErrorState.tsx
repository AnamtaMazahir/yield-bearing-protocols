import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message = 'Failed to load protocols', onRetry }: ErrorStateProps) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center border-2 border-dashed border-muted-foreground/30">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <p className="font-pixel text-xs text-foreground">ERROR</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 border-2 border-foreground bg-background px-4 py-2 font-pixel text-[10px] transition-colors hover:bg-foreground hover:text-background"
          >
            <RefreshCw className="h-3 w-3" />
            RETRY
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;

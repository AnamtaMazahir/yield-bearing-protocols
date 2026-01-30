const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="pixel-box relative overflow-hidden"
        >
          {/* Accent strip */}
          <div className="h-1 w-full animate-pulse bg-muted" />
          
          <div className="p-4">
            {/* Header skeleton */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse border-2 border-foreground bg-muted" />
                <div className="h-3 w-20 animate-pulse bg-muted" />
              </div>
              <div className="h-4 w-4 animate-pulse bg-muted" />
            </div>
            
            {/* Yield skeleton */}
            <div className="mb-4">
              <div className="mb-2 text-center">
                <div className="mx-auto h-8 w-24 animate-pulse bg-muted" />
              </div>
              <div className="pixel-progress">
                <div className="pixel-progress-fill h-full w-1/2 animate-pulse bg-muted" />
              </div>
            </div>
            
            {/* Badges skeleton */}
            <div className="flex items-center justify-between gap-2">
              <div className="h-6 w-20 animate-pulse border-2 border-foreground bg-muted" />
              <div className="h-6 w-16 animate-pulse bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;

const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs tracking-tight">YBP</span>
          <span className="hidden sm:inline font-pixel text-[8px] text-muted-foreground">
            YIELD BEARING PROTOCOLS
          </span>
        </div>
        
        <nav className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            v1.0
          </span>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;

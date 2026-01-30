import { useState, useMemo, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';
import DashboardGrid from '@/components/DashboardGrid';
import ComparisonBar from '@/components/ComparisonBar';
import ComparisonModal from '@/components/ComparisonModal';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import type { Protocol } from '@/data/mockProtocols';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  
  // API state
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch protocols from API on mount
  useEffect(() => {
    fetchProtocols();
  }, []);

  const fetchProtocols = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/protocols');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch protocols: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProtocols(data);
    } catch (err: any) {
      console.error('Error fetching protocols:', err);
      setError(err.message || 'Failed to load protocols');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStrategyToggle = (strategy: string) => {
    setSelectedStrategies(prev =>
      prev.includes(strategy)
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleRiskToggle = (risk: string) => {
    setSelectedRisks(prev =>
      prev.includes(risk)
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    );
  };

  const handleComparisonToggle = (protocolId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(protocolId)) {
        return prev.filter(id => id !== protocolId);
      }
      if (prev.length >= 6) {
        return prev; // Max 6 protocols
      }
      return [...prev, protocolId];
    });
  };

  const handleRemoveFromComparison = (protocolId: string) => {
    setSelectedForComparison(prev => prev.filter(id => id !== protocolId));
  };

  const handleClearComparison = () => {
    setSelectedForComparison([]);
  };

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      setIsComparisonModalOpen(true);
    }
  };

  const filteredProtocols = useMemo(() => {
    return protocols.filter(protocol => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        protocol.name.toLowerCase().includes(searchLower) ||
        protocol.strategy.toLowerCase().includes(searchLower);

      // Strategy filter
      const matchesStrategy =
        selectedStrategies.length === 0 ||
        selectedStrategies.includes(protocol.strategy);

      // Risk filter
      const matchesRisk =
        selectedRisks.length === 0 ||
        selectedRisks.includes(protocol.risk);

      return matchesSearch && matchesStrategy && matchesRisk;
    });
  }, [searchQuery, selectedStrategies, selectedRisks, protocols]);

  const selectedProtocolsData = useMemo(() => {
    return protocols.filter(p => selectedForComparison.includes(p.id));
  }, [selectedForComparison, protocols]);

  // Extract unique strategies from fetched protocols
  const uniqueStrategies = useMemo(() => {
    return [...new Set(protocols.map(p => p.strategy))].sort();
  }, [protocols]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <main className="container py-6 pb-24">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            <div className="mb-4">
              <div className="h-10 w-full animate-pulse bg-muted" />
            </div>
            <LoadingState />
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <ErrorState message={error} onRetry={fetchProtocols} />
        )}

        {/* Main Content */}
        {!isLoading && !error && (
          <>
            {/* Search */}
            <div className="mb-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            
            {/* Filters */}
            <div className="mb-6">
              <FilterPills
                availableStrategies={uniqueStrategies}
                selectedStrategies={selectedStrategies}
                selectedRisks={selectedRisks}
                onStrategyToggle={handleStrategyToggle}
                onRiskToggle={handleRiskToggle}
              />
            </div>
            
            {/* Protocol count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">
                {filteredProtocols.length} protocol{filteredProtocols.length !== 1 ? 's' : ''}
              </p>
              {(selectedStrategies.length > 0 || selectedRisks.length > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStrategies([]);
                    setSelectedRisks([]);
                  }}
                  className="font-pixel text-[8px] text-muted-foreground hover:text-foreground"
                >
                  CLEAR ALL
                </button>
              )}
            </div>
            
            {/* Grid */}
            <DashboardGrid 
              protocols={filteredProtocols} 
              selectedForComparison={selectedForComparison}
              onComparisonToggle={handleComparisonToggle}
            />
            
            {/* Footer tagline */}
            <footer className="mt-12 border-t border-muted-foreground/20 pt-6 text-center">
              <p className="font-mono text-[10px] text-muted-foreground">
                A curated index of on-chain yield opportunities
              </p>
            </footer>
          </>
        )}
      </main>

      {/* Comparison Bar */}
      <ComparisonBar
        selectedProtocols={selectedProtocolsData}
        onRemove={handleRemoveFromComparison}
        onClear={handleClearComparison}
        onCompare={handleCompare}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        open={isComparisonModalOpen}
        onOpenChange={setIsComparisonModalOpen}
        protocols={selectedProtocolsData}
      />
    </div>
  );
};

export default Index;

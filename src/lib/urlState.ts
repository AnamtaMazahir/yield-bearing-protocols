/**
 * URL State Management Utilities
 * Handles synchronization of app state with URL parameters
 */

export type ViewType = 'discover' | 'compare';

/**
 * Get current view from URL parameters
 * Default: 'discover'
 */
export function getViewFromURL(): ViewType {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  
  if (view === 'compare') return 'compare';
  return 'discover';
}

/**
 * Get selected protocol IDs from URL parameters
 * Format: ?protocols=id1,id2,id3
 */
export function getSelectedProtocolsFromURL(): string[] {
  const params = new URLSearchParams(window.location.search);
  const protocolsParam = params.get('protocols');
  
  if (!protocolsParam) return [];
  
  // Split by comma and filter out empty strings
  const protocols = protocolsParam.split(',').filter(id => id.trim() !== '');
  
  // Limit to max 6 protocols
  return protocols.slice(0, 6);
}

/**
 * Update URL with current view and selected protocols
 * Uses pushState to update without page reload
 */
export function updateURL(view: ViewType, protocolIds: string[]): void {
  const params = new URLSearchParams();
  
  // Always set view
  params.set('view', view);
  
  // Only add protocols if there are any selected
  if (protocolIds.length > 0) {
    params.set('protocols', protocolIds.join(','));
  }
  
  // Update URL without reload
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({ view, protocols: protocolIds }, '', newURL);
}

/**
 * Parse URL state (view + protocols)
 * Returns object with both values
 */
export function parseURLState(): { view: ViewType; protocols: string[] } {
  return {
    view: getViewFromURL(),
    protocols: getSelectedProtocolsFromURL(),
  };
}

/**
 * Create a shareable URL for current state
 */
export function createShareableURL(view: ViewType, protocolIds: string[]): string {
  const params = new URLSearchParams();
  params.set('view', view);
  
  if (protocolIds.length > 0) {
    params.set('protocols', protocolIds.join(','));
  }
  
  return `${window.location.origin}/?${params.toString()}`;
}

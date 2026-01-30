export interface Protocol {
  id: string;
  name: string;
  icon: string;
  website: string;
  yield: number;
  strategy: string; // Now accepts any strategy from Notion
  risk: 'Low' | 'Medium' | 'High';
  founder?: string; // Deprecated but kept for backward compatibility
  founderTwitter?: string; // NEW - Founder X account URL
  projectTwitter?: string; // NEW - Project X account URL  
  email?: string; // NEW - Contact email
  funders: string[];
  accentColor: string;
}

// Mock protocols removed - data now fetched from Notion API
// See /api/protocols endpoint
export const mockProtocols: Protocol[] = [];

// Strategies are now dynamic - extracted from fetched protocols
// No longer hardcoded to 4 values

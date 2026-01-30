/**
 * Notion API service layer
 * Handles fetching and transforming data from Notion database
 */

import { getProtocolEmoji, getStrategyColor, generateWebsiteURL } from './notionMapping.js';

export interface Protocol {
  id: string;
  name: string;
  icon: string;
  website: string;
  yield: number;
  strategy: string;
  risk: 'Low' | 'Medium' | 'High';
  founderTwitter?: string;
  projectTwitter?: string;
  email?: string;
  funders: string[];
  accentColor: string;
}

interface NotionPage {
  id: string;
  properties: any;
}

/**
 * Transform Notion page object to Protocol interface
 */
function transformNotionPageToProtocol(page: NotionPage): Protocol | null {
  try {
    const props = page.properties;
    
    // Extract name (required field)
    const name = props.Name?.title?.[0]?.plain_text || props.Page?.title?.[0]?.plain_text;
    if (!name || name.trim() === '') {
      return null; // Skip empty entries
    }
    
    // Extract strategy (required field)
    const strategy = props['Underlying Strategy']?.select?.name || 'Other';
    
    // Extract yield (convert from whole number to decimal if present)
    const yieldValue = props['Yield %']?.number || 0;
    
    // Extract risk (default to Medium if not set)
    const risk = (props.Risk?.select?.name as 'Low' | 'Medium' | 'High') || 'Medium';
    
    // Extract email (optional)
    const email = props.Email?.email || undefined;
    
    // Extract Project X (URL)
    const projectTwitter = props['Project X']?.url || undefined;
    
    // Extract Founder X (rich_text with link)
    let founderTwitter: string | undefined;
    if (props['Founder X']?.rich_text?.[0]) {
      const richText = props['Founder X'].rich_text[0];
      founderTwitter = richText.href || richText.text?.link?.url || undefined;
    }
    
    // Extract funders (multi-select)
    const funders = props['Top Funders']?.multi_select?.map((f: any) => f.name) || [];
    
    // Generate derived fields
    const icon = getProtocolEmoji(name, strategy);
    const accentColor = getStrategyColor(strategy);
    const website = generateWebsiteURL(name);
    
    return {
      id: page.id,
      name,
      icon,
      website,
      yield: yieldValue,
      strategy,
      risk,
      founderTwitter,
      projectTwitter,
      email,
      funders,
      accentColor,
    };
  } catch (error) {
    console.error('Error transforming Notion page:', error);
    return null;
  }
}

/**
 * Fetch all protocols from Notion database
 */
export async function fetchProtocolsFromNotion(
  apiKey: string,
  databaseId: string
): Promise<Protocol[]> {
  try {
    // Use direct fetch since SDK query method might not be available
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_size: 100, // Max allowed by Notion API
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Notion API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // Transform all pages to Protocol objects and filter out nulls
    const protocols = data.results
      .map((page: NotionPage) => transformNotionPageToProtocol(page))
      .filter((p: Protocol | null): p is Protocol => p !== null);

    console.log(`Fetched ${protocols.length} protocols from Notion`);
    
    return protocols;
  } catch (error) {
    console.error('Error fetching protocols from Notion:', error);
    throw error;
  }
}

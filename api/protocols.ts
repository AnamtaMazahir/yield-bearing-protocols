/**
 * Vercel Serverless Function
 * GET /api/protocols
 * 
 * Fetches protocols from Notion database and returns as JSON
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchProtocolsFromNotion } from '../src/lib/notionService';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get credentials from environment variables
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) {
      console.error('Missing Notion credentials');
      return res.status(500).json({ 
        error: 'Server configuration error: Missing Notion credentials' 
      });
    }

    // Fetch protocols from Notion
    const protocols = await fetchProtocolsFromNotion(apiKey, databaseId);

    // Return protocols as JSON
    return res.status(200).json(protocols);
    
  } catch (error: any) {
    console.error('Error in /api/protocols:', error);
    
    return res.status(500).json({ 
      error: 'Failed to fetch protocols',
      message: error.message || 'Unknown error'
    });
  }
}

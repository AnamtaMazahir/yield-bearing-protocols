/**
 * Notion data transformation utilities
 * Maps protocol names to emojis and strategies to colors
 */

// Protocol name to emoji mapping (all 87 protocols from Notion DB)
export const protocolEmojiMap: Record<string, string> = {
  // Restaking & Liquid Restaking
  'Karak': '⚡',
  'EigenLayer': '🔷',
  'Puffer Finance': '🐡',
  'Kelp DAO': '🌿',
  'Renzo Protocol': '🎯',
  'ether.fi': '🔮',
  
  // Liquid Staking
  'Lido Finance': '🔷',
  'Lido stSOL': '◆',
  'Rocket Pool': '🚀',
  'Stakewise': '💎',
  'Frax Finance': '❄️',
  'Ankr': '⚓',
  'Swell Network': '🌊',
  'Stader': '⭐',
  'Coinbase cbETH': '🏦',
  'Binance wBETH': '🟡',
  'Binance bSOL': '🟨',
  'Jito': '⚡',
  'Marinade Finance': '🍜',
  'Acala': '🦅',
  'Bifrost': '🌈',
  'P-stake Finance': '📊',
  'Stride': '🏃',
  'Origin Protocol': '🌐',
  
  // Bitcoin Protocols
  'Lombard Finance': '🏔️',
  'Babylon Chain': '🏛️',
  'Solv Protocol': '🧩',
  'BounceBit': '⚡',
  
  // Lending
  'Aave': '👻',
  'Compound': '🏛️',
  'Morpho': '🦋',
  'Kamino': '🎯',
  'Silo Finance': '🌾',
  'Radiant Capital': '💫',
  'Spark Protocol': '✨',
  'Venus Protocol': '♀️',
  'Benqi': '🏔️',
  'Fluid': '💧',
  'Solend (Save)': '💰',
  'Scallop': '🐚',
  'Navi Protocol': '🧭',
  'Gearbox': '⚙️',
  'Euler': '📐',
  'Marginfi': '📊',
  
  // DEX
  'Curve Finance': '📈',
  'GMX': '🔵',
  'Jupiter': '🪐',
  'Orca': '🐋',
  'Raydium': '🌟',
  'Aerodrome': '✈️',
  'Velodrome': '🚴',
  'Camelot': '⚔️',
  'Trader Joe': '☕',
  'Balancer': '⚖️',
  'Osmosis': '🌀',
  
  // RWA
  'Ondo Finance': '🏛️',
  'Mountain Protocol': '⛰️',
  'Franklin Templeton': '🦅',
  'BlackRock (BUIDL)': '🏴',
  'Circle (USDC)': '⭕',
  'Hashnote': '📝',
  'Backed Finance': '💼',
  'Centrifuge': '🌀',
  'Securitize': '🔐',
  'Superstate': '🏛️',
  'Dinari': '📊',
  'Usual Money': '💵',
  
  // Credit & Lending
  'Maple Finance': '🍁',
  'Goldfinch': '🐦',
  'TrueFi': '✅',
  'Credix': '💳',
  'Clearpool': '💎',
  
  // Aggregators & Vaults
  'Yearn Finance': '💰',
  'Beefy Finance': '🥩',
  'Sommelier': '🍷',
  'Convex Finance': '🔺',
  
  // Yield & Trading
  'Pendle Finance': '⚡',
  'Aura Finance': '🌟',
  'Synthetix': '⚗️',
  'Gains Network': '📈',
  
  // Perps & Perpetuals
  'Hyperliquid': '💧',
  'Drift Protocol': '🌊',
  
  // Stablecoin & Savings
  'Sky (MakerDAO)': '☁️',
  'Liquity': '💎',
  'Angle Protocol': '📐',
  'Ethena': '🎯',
  
  // Liquidity
  'Elixir': '🧪',
};

// Fallback emoji mapping based on strategy
const strategyEmojiMap: Record<string, string> = {
  'Restaking': '⚡',
  'Liquid Restaking': '💧',
  'Liquid Staking': '💎',
  'Bitcoin Staking': '₿',
  'Bitcoin Yield': '🪙',
  'Bitcoin CeDeFi': '🏦',
  'Lending': '💰',
  'DEX': '📊',
  'RWA': '🏛️',
  'Credit': '💳',
  'Aggregator': '🔄',
  'Vaults': '🏦',
  'Yield Boost': '📈',
  'Yield Trading': '💹',
  'Perpetuals': '🔁',
  'Perps': '📉',
  'Real Yield': '💵',
  'Stablecoin': '💵',
  'Savings': '🏦',
  'Delta Neutral': '⚖️',
  'Liquidity': '💧',
};

// Strategy to color mapping (deterministic colors for 21 strategies)
export const strategyColorMap: Record<string, string> = {
  'Aggregator': '#9C27B0',        // Purple
  'Bitcoin CeDeFi': '#FF9800',    // Orange
  'Bitcoin Staking': '#F57C00',   // Dark Orange
  'Bitcoin Yield': '#FF6F00',     // Amber
  'Credit': '#8BC34A',            // Light Green
  'DEX': '#4F67E4',               // Blue
  'Delta Neutral': '#00BCD4',     // Cyan
  'Lending': '#B6509E',           // Pink Purple
  'Liquid Restaking': '#3F51B5',  // Indigo
  'Liquid Staking': '#00A3FF',    // Sky Blue
  'Liquidity': '#009688',         // Teal
  'Perpetuals': '#E91E63',        // Pink
  'Perps': '#C2185B',             // Dark Pink
  'RWA': '#FF6B4A',               // Coral
  'Real Yield': '#00D395',        // Green
  'Restaking': '#5C6BC0',         // Blue Purple
  'Savings': '#4CAF50',           // Green
  'Stablecoin': '#8E24AA',        // Purple
  'Vaults': '#7B61FF',            // Violet
  'Yield Boost': '#FFC107',       // Yellow
  'Yield Trading': '#00E676',     // Bright Green
};

/**
 * Get emoji for a protocol based on name, with fallback to strategy
 */
export function getProtocolEmoji(protocolName: string, strategy: string): string {
  // First try direct protocol name match
  if (protocolEmojiMap[protocolName]) {
    return protocolEmojiMap[protocolName];
  }
  
  // Fallback to strategy-based emoji
  if (strategyEmojiMap[strategy]) {
    return strategyEmojiMap[strategy];
  }
  
  // Ultimate fallback
  return '🔹';
}

/**
 * Get color for a strategy (deterministic)
 */
export function getStrategyColor(strategy: string): string {
  return strategyColorMap[strategy] || '#6B7280'; // Gray fallback
}

/**
 * Generate website URL from protocol name
 * This is a best-effort approach since websites aren't in Notion
 */
export function generateWebsiteURL(protocolName: string): string {
  // Remove common suffixes and clean name
  const cleanName = protocolName
    .toLowerCase()
    .replace(/\s+finance$/i, '')
    .replace(/\s+protocol$/i, '')
    .replace(/\s+network$/i, '')
    .replace(/\s+dao$/i, '')
    .replace(/\s+chain$/i, '')
    .replace(/\(.*?\)/g, '') // Remove parentheses content
    .trim()
    .replace(/\s+/g, '');
  
  // Special cases
  const specialCases: Record<string, string> = {
    'lido': 'https://lido.fi',
    'lidostsol': 'https://lido.fi',
    'aave': 'https://aave.com',
    'gmx': 'https://gmx.io',
    'pendle': 'https://pendle.finance',
    'morpho': 'https://morpho.org',
    'ondo': 'https://ondo.finance',
    'rocketpool': 'https://rocketpool.net',
    'yearn': 'https://yearn.fi',
    'curve': 'https://curve.fi',
    'uniswap': 'https://uniswap.org',
    'eigenlayer': 'https://eigenlayer.xyz',
    'ether.fi': 'https://ether.fi',
    'etherfi': 'https://ether.fi',
    'sky': 'https://sky.money',
    'makerdao': 'https://makerdao.com',
    'jito': 'https://jito.network',
    'marinade': 'https://marinade.finance',
    'jupiter': 'https://jup.ag',
    'drift': 'https://drift.trade',
    'marginfi': 'https://marginfi.com',
    'kamino': 'https://kamino.finance',
    'solend': 'https://solend.fi',
    'blackrock': 'https://blackrock.com',
    'coinbasecbeth': 'https://coinbase.com',
    'circle': 'https://circle.com',
    'hyperliquid': 'https://hyperliquid.xyz',
    'ethena': 'https://ethena.fi',
    'usual': 'https://usual.money',
    'babylon': 'https://babylonchain.io',
  };
  
  if (specialCases[cleanName]) {
    return specialCases[cleanName];
  }
  
  // Default pattern: https://{name}.{extension}
  // Most DeFi protocols use .finance, .fi, .xyz, or .io
  const extensions = ['.finance', '.fi', '.xyz', '.io', '.money', '.org', '.network'];
  
  // Use .finance as default
  return `https://${cleanName}.finance`;
}

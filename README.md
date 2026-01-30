# Yield Bearing Protocols Dashboard

A modern, pixel-art styled dashboard for discovering and comparing on-chain yield opportunities. This application fetches real-time data from a Notion database containing 87+ yield-bearing protocols across DeFi.

![Built with React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-teal)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Key Features Deep Dive](#-key-features-deep-dive)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### **Protocol Discovery**
- 📊 **87+ Live Protocols** - Real-time data from Notion database
- 🔍 **Smart Search** - Search by protocol name or strategy type
- 🏷️ **Dynamic Filters** - Filter by 21+ strategy types and risk levels (Low/Medium/High)
- 🎨 **Pixel-Art Design** - Retro aesthetic with modern UX
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

### **Protocol Comparison**
- ✅ **Multi-Select** - Compare up to 6 protocols side-by-side
- 📊 **Detailed Metrics** - APY, strategy, risk, funders, and contact info
- 🔗 **Shareable URLs** - Share comparisons via URL parameters
- 💾 **Persistent State** - Browser back/forward navigation support
- 🎯 **Two Compare Modes**:
  - Quick Preview Modal (bottom bar)
  - Full-Page Comparison View (sidebar navigation)

### **Navigation & UX**
- 🧭 **Fixed Sidebar** - Easy navigation between Discover and Compare views
- 🔄 **View Switching** - Toggle between discovery and comparison modes
- 📌 **Comparison Bar** - Sticky bottom bar shows selected protocols
- 🎭 **Empty States** - Helpful guidance when no protocols are selected
- ⚡ **Loading States** - Skeleton loaders for smooth UX

### **Data Display**
- 🔗 **Protocol Links** - Direct links to protocol websites
- 📧 **Contact Info** - Email, Founder Twitter, Project Twitter
- 💰 **Funding Info** - Top funders for each protocol
- 🎯 **Auto-Generated Icons** - Protocol-specific emojis based on names
- 🎨 **Color-Coded Strategies** - 21 unique colors for strategy types

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [React 18](https://react.dev/) with TypeScript |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend** | [Vercel Serverless Functions](https://vercel.com/docs/functions) |
| **Database** | [Notion API](https://developers.notion.com/) |
| **Routing** | URL State Management (custom implementation) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **Notion Account** with API access

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd yield-bearing-protocols

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Add your Notion credentials to .env.local
# NOTION_API_KEY=your_notion_api_key
# NOTION_DATABASE_ID=your_database_id

# 5. Start development server
npm run dev
```

The app will be running at **http://localhost:8080**

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
yield-bearing-protocols/
├── api/
│   └── protocols.ts              # Vercel serverless function (Notion API)
├── src/
│   ├── components/
│   │   ├── CompareView.tsx       # Full-page comparison view
│   │   ├── ComparisonBar.tsx     # Bottom sticky comparison bar
│   │   ├── ComparisonModal.tsx   # Quick comparison modal
│   │   ├── DashboardGrid.tsx     # Protocol grid layout
│   │   ├── EmptyCompareState.tsx # Empty state for compare view
│   │   ├── ErrorState.tsx        # Error display with retry
│   │   ├── FilterPills.tsx       # Strategy & risk filters
│   │   ├── LoadingState.tsx      # Skeleton loader
│   │   ├── ProtocolCard.tsx      # Individual protocol card
│   │   ├── SearchBar.tsx         # Search input
│   │   ├── Sidebar.tsx           # Fixed sidebar navigation
│   │   └── TopBar.tsx            # Header/branding
│   ├── data/
│   │   └── mockProtocols.ts      # TypeScript interfaces
│   ├── lib/
│   │   ├── notionMapping.ts      # Emoji & color generation
│   │   ├── notionService.ts      # Notion API integration
│   │   ├── urlState.ts           # URL state management
│   │   └── utils.ts              # Utility functions
│   ├── pages/
│   │   └── Index.tsx             # Main application page
│   └── main.tsx                  # App entry point
├── .env.local                    # Environment variables (gitignored)
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind configuration
└── vercel.json                   # Vercel deployment config
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NOTION_API_KEY=ntn_your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

### Notion Database Schema

Your Notion database should have these properties:

| Property Name | Type | Description |
|--------------|------|-------------|
| `Name` | Title | Protocol name |
| `Website` | URL | Protocol website (optional, auto-generated if missing) |
| `Strategy` | Select/Multi-Select | Yield strategy type |
| `Yield` | Number | APY percentage (e.g., 5 = 5%) |
| `Risk` | Select | Risk level (Low/Medium/High) |
| `Email` | Email | Contact email |
| `Founder X` | URL | Founder's Twitter/X profile |
| `Project X` | URL | Project's Twitter/X profile |
| `Top Funders` | Multi-Select | List of funding organizations |

### Vite Configuration

The dev server is configured to proxy `/api/protocols` requests:

```typescript
// vite.config.ts
server: {
  port: 8080,
  middlewareMode: false,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      configure: (proxy, options) => {
        // Custom middleware handles /api/protocols
      }
    }
  }
}
```

---

## 🎯 Key Features Deep Dive

### 1. **Sidebar Navigation**

The fixed sidebar provides seamless navigation between views:

- **Discover View**: Browse all protocols with search/filters
- **Compare View**: See selected protocols side-by-side
- **Badge Counter**: Shows how many protocols are selected (0-6)
- **Responsive**: 64px (mobile) → 240px (desktop)

**Implementation**: `src/components/Sidebar.tsx`

### 2. **URL State Management**

Shareable URLs with persistent state:

```
# Discover view
/?view=discover

# Compare view with protocols
/?view=compare&protocols=lido,aave,gmx
```

**Features**:
- Shareable links
- Browser back/forward support
- State persists across refreshes

**Implementation**: `src/lib/urlState.ts`

### 3. **Dynamic Protocol Loading**

Data is fetched from Notion on every page load:

```typescript
// Fetch from serverless function
const response = await fetch('/api/protocols');
const protocols = await response.json();
```

**Features**:
- Auto-generates emojis based on protocol names
- Auto-generates colors for strategy types
- Auto-generates website URLs if missing
- Supports unlimited strategies (not hardcoded)

**Implementation**: 
- `api/protocols.ts` - Serverless function
- `src/lib/notionService.ts` - Notion API client
- `src/lib/notionMapping.ts` - Auto-generation logic

### 4. **Comparison System**

Three ways to compare protocols:

**A. Protocol Card Checkboxes**
- Click checkbox on any protocol card
- Select up to 6 protocols
- Visual feedback on selection

**B. Comparison Bar (Bottom)**
- Sticky bar appears when protocols selected
- Shows protocol previews
- "Compare" button opens modal
- Available only in Discover view

**C. Compare View (Full Page)**
- Click "Compare" in sidebar
- Full comparison table
- Remove individual protocols
- Clear all functionality
- Empty state when 0 protocols selected

### 5. **Filtering & Search**

**Search**:
- Searches protocol name and strategy
- Real-time filtering
- Case-insensitive

**Strategy Filters**:
- Dynamically loaded from Notion (21+ types)
- Multi-select
- Color-coded pills

**Risk Filters**:
- Low, Medium, High
- Multi-select
- Visual indicators

### 6. **Responsive Design**

Breakpoints:
- **Mobile**: < 768px (sidebar 64px, icons only)
- **Desktop**: ≥ 768px (sidebar 240px, icons + labels)

Grid layout:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

## 🔌 API Integration

### Notion API Setup

1. **Create Integration**:
   - Go to https://www.notion.so/my-integrations
   - Click "New integration"
   - Give it a name (e.g., "Yield Protocols Dashboard")
   - Copy the **Internal Integration Token**

2. **Share Database**:
   - Open your Notion database
   - Click "Share" → "Invite"
   - Select your integration
   - Copy the **Database ID** from the URL

3. **Add to Environment**:
   ```env
   NOTION_API_KEY=ntn_your_token_here
   NOTION_DATABASE_ID=your_database_id_here
   ```

### API Endpoint

**Endpoint**: `/api/protocols`

**Response Format**:
```json
[
  {
    "id": "lido",
    "name": "Lido",
    "icon": "🌊",
    "website": "https://lido.fi",
    "yield": 4.5,
    "strategy": "Liquid Staking",
    "risk": "Low",
    "email": "contact@lido.fi",
    "founderTwitter": "https://twitter.com/founder",
    "projectTwitter": "https://twitter.com/lidofinance",
    "funders": ["Paradigm", "a16z"],
    "accentColor": "hsl(210, 80%, 60%)"
  }
]
```

**Implementation**: `api/protocols.ts`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add Environment Variables**:
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add `NOTION_API_KEY`
   - Add `NOTION_DATABASE_ID`

4. **Redeploy**:
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The project includes `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

### Environment Variables in Production

Set these in Vercel Dashboard:
- `NOTION_API_KEY` - Your Notion integration token
- `NOTION_DATABASE_ID` - Your database ID

---

## 🎨 Design System

### Colors

- **Background**: `hsl(240, 10%, 3.9%)`
- **Foreground**: `hsl(0, 0%, 98%)`
- **Muted**: `hsl(240, 3.7%, 15.9%)`
- **Border**: `hsl(240, 3.7%, 15.9%)`
- **Accent**: Dynamically generated per strategy

### Typography

- **Headings**: `Press Start 2P` (pixel font)
- **Body**: `JetBrains Mono` (monospace)

### Components

Built with **shadcn/ui** and customized for pixel-art aesthetic:
- Cards with sharp corners
- Pixelated borders
- Retro hover effects
- Skeleton loaders
- Toast notifications

---

## 🧪 Testing Locally

### Test Checklist

**Navigation**:
- [ ] Sidebar buttons switch views
- [ ] Active state highlights correctly
- [ ] Badge shows correct count (0-6)

**Protocol Selection**:
- [ ] Checkboxes toggle selection
- [ ] Max 6 protocols enforced
- [ ] Selected count updates in sidebar

**Comparison**:
- [ ] Bottom bar appears when protocols selected
- [ ] Modal opens with 2+ protocols
- [ ] Compare view shows full table
- [ ] Remove individual protocols works
- [ ] Clear all returns to discover view

**URL State**:
- [ ] URL updates when view changes
- [ ] URL updates when protocols selected
- [ ] Copy/paste URL works
- [ ] Browser back/forward works

**Filters**:
- [ ] Search filters protocols
- [ ] Strategy filters work
- [ ] Risk filters work
- [ ] Clear all resets filters

**Responsive**:
- [ ] Mobile sidebar (64px, icons only)
- [ ] Desktop sidebar (240px, icons + labels)
- [ ] Grid layout adapts to screen size

---

## 🤝 Contributing

### Development Workflow

1. **Branch**: Create feature branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Develop**: Make changes and test locally
   ```bash
   npm run dev
   ```

3. **Build**: Ensure build succeeds
   ```bash
   npm run build
   ```

4. **Commit**: Push changes
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (if configured)
- **Linting**: ESLint with React rules
- **Naming**: PascalCase for components, camelCase for functions

---

## 📝 Protocol Interface

```typescript
interface Protocol {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  icon: string;                  // Emoji icon
  website: string;               // Protocol URL
  yield: number;                 // APY percentage
  strategy: string;              // Strategy type
  risk: 'Low' | 'Medium' | 'High'; // Risk level
  email?: string;                // Contact email
  founderTwitter?: string;       // Founder Twitter URL
  projectTwitter?: string;       // Project Twitter URL
  funders: string[];            // List of funders
  accentColor: string;          // HSL color for strategy
}
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Failed to fetch protocols"**
- Check `.env.local` has correct Notion credentials
- Verify Notion integration has access to database
- Check Notion database ID is correct

**2. Build fails**
- Run `npm install` to ensure dependencies are up to date
- Check TypeScript errors: `npm run build`
- Clear cache: `rm -rf node_modules .next && npm install`

**3. Sidebar not showing**
- Check browser console for errors
- Verify `Sidebar.tsx` is imported in `Index.tsx`
- Check Tailwind classes are compiling

**4. URL params not working**
- Verify `urlState.ts` is imported correctly
- Check browser console for errors
- Test in incognito mode (extensions can interfere)

---

## 📊 Data Flow

```
User Action
    ↓
React Component (Index.tsx)
    ↓
State Update (selectedForComparison)
    ↓
URL Update (urlState.ts)
    ↓
URL Parameters (?view=compare&protocols=lido,aave)
    ↓
Shareable Link / Browser Navigation
```

```
Page Load
    ↓
Fetch from /api/protocols
    ↓
Vercel Serverless Function (api/protocols.ts)
    ↓
Notion API Client (notionService.ts)
    ↓
Transform Data (notionMapping.ts)
    ↓
Return Protocol[] to Frontend
    ↓
Render in DashboardGrid
```

---

## 📚 Additional Resources

- [Notion API Documentation](https://developers.notion.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 📄 License

This project is built with open-source technologies. Check individual dependencies for their licenses.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Retro/pixel-art gaming aesthetics
- **UI Components**: shadcn/ui and Radix UI
- **Icons**: Lucide React
- **Fonts**: Press Start 2P (Google Fonts), JetBrains Mono

---

## 📧 Contact

For questions or feedback about this project, please open an issue on GitHub.

---

**Built with ❤️ for the DeFi community**

*A curated index of on-chain yield opportunities*

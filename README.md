# Buy Sell Lease - Real Estate Portal

## Project Overview
A modern real estate portal built with React.js, TypeScript, and SASS/SCSS. This is the frontend implementation for the Buy Sell Lease platform.

## Team
- **Ashfaque** - Front End Developer (You)
- **Hejani** - Backend & Database
- **Saru** - UI Designer

## Tech Stack
- **React.js 18** - UI Library
- **TypeScript** - Type Safety
- **SASS/SCSS** - Styling
- **React Router v6** - Navigation
- **Vite** - Build Tool
- **React Icons** - Icon Library

## Project Structure
```
buy-sell-lease/
├── src/
│   ├── components/
│   │   ├── Navbar/          # Navigation with dropdowns
│   │   ├── HeroSearch/      # Main search section
│   │   └── Footer/          # Footer component
│   ├── pages/
│   │   └── Home/            # Homepage
│   ├── styles/
│   │   ├── _variables.scss  # Brand colors, fonts
│   │   └── main.scss        # Global styles
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features Implemented

### Homepage
- Responsive navigation with dropdown menus
- Main search with 4 tabs (Buy, Lease, Sold, Services)
- Services dropdown with 13 categories
- Quick links for popular locations
- Featured properties section (placeholder)
- Real estate services grid
- Tools & calculators section
- Agent CTA section
- Comprehensive footer

### Navigation Items
- BUY, SELL, LEASE
- FIND AN AGENCY/AGENT (with dropdown)
- FIND A REAL ESTATE SERVICE
- TOOLS FOR AGENTS
- ADVERTISE
- FIND A REAL ESTATE JOB
- BLOGS
- MY BSL/JOIN/LOGIN

### Search Tabs
1. **BUY** - Find residential and commercial properties
2. **LEASE** - Find rental properties
3. **SOLD** - Sales history
4. **YOUR REAL ESTATE SERVICES** - Find local services

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Navigate to project directory**
```bash
cd buy-sell-lease
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Customization

### Brand Colors
Edit `src/styles/_variables.scss`:
```scss
$primary-blue: #1e3a8a;      // Main brand color
$secondary-gold: #f59e0b;     // CTA buttons
$secondary-green: #10b981;    // Success states
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navbar/Navbar.tsx`

## Integration with Backend

### API Endpoints (Coordinate with Hejani)
```typescript
// Example API calls to integrate
const searchProperties = async (filters: SearchFilters) => {
  // TODO: Connect to Hejani's backend
}

const getFeaturedProperties = async () => {
  // TODO: Fetch from database
}
```

## Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Next Steps for Tuesday's Meeting

### For Ashfaque (You)
- [ ] Test all navigation links
- [ ] Verify responsive design on mobile
- [ ] Prepare questions for Hejani about API endpoints
- [ ] Review with Saru for UI/UX feedback

### For Hejani
- [ ] Set up hosting environment
- [ ] Agentbox integration planning
- [ ] API endpoint documentation

### For Saru
- [ ] Review color scheme implementation
- [ ] Verify logo placement
- [ ] Check mobile responsiveness

## Reference Sites
Study these for patterns:
- Realestate.com.au
- Domain.com.au
- Zillow.com
- Trulia.com

## Support
For questions before Tuesday's meeting, contact the team lead.

---
**Meeting**: Every Tuesday at 4:00 PM
**Status**: Homepage v1.0 Ready for Review

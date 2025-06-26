
# Stock Beacon Display 📈

A modern, real-time stock trading dashboard built with React, TypeScript, and Tailwind CSS. Features a sleek dark theme with comprehensive market data visualization, portfolio management, and machine learning-powered insights.

## ✨ Features

### 🏢 Dashboard
- **Real-time Market Overview**: Live tracking of major market indices (S&P 500, NASDAQ, Dow Jones, Russell 2000)
- **Interactive Charts**: Dynamic price charts with real-time data visualization using Recharts
- **Top Movers**: Real-time tracking of top gaining and losing stocks
- **Watchlist Management**: Personal stock watchlist with quick access and monitoring

### 📊 Stock Analysis
- **Detailed Stock Information**: Comprehensive stock data including price, volume, market cap, P/E ratio
- **Historical Data**: 52-week high/low tracking and historical price movements
- **Interactive Charts**: Responsive charts with hover effects and real-time updates

### 👤 User Dashboard
- **Portfolio Overview**: Track your investment portfolio with performance metrics
- **Account Management**: User profile and account settings
- **Transaction History**: Complete history of all trading activities
- **Performance Analytics**: Detailed portfolio performance tracking

### 🔔 Notifications
- **Real-time Alerts**: Price alerts and market movement notifications
- **Custom Alerts**: Set personalized alerts for specific stocks or market conditions
- **News Updates**: Latest market news and stock-related updates

### 🤖 Machine Learning
- **Predictive Analytics**: AI-powered stock price predictions
- **Market Sentiment Analysis**: ML-driven market sentiment insights
- **Risk Assessment**: Automated risk analysis for portfolio optimization
- **Trend Analysis**: Advanced pattern recognition for market trends

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Shadcn/ui component library
- **Charts**: Recharts for data visualization
- **State Management**: TanStack Query for server state management
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Form Handling**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-beacon-display
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## 📱 Features Overview

### Dashboard Navigation
- **Dashboard**: Main overview with market data and charts
- **Stock Detail**: Detailed individual stock analysis
- **Watchlist**: Personal stock tracking
- **Notifications**: Real-time alerts and news
- **User Dashboard**: Portfolio and account management
- **Machine Learning**: AI-powered insights and predictions

### Responsive Design
- Fully responsive layout optimized for desktop, tablet, and mobile
- Dark theme with excellent contrast and readability
- Smooth animations and transitions

### Real-time Data
- Live stock prices and market data
- Real-time chart updates
- Dynamic color coding for gains/losses

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme with slate-900 background
- **Modern UI**: Clean, minimalist design with subtle glassmorphism effects
- **Responsive Grid**: Adaptive layouts that work on all screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Color Coding**: Intuitive green/red color system for gains and losses

## 📊 Data Structure

The application uses TypeScript interfaces for type safety:

```typescript
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  pe: number;
  dividend: number;
  chartData: ChartDataPoint[];
}
```

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── components/ui/      # Reusable UI components
```

### Key Components

- **Dashboard**: Main dashboard with market overview
- **MainChart**: Interactive stock price charts
- **StockDetail**: Detailed stock information view
- **UserDashboard**: Portfolio and account management
- **MachineLearning**: AI-powered analytics
- **MarketOverview**: Market indices display
- **TopMovers**: Real-time gainers/losers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy Trading! 📈**

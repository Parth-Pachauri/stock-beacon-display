
import { Stock, MarketIndex, ChartDataPoint } from '@/types/stock';

// Generate realistic chart data
const generateChartData = (basePrice: number, days: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic price movement
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, basePrice * 0.7);
    
    data.push({
      time: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000
    });
  }
  
  return data;
};

// Mock stock data
const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 52840000,
    marketCap: 2750000000000,
    high52Week: 198.23,
    low52Week: 124.17,
    pe: 28.5,
    dividend: 0.96,
    chartData: generateChartData(175.43)
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 138.21,
    change: -1.82,
    changePercent: -1.30,
    volume: 23450000,
    marketCap: 1750000000000,
    high52Week: 151.55,
    low52Week: 83.34,
    pe: 25.8,
    dividend: 0.0,
    chartData: generateChartData(138.21)
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: 5.67,
    changePercent: 1.52,
    volume: 18900000,
    marketCap: 2820000000000,
    high52Week: 384.30,
    low52Week: 213.43,
    pe: 32.1,
    dividend: 3.00,
    chartData: generateChartData(378.85)
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.50,
    change: -8.23,
    changePercent: -3.20,
    volume: 89500000,
    marketCap: 790000000000,
    high52Week: 299.29,
    low52Week: 138.80,
    pe: 65.4,
    dividend: 0.0,
    chartData: generateChartData(248.50)
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 153.32,
    change: 3.45,
    changePercent: 2.30,
    volume: 31200000,
    marketCap: 1590000000000,
    high52Week: 170.15,
    low52Week: 83.12,
    pe: 45.2,
    dividend: 0.0,
    chartData: generateChartData(153.32)
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    change: 12.45,
    changePercent: 1.44,
    volume: 45600000,
    marketCap: 2160000000000,
    high52Week: 974.86,
    low52Week: 180.96,
    pe: 71.3,
    dividend: 0.16,
    chartData: generateChartData(875.28)
  }
];

const marketIndices: MarketIndex[] = [
  {
    name: 'S&P 500',
    value: 4783.35,
    change: 15.42,
    changePercent: 0.32
  },
  {
    name: 'Dow Jones',
    value: 37689.54,
    change: -89.16,
    changePercent: -0.24
  },
  {
    name: 'NASDAQ',
    value: 14942.65,
    change: 98.27,
    changePercent: 0.66
  }
];

export const stockService = {
  getAllStocks: (): Promise<Stock[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStocks), 300);
    });
  },

  getStock: (symbol: string): Promise<Stock | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stock = mockStocks.find(s => s.symbol === symbol);
        resolve(stock || null);
      }, 200);
    });
  },

  searchStocks: (query: string): Promise<Stock[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockStocks.filter(stock => 
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 150);
    });
  },

  getMarketIndices: (): Promise<MarketIndex[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(marketIndices), 100);
    });
  },

  getTrendingStocks: (): Promise<Stock[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trending = [...mockStocks]
          .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
          .slice(0, 4);
        resolve(trending);
      }, 200);
    });
  }
};

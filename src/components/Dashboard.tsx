
import { useQuery } from '@tanstack/react-query';
import { stockService } from '@/services/stockService';
import { Stock } from '@/types/stock';
import StockCard from './StockCard';
import MarketOverview from './MarketOverview';
import MainChart from './MainChart';
import TopMovers from './TopMovers';
import { TrendingUp } from 'lucide-react';

interface DashboardProps {
  onStockSelect: (stock: Stock) => void;
}

const Dashboard = ({ onStockSelect }: DashboardProps) => {
  const { data: trendingStocks, isLoading: trendingLoading } = useQuery({
    queryKey: ['trendingStocks'],
    queryFn: stockService.getTrendingStocks,
  });

  const { data: allStocks, isLoading: allStocksLoading } = useQuery({
    queryKey: ['allStocks'],
    queryFn: stockService.getAllStocks,
  });

  if (trendingLoading || allStocksLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-800/50 rounded-lg animate-pulse" />
          <div className="h-96 bg-slate-800/50 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Market Overview - 4 indices in a row */}
      <MarketOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section - Takes 2/3 of the width */}
        <div className="lg:col-span-2">
          <MainChart />
        </div>

        {/* Right Side Panel - Top Gainers/Losers */}
        <div className="space-y-6">
          <TopMovers onStockSelect={onStockSelect} />
        </div>
      </div>

      {/* Watchlist Section */}
      <section>
        <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-600/50">
          <h2 className="text-xl font-bold text-white mb-4">Watchlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingStocks?.slice(0, 4).map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => onStockSelect(stock)}
                className="bg-slate-700/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{stock.symbol}</span>
                  <span className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="text-slate-400 text-sm mt-1">${stock.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

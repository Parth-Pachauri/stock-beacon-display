
import { useQuery } from '@tanstack/react-query';
import { stockService } from '@/services/stockService';
import { Stock } from '@/types/stock';
import StockCard from './StockCard';
import MarketOverview from './MarketOverview';
import { TrendingUp, Activity, Star } from 'lucide-react';

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
      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Market Overview */}
      <MarketOverview />

      {/* Trending Stocks */}
      <section>
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Trending Stocks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingStocks?.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              onClick={() => onStockSelect(stock)}
            />
          ))}
        </div>
      </section>

      {/* All Stocks */}
      <section>
        <div className="flex items-center mb-6">
          <Activity className="h-6 w-6 text-purple-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">All Stocks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allStocks?.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              onClick={() => onStockSelect(stock)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

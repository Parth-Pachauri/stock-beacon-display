
import { useQuery } from '@tanstack/react-query';
import { stockService } from '@/services/stockService';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview = () => {
  const { data: indices, isLoading } = useQuery({
    queryKey: ['marketIndices'],
    queryFn: stockService.getMarketIndices,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {indices?.map((index) => (
        <div
          key={index.name}
          className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-lg p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">{index.name}</h3>
            {index.change >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-400" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-400" />
            )}
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">
              {index.value.toLocaleString()}
            </div>
            <div className={`flex items-center space-x-2 ${
              index.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <span className="font-medium">
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
              </span>
              <span className="text-sm">
                ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketOverview;

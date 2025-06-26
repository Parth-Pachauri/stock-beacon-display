
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // Add Russell 2000 to match the reference image
  const allIndices = [
    ...(indices || []),
    {
      name: 'RUSSELL 2000',
      value: 2134.67,
      change: 12.34,
      changePercent: 0.58
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {allIndices.map((index) => (
        <div
          key={index.name}
          className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wide">
              {index.name}
            </h3>
            {index.change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white">
              {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center space-x-2 text-sm ${
              index.change >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <span className="font-medium">
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
              </span>
              <span>
                {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketOverview;

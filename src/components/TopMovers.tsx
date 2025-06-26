
import { useQuery } from '@tanstack/react-query';
import { stockService } from '@/services/stockService';
import { Stock } from '@/types/stock';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TopMoversProps {
  onStockSelect: (stock: Stock) => void;
}

const TopMovers = ({ onStockSelect }: TopMoversProps) => {
  const { data: allStocks } = useQuery({
    queryKey: ['allStocks'],
    queryFn: stockService.getAllStocks,
  });

  if (!allStocks) return null;

  // Additional mock stocks for top gainers/losers
  const additionalStocks = [
    { symbol: 'RBLX', name: 'Roblox Corporation', price: 45.67, change: 15.23, changePercent: 15.23 },
    { symbol: 'SNAP', name: 'Snap Inc.', price: 12.34, change: 12.45, changePercent: 12.45 },
    { symbol: 'UBER', name: 'Uber Technologies', price: 67.89, change: 8.90, changePercent: 8.90 },
    { symbol: 'LYFT', name: 'Lyft Inc.', price: 23.45, change: 7.65, changePercent: 7.65 },
    { symbol: 'COIN', name: 'Coinbase Global', price: 78.90, change: -12.34, changePercent: -12.34 },
  ];

  const topGainers = [...allStocks, ...additionalStocks]
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 4);

  const topLosers = [...allStocks, ...additionalStocks]
    .filter(stock => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 4);

  const StockItem = ({ stock, onClick }: { stock: any, onClick: () => void }) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer transition-colors"
    >
      <div>
        <div className="font-bold text-white text-sm">{stock.symbol}</div>
        <div className="text-slate-400 text-xs">${stock.price.toFixed(2)}</div>
      </div>
      <div className={`text-right text-sm font-medium ${
        stock.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
      }`}>
        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Gainers */}
      <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600/50">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
          <h3 className="text-lg font-bold text-white">Top Gainers</h3>
        </div>
        <div className="space-y-2">
          {topGainers.map((stock) => (
            <StockItem
              key={stock.symbol}
              stock={stock}
              onClick={() => onStockSelect(stock as Stock)}
            />
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600/50">
        <div className="flex items-center mb-4">
          <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-lg font-bold text-white">Top Losers</h3>
        </div>
        <div className="space-y-2">
          {topLosers.map((stock) => (
            <StockItem
              key={stock.symbol}
              stock={stock}
              onClick={() => onStockSelect(stock as Stock)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;

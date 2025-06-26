
import { Stock } from '@/types/stock';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
  showWatchlistButton?: boolean;
  onAddToWatchlist?: (stock: Stock) => void;
  onRemoveFromWatchlist?: (symbol: string) => void;
  isInWatchlist?: boolean;
}

const StockCard = ({ 
  stock, 
  onClick, 
  showWatchlistButton = false,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isInWatchlist = false
}: StockCardProps) => {
  const isPositive = stock.change >= 0;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist && onRemoveFromWatchlist) {
      onRemoveFromWatchlist(stock.symbol);
    } else if (onAddToWatchlist) {
      onAddToWatchlist(stock);
    }
  };

  return (
    <Card 
      className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
            <p className="text-sm text-slate-400 truncate">{stock.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            {showWatchlistButton && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleWatchlistClick}
                className="p-1 h-auto"
              >
                <Star 
                  className={`h-4 w-4 ${
                    isInWatchlist ? 'text-yellow-400 fill-current' : 'text-slate-400'
                  }`} 
                />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              ${stock.price.toFixed(2)}
            </span>
            <div className={`text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <div className="font-medium">
                {isPositive ? '+' : ''}{stock.change.toFixed(2)}
              </div>
              <div className="text-sm">
                ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Volume</span>
              <div className="text-white font-medium">
                {(stock.volume / 1000000).toFixed(1)}M
              </div>
            </div>
            <div>
              <span className="text-slate-400">Market Cap</span>
              <div className="text-white font-medium">
                ${(stock.marketCap / 1000000000).toFixed(1)}B
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockCard;


import { useState, useEffect } from 'react';
import { Stock } from '@/types/stock';
import StockCard from './StockCard';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WatchlistProps {
  onStockSelect: (stock: Stock) => void;
}

const Watchlist = ({ onStockSelect }: WatchlistProps) => {
  const [watchlistStocks, setWatchlistStocks] = useState<Stock[]>([]);

  useEffect(() => {
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('stockWatchlist');
    if (savedWatchlist) {
      setWatchlistStocks(JSON.parse(savedWatchlist));
    }
  }, []);

  const removeFromWatchlist = (symbol: string) => {
    const updatedWatchlist = watchlistStocks.filter(stock => stock.symbol !== symbol);
    setWatchlistStocks(updatedWatchlist);
    localStorage.setItem('stockWatchlist', JSON.stringify(updatedWatchlist));
  };

  if (watchlistStocks.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <Star className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your Watchlist is Empty</h2>
        <p className="text-slate-400 mb-6">
          Start building your watchlist by adding stocks you want to track
        </p>
        <Button 
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Browse Stocks
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center">
        <Star className="h-6 w-6 text-yellow-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">My Watchlist</h2>
        <span className="ml-2 text-slate-400">({watchlistStocks.length} stocks)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlistStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            onClick={() => onStockSelect(stock)}
            showWatchlistButton={true}
            onRemoveFromWatchlist={removeFromWatchlist}
            isInWatchlist={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;


import { useState } from 'react';
import { Search, TrendingUp, Star, Bell, User, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { stockService } from '@/services/stockService';
import { Stock } from '@/types/stock';
import { useQuery } from '@tanstack/react-query';

interface HeaderProps {
  currentView: 'dashboard' | 'stock' | 'watchlist' | 'notifications' | 'user' | 'ml';
  setCurrentView: (view: 'dashboard' | 'stock' | 'watchlist' | 'notifications' | 'user' | 'ml') => void;
  onStockSelect: (stock: Stock) => void;
}

const Header = ({ currentView, setCurrentView, onStockSelect }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { data: searchResults } = useQuery({
    queryKey: ['searchStocks', searchQuery],
    queryFn: () => stockService.searchStocks(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const handleStockClick = (stock: Stock) => {
    onStockSelect(stock);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <header className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('dashboard')}
          >
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">
              StockTrader Pro
            </h1>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search stocks, ETFs, indices..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-slate-500 focus:bg-slate-700/70"
              />
            </div>

            {/* Search Results */}
            {showSearchResults && searchResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-slate-800 border border-slate-600/50 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {searchResults.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleStockClick(stock)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                        <div className="text-xs text-slate-400 truncate">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">${stock.price.toFixed(2)}</div>
                        <div className={`text-xs ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant={currentView === 'ml' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('ml')}
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Brain className="h-5 w-5" />
            </Button>

            <Button
              variant={currentView === 'notifications' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('notifications')}
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button
              variant={currentView === 'watchlist' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('watchlist')}
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Star className="h-5 w-5" />
            </Button>

            <Button
              variant={currentView === 'user' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('user')}
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

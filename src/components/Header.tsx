
import { useState } from 'react';
import { Search, TrendingUp, Star, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { stockService } from '@/services/stockService';
import { Stock } from '@/types/stock';
import { useQuery } from '@tanstack/react-query';

interface HeaderProps {
  currentView: 'dashboard' | 'stock' | 'watchlist';
  setCurrentView: (view: 'dashboard' | 'stock' | 'watchlist') => void;
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
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StockTracker
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('dashboard')}
              className="text-white hover:text-blue-400"
            >
              Dashboard
            </Button>
            <Button
              variant={currentView === 'watchlist' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('watchlist')}
              className="text-white hover:text-blue-400"
            >
              <Star className="h-4 w-4 mr-2" />
              Watchlist
            </Button>
          </nav>

          {/* Search */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 w-64"
              />
            </div>

            {/* Search Results */}
            {showSearchResults && searchResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-600 rounded-md shadow-lg z-50">
                {searchResults.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleStockClick(stock)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors border-b border-slate-600 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{stock.symbol}</div>
                        <div className="text-sm text-slate-400">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">${stock.price.toFixed(2)}</div>
                        <div className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

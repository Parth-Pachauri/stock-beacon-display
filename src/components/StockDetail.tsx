
import { Stock } from '@/types/stock';
import { ArrowLeft, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StockChart from './StockChart';

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
}

const StockDetail = ({ stock, onBack }: StockDetailProps) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{stock.symbol}</h1>
              <p className="text-slate-400">{stock.name}</p>
            </div>
            <Button size="sm" variant="outline" className="text-white border-slate-600">
              <Star className="h-4 w-4 mr-2" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>

      {/* Price Info */}
      <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-4xl font-bold text-white">
              ${stock.price.toFixed(2)}
            </div>
            <div className={`flex items-center space-x-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              <span className="text-lg font-medium">
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <div className="text-sm text-slate-400">Today's Volume</div>
            <div className="text-white font-semibold">
              {(stock.volume / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Price Chart (30 Days)</h3>
        <StockChart data={stock.chartData} />
      </Card>

      {/* Stock Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Key Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Market Cap</span>
              <span className="text-white font-medium">
                ${(stock.marketCap / 1000000000).toFixed(1)}B
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">P/E Ratio</span>
              <span className="text-white font-medium">{stock.pe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dividend Yield</span>
              <span className="text-white font-medium">
                {stock.dividend > 0 ? `${((stock.dividend / stock.price) * 100).toFixed(2)}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Volume</span>
              <span className="text-white font-medium">
                {stock.volume.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">52 Week Range</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">52W High</span>
              <span className="text-green-400 font-medium">
                ${stock.high52Week.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">52W Low</span>
              <span className="text-red-400 font-medium">
                ${stock.low52Week.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current vs High</span>
              <span className="text-white font-medium">
                {(((stock.price - stock.high52Week) / stock.high52Week) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current vs Low</span>
              <span className="text-white font-medium">
                {(((stock.price - stock.low52Week) / stock.low52Week) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StockDetail;

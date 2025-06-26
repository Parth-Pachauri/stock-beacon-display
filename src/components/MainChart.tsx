
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { stockService } from '@/services/stockService';
import { Stock } from '@/types/stock';

interface MainChartProps {
  selectedStock?: Stock | null;
}

const MainChart = ({ selectedStock }: MainChartProps) => {
  const { data: stockData } = useQuery({
    queryKey: ['stockChart', selectedStock?.symbol || 'SPY'],
    queryFn: () => stockService.getStock(selectedStock?.symbol || 'SPY'),
  });

  const currentStock = selectedStock || stockData;
  const displayName = currentStock?.name || 'S&P 500';
  const displaySymbol = currentStock?.symbol || 'SPY';

  // Use chart data from the stock if available, otherwise generate intraday data
  const chartData = currentStock?.chartData?.map((point, index) => ({
    time: new Date(point.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: point.price
  })) || [];

  // Fallback to generated intraday data if no chart data available
  const generateIntradayData = () => {
    const data = [];
    const baseValue = currentStock?.price || 4567.89;
    const startTime = new Date();
    startTime.setHours(9, 30, 0, 0);
    
    for (let i = 0; i < 390; i += 30) {
      const time = new Date(startTime.getTime() + i * 60000);
      const variance = (Math.random() - 0.5) * (baseValue * 0.02);
      data.push({
        time: time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: false 
        }),
        value: baseValue + variance + (i * 0.001)
      });
    }
    return data;
  };

  const finalChartData = chartData.length > 0 ? chartData : generateIntradayData();
  const changePercent = currentStock?.changePercent || 0.52;

  return (
    <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-600/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{displayName} ({displaySymbol})</h2>
          <p className="text-slate-400 text-sm">Real-time Price Chart</p>
        </div>
        <div className={`font-medium ${changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}% Today
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={finalChartData}>
            <CartesianGrid strokeDasharray="1 1" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 20', 'dataMax + 20']}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={changePercent >= 0 ? "#10b981" : "#ef4444"} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, stroke: changePercent >= 0 ? '#10b981' : '#ef4444', strokeWidth: 1, fill: changePercent >= 0 ? '#065f46' : '#7f1d1d' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;

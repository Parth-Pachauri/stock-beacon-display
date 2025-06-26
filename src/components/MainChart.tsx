
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { stockService } from '@/services/stockService';

const MainChart = () => {
  const { data: spyData } = useQuery({
    queryKey: ['spyChart'],
    queryFn: () => stockService.getStock('SPY'),
  });

  // Generate intraday data for S&P 500
  const generateIntradayData = () => {
    const data = [];
    const baseValue = 4567.89;
    const startTime = new Date();
    startTime.setHours(9, 30, 0, 0); // Market open
    
    for (let i = 0; i < 390; i += 30) { // Every 30 minutes
      const time = new Date(startTime.getTime() + i * 60000);
      const variance = (Math.random() - 0.5) * 50;
      data.push({
        time: time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: false 
        }),
        value: baseValue + variance + (i * 0.1)
      });
    }
    return data;
  };

  const chartData = generateIntradayData();

  return (
    <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-600/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">S&P 500 Intraday Chart</h2>
        </div>
        <div className="text-emerald-400 font-medium">
          +0.52% Today
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, stroke: '#10b981', strokeWidth: 1, fill: '#065f46' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;

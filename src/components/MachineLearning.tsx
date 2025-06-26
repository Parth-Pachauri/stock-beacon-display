
import { useState } from 'react';
import { Brain, TrendingUp, BarChart3, Zap, Bot, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MachineLearning = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  const algorithms = [
    {
      id: 'lstm',
      name: 'LSTM Neural Networks',
      description: 'Long Short-Term Memory networks for time series prediction',
      accuracy: '87%',
      useCase: 'Stock Price Prediction',
      status: 'Active',
      icon: Brain,
      color: 'bg-blue-500'
    },
    {
      id: 'random-forest',
      name: 'Random Forest',
      description: 'Ensemble learning method for classification and regression',
      accuracy: '82%',
      useCase: 'Market Trend Analysis',
      status: 'Active',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 'svm',
      name: 'Support Vector Machine',
      description: 'Powerful classification algorithm for pattern recognition',
      accuracy: '79%',
      useCase: 'Risk Assessment',
      status: 'Training',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      id: 'gradient-boost',
      name: 'Gradient Boosting',
      description: 'Sequential ensemble method for high-accuracy predictions',
      accuracy: '85%',
      useCase: 'Portfolio Optimization',
      status: 'Active',
      icon: BarChart3,
      color: 'bg-orange-500'
    },
    {
      id: 'reinforcement',
      name: 'Reinforcement Learning',
      description: 'Agent-based learning for optimal trading strategies',
      accuracy: '91%',
      useCase: 'Algorithmic Trading',
      status: 'Beta',
      icon: Bot,
      color: 'bg-red-500'
    },
    {
      id: 'automl',
      name: 'AutoML Pipeline',
      description: 'Automated machine learning for model selection',
      accuracy: '88%',
      useCase: 'Feature Engineering',
      status: 'Active',
      icon: Zap,
      color: 'bg-yellow-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Training': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Beta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Machine Learning Algorithms</h2>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Zap className="h-4 w-4 mr-2" />
          Run Analysis
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 backdrop-blur-sm border-blue-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">Active Models</p>
              <p className="text-2xl font-bold text-white">4</p>
            </div>
            <Brain className="h-8 w-8 text-blue-400" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border-green-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">Avg Accuracy</p>
              <p className="text-2xl font-bold text-white">85.2%</p>
            </div>
            <Target className="h-8 w-8 text-green-400" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm border-purple-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">Predictions Today</p>
              <p className="text-2xl font-bold text-white">1,247</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 backdrop-blur-sm border-orange-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-white">92.3%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-400" />
          </div>
        </Card>
      </div>

      {/* Algorithms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => {
          const IconComponent = algorithm.icon;
          return (
            <Card 
              key={algorithm.id}
              className={`bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-slate-500/70 ${
                selectedAlgorithm === algorithm.id ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onClick={() => setSelectedAlgorithm(algorithm.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${algorithm.color}/20`}>
                  <IconComponent className={`h-6 w-6 text-white`} />
                </div>
                <Badge className={getStatusColor(algorithm.status)}>
                  {algorithm.status}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{algorithm.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{algorithm.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Accuracy</span>
                  <span className="text-white font-semibold">{algorithm.accuracy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Use Case</span>
                  <span className="text-blue-400 text-sm">{algorithm.useCase}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white"
                size="sm"
              >
                View Details
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Performance Chart Section */}
      <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Model Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Recent Predictions</h4>
            <div className="space-y-3">
              {['AAPL: +2.3% (Actual: +2.1%)', 'GOOGL: -1.5% (Actual: -1.2%)', 'TSLA: +5.2% (Actual: +4.8%)'].map((prediction, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">{prediction.split('(')[0]}</span>
                  <span className="text-green-400 text-sm">{prediction.match(/\(([^)]+)\)/)?.[1]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Training Status</h4>
            <div className="space-y-3">
              {algorithms.filter(a => a.status === 'Training' || a.status === 'Active').slice(0, 3).map((algorithm) => (
                <div key={algorithm.id} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">{algorithm.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">{algorithm.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MachineLearning;

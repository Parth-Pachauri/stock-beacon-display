
import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import StockDetail from '@/components/StockDetail';
import Watchlist from '@/components/Watchlist';
import Notifications from '@/components/Notifications';
import UserDashboard from '@/components/UserDashboard';
import { Stock } from '@/types/stock';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'stock' | 'watchlist' | 'notifications' | 'user'>('dashboard');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setCurrentView('stock');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedStock(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onStockSelect={handleStockSelect}
      />
      
      <main className="container mx-auto px-6 py-6">
        {currentView === 'dashboard' && (
          <Dashboard onStockSelect={handleStockSelect} />
        )}
        
        {currentView === 'stock' && selectedStock && (
          <StockDetail 
            stock={selectedStock} 
            onBack={handleBackToDashboard}
          />
        )}
        
        {currentView === 'watchlist' && (
          <Watchlist onStockSelect={handleStockSelect} />
        )}

        {currentView === 'notifications' && (
          <Notifications />
        )}

        {currentView === 'user' && (
          <UserDashboard />
        )}
      </main>
    </div>
  );
};

export default Index;

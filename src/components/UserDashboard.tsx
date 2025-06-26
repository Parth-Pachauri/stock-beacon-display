
import { useState } from 'react';
import { User, Settings, TrendingUp, Star, Bell, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    avatar: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email
    }));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const portfolioStats = {
    totalValue: 125430.50,
    dayChange: 2340.20,
    dayChangePercent: 1.87,
    totalGain: 15430.50,
    totalGainPercent: 12.3
  };

  const recentActivity = [
    { action: 'Added to watchlist', stock: 'AAPL', time: '2 hours ago' },
    { action: 'Price alert triggered', stock: 'TSLA', time: '5 hours ago' },
    { action: 'Viewed stock', stock: 'GOOGL', time: '1 day ago' },
    { action: 'Updated watchlist', stock: 'MSFT', time: '2 days ago' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <User className="h-6 w-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">User Dashboard</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="text-white border-slate-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Profile</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(!isEditing)}
              className="text-slate-400 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-10 w-10 text-slate-300" />
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Name"
                />
                <Input
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Email"
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleSaveProfile}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-white">{user.name}</h4>
                <p className="text-slate-400 text-sm">{user.email}</p>
                <p className="text-slate-500 text-xs mt-2">Member since {user.joinDate}</p>
              </>
            )}
          </div>
        </Card>

        {/* Portfolio Summary */}
        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-slate-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-white">${portfolioStats.totalValue.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-slate-400 text-sm">Today</p>
                <p className={`font-semibold ${portfolioStats.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {portfolioStats.dayChange >= 0 ? '+' : ''}${portfolioStats.dayChange.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Total Gain</p>
                <p className={`font-semibold ${portfolioStats.totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {portfolioStats.totalGain >= 0 ? '+' : ''}${portfolioStats.totalGain.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-slate-300">Watchlist Items</span>
              </div>
              <span className="text-white font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-slate-300">Active Alerts</span>
              </div>
              <span className="text-white font-semibold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-slate-300">Stocks Tracked</span>
              </div>
              <span className="text-white font-semibold">24</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">{activity.action}</span>
                <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                  {activity.stock}
                </span>
              </div>
              <span className="text-slate-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Settings Section */}
      <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-6">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-slate-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start text-white border-slate-600">
            <Bell className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
          <Button variant="outline" className="justify-start text-white border-slate-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Alert Preferences
          </Button>
          <Button variant="outline" className="justify-start text-white border-slate-600">
            <User className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
          <Button variant="outline" className="justify-start text-white border-slate-600">
            <Settings className="h-4 w-4 mr-2" />
            Privacy Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;

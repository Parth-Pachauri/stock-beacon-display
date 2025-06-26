
import { useState } from 'react';
import { Bell, Check, X, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Notification {
  id: string;
  type: 'price_alert' | 'news' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  stock?: string;
  priority: 'low' | 'medium' | 'high';
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'price_alert',
      title: 'AAPL Price Alert',
      message: 'Apple Inc. has reached your target price of $175.00',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      stock: 'AAPL',
      priority: 'high'
    },
    {
      id: '2',
      type: 'news',
      title: 'Market Update',
      message: 'S&P 500 closes up 0.5% amid tech sector gains',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'price_alert',
      title: 'TSLA Price Drop',
      message: 'Tesla Inc. dropped 5% in after-hours trading',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      stock: 'TSLA',
      priority: 'high'
    },
    {
      id: '4',
      type: 'system',
      title: 'Watchlist Updated',
      message: 'Your watchlist has been updated with new stocks',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      priority: 'low'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: string, priority: string) => {
    switch (type) {
      case 'price_alert':
        return priority === 'high' ? 
          <TrendingDown className="h-5 w-5 text-red-400" /> : 
          <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'news':
        return <Bell className="h-5 w-5 text-blue-400" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Bell className="h-5 w-5 text-slate-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            className="text-white border-slate-600"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card className="bg-slate-800/60 p-8 text-center">
            <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No notifications</h3>
            <p className="text-slate-400">You're all caught up!</p>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border-slate-600/50 p-4 transition-all hover:border-slate-500/50 ${
                !notification.read ? 'border-l-4 border-l-blue-400' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getIcon(notification.type, notification.priority)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                        {notification.title}
                      </h3>
                      {notification.stock && (
                        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                          {notification.stock}
                        </span>
                      )}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{notification.message}</p>
                    <p className="text-slate-500 text-xs">{formatTime(notification.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNotification(notification.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;

import React, { useContext, useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  ChevronDown, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  Menu,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import Profile from '../../assets/profile.png';
import StoreContext from '../../context/storeContext';
import axios from 'axios';

const Header = () => {
  const { store } = useContext(StoreContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications', {
          headers: {
            Authorization: `Bearer ${store.token}` // या जो भी auth method आप use करते हैं
          }
        });
        setNotifications(response.data.notifications || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Fallback to empty array on error
        setNotifications([]);
        setLoading(false);
      }
    };

    if (store.token) {
      fetchNotifications();
    }
  }, [store.token]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/mark-read/${notificationId}`, {}, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      });
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, unread: false }
            : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axios.put('/api/notifications/mark-all-read', {}, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      });
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, unread: false }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="pl-4 fixed w-[calc(100vw-250px)] top-4 z-50">
      <div className="w-full rounded-2xl h-[70px] flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
        
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md w-full">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${searchFocused ? 'text-blue-500' : 'text-gray-400'}`}>
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search articles, users, or anything..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50/50 border-2 transition-all duration-300 outline-none ${
                searchFocused 
                  ? 'border-blue-500 bg-white shadow-lg ring-4 ring-blue-500/10' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {/* Search suggestions overlay */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                <div className="px-4 py-2 text-sm text-gray-500">Recent searches</div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">Technology news</div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">Pending articles</div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">User management</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Messages */}
            <button className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group relative">
              <MessageSquare className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group relative"
                title="Notifications"
              >
                <Bell className={`w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-200 ${showNotifications ? 'animate-pulse' : ''}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 cursor-pointer hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {loading ? (
                      <div className="px-4 py-8 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                            notification.unread ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
                          }`}
                          onClick={() => notification.unread && markAsRead(notification.id)}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No notifications yet</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* User Profile Section */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="flex flex-col items-end">
                <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {store.userInfo?.name || 'Admin User'}
                </span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {store.userInfo?.role || 'Administrator'}
                </span>
              </div>
              
              <div className="relative">
                <img
                  src={store.userInfo?.avatar || Profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover group-hover:ring-4 group-hover:ring-blue-500/20 transition-all duration-200"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{store.userInfo?.name || 'Admin User'}</p>
                  <p className="text-sm text-gray-500">{store.userInfo?.email || 'admin@example.com'}</p>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile Settings</span>
                  </button>
                  
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Account Settings</span>
                  </button>
                  
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Help & Support</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors duration-200">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
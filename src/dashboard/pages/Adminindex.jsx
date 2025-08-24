import React, { useContext, useEffect, useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Image,
  Tag,
  ArrowUpRight,
  Activity,
  BarChart3,
  Zap,
  RefreshCw,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';

const AdminIndex = () => {
  const { store } = useContext(storeContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Statistics state
  const [stats, setStats] = useState({
    totalNews: 0,
    pendingNews: 0,
    activeNews: 0,
    deactiveNews: 0,
    totalWriters: 0
  });

  // Fetch news data
  const getNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      });
      setNews(data.news);
    } catch (error) {
      console.log('Error fetching news:', error);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news-statistics`);
      setStats(data);
    } catch (error) {
      console.log('Error fetching stats:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getNews(), fetchStats()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Refresh data function
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([getNews(), fetchStats()]);
    setLoading(false);
  };

  // Statistics cards configuration
  const statCards = [
    {
      title: 'Total News',
      value: stats.totalNews,
      icon: FileText,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Pending News',
      value: stats.pendingNews,
      icon: Clock,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      change: '+5%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Active News',
      value: stats.activeNews,
      icon: CheckCircle,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-500',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Deactive News',
      value: stats.deactiveNews,
      icon: XCircle,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      change: '-3%',
      changeColor: 'text-red-600'
    },
    {
      title: 'Writers',
      value: stats.totalWriters,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      change: '+15%',
      changeColor: 'text-green-600'
    }
  ];

  // Status badge component
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { 
        bg: 'bg-gradient-to-r from-blue-100 to-blue-200', 
        text: 'text-blue-800', 
        icon: Clock,
        border: 'border-blue-300'
      },
      active: { 
        bg: 'bg-gradient-to-r from-green-100 to-green-200', 
        text: 'text-green-800', 
        icon: CheckCircle,
        border: 'border-green-300'
      },
      deactive: { 
        bg: 'bg-gradient-to-r from-red-100 to-red-200', 
        text: 'text-red-800', 
        icon: XCircle,
        border: 'border-red-300'
      }
    };
    
    const config = statusConfig[status];
    const StatusIcon = config.icon;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>
        <StatusIcon className="w-3 h-3" />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  // Filter news based on search and status
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle actions
  const handleView = (newsItem) => {
    console.log('Viewing news:', newsItem);
    // Add your view logic here - navigate to news detail page
  };

  const handleEdit = (newsItem) => {
    console.log('Editing news:', newsItem);
    // Add your edit logic here - navigate to edit page
  };

  const handleDelete = (newsItem) => {
    console.log('Deleting news:', newsItem);
    // Add your delete logic here - show confirmation dialog and delete
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-xl font-semibold text-gray-700">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-gray-500 flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Real-time analytics and insights</span>
              </p>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden cursor-pointer"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm font-semibold ${card.changeColor}`}>
                    {card.change}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.value}
                </h3>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-500 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Recent News Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header with Search and Filter */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Recent News</h2>
                <p className="text-blue-100 mt-1">Manage your latest content</p>
              </div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
              </div>
              
              {/* Filter */}
              <div className="relative">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-800"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="deactive">Deactive</option>
                </select>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-all duration-200">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-semibold">Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-semibold">Add News</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sr.</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">News Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNews.slice(0, 8).map((item, index) => (
                <tr key={item._id} className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 max-w-xs">
                        {item.title.length > 50 ? `${item.title.slice(0, 50)}...` : item.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <img
                        className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200"
                        src={item.image}
                        alt="news"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                        }}
                      />
                      <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                        <Image className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700">
                        {item.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => handleView(item)}
                        className="group/btn flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-500 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="View News"
                      >
                        <Eye className="w-4 h-4 text-blue-600 group-hover/btn:text-white transition-colors duration-200" />
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="group/btn flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-500 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Edit News"
                      >
                        <Edit className="w-4 h-4 text-green-600 group-hover/btn:text-white transition-colors duration-200" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item)}
                        className="group/btn flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-500 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Delete News"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:text-white transition-colors duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {Math.min(filteredNews.length, 8)} of {filteredNews.length} entries
              {searchTerm && ` (filtered by "${searchTerm}")`}
              {filterStatus !== 'all' && ` (status: ${filterStatus})`}
            </p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-75"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-150"></div>
              <span className="ml-2 text-xs text-green-600 font-semibold">Live Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"> */}
        {/* <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
          <p className="text-purple-100 text-sm mb-4">Manage your content efficiently</p>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition duration-300">
            Bulk Operations
          </button>
        </div> */}
{/*         
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Analytics</h3>
          <p className="text-green-100 text-sm mb-4">Track your performance metrics</p>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition duration-300">
            View Reports
          </button>
        </div> */}
        
        {/* <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Settings</h3>
          <p className="text-orange-100 text-sm mb-4">Configure your dashboard</p>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition duration-300">
            Customize
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default AdminIndex;
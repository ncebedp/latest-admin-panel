import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Shield, 
  LayoutDashboard, 
  Newspaper, 
  UserPlus, 
  Users, 
  User, 
  Plus, 
  LogOut,
  ChevronRight,
  Settings
} from "lucide-react";
import StoreContext from "../../context/storeContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { store, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const logout = () => {
    localStorage.removeItem("newsToken");
    dispatch({
      type: "logout",
      payload: ''
    });
    navigate("/login");
  };

  const menuItems = store.userInfo.role === "admin" ? [
    { path: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard", active: pathname === "/dashboard/admin" },
    { path: "/dashboard/writer/add", icon: UserPlus, label: "Add User", active: pathname === "/dashboard/writer/add" },
    { path: "/dashboard/writers", icon: Users, label: "View Writers", active: pathname === "/dashboard/writers" },
    { path: "/dashboard/news/create", icon: Plus, label: "Add News", active: pathname === "/dashboard/news/create" },
    { path: "/dashboard/news", icon: Newspaper, label: "View News", active: pathname === "/dashboard/news" },
    { path: "/dashboard/profile", icon: User, label: "Profile", active: pathname === "/dashboard/profile" }
  ] : [
    { path: "/dashboard/writer", icon: LayoutDashboard, label: "Dashboard", active: pathname === "/dashboard/writer" },
    { path: "/dashboard/news/create", icon: Plus, label: "Add News", active: pathname === "/dashboard/news/create" },
    { path: "/dashboard/news", icon: Newspaper, label: "View News", active: pathname === "/dashboard/news" },
    { path: "/dashboard/profile", icon: User, label: "Profile", active: pathname === "/dashboard/profile" }
  ];

  return (
    <div className="w-[265px] h-screen fixed left-0 top-0 bg-white border-r border-gray-200 shadow-lg z-50">
      {/* Header Section */}
      <div className="h-[80px] flex flex-col justify-center items-center border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <Link to="/" className="group">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Management System</p>
            </div>
          </div>
        </Link>
      </div>

      {/* User Info Section */}
      <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 capitalize">
              {store.userInfo.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize bg-blue-100 px-2 py-0.5 rounded-full inline-block">
              {store.userInfo.role || 'Role'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${
                hoveredItem === index ? 'scale-110' : ''
              }`} />
              <span className="font-medium text-sm">{item.label}</span>
              
              {/* Active indicator */}
              {item.active && (
                <div className="absolute right-3">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
              
              {/* Hover effect */}
              {!item.active && hoveredItem === index && (
                <div className="absolute right-3">
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        {/* Settings Link */}
        <Link
          to="/dashboard/settings"
          className={`group flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 mb-2 ${
            pathname === "/dashboard/settings"
              ? 'bg-gray-200 text-gray-800'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="group w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Logout</span>
        </button>

        {/* Security Badge */}
        <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center space-x-2">
            <Shield className="w-3 h-3 text-green-600" />
            <span className="text-xs text-green-700 font-medium">Secure Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
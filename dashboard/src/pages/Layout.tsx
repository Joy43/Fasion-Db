import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import type { RootState } from '../store';
import logo from '../assets/logo.gif';
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  Award,
  Store,
  LogOut,

  User,
  Zap
} from 'lucide-react';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo-wrapper">
            <img src={logo} alt="Fasionbd Logo" className="sidebar-logo-img" />
          </div>
          <span className="sidebar-brand-text">Fasionbd</span>
        </div>

        <nav style={{ flex: 1 }}>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <NavLink to="/dashboard" end>
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboard/products">
                <ShoppingBag size={18} />
                <span>Products</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboard/categories">
                <Tag size={18} />
                <span>Categories</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboard/brands">
                <Award size={18} />
                <span>Brands</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboard/shops">
                <Store size={18} />
                <span>Shops</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboard/flash-sales">
                <Zap size={18} />
                <span>Flash Sales</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <div className="user-details">
              <span className="user-email" style={{ fontWeight: 600, color: '#f8fafc' }}>
                {user?.email ? user.email.split('@')[0] : 'Admin'}
              </span>
              <span className="user-role">
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-bar">
          <h2 className="page-title" style={{ fontSize: '18px', fontWeight: 600 }}>
            Management Portal
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Status: <span style={{ color: '#10b981', fontWeight: 600 }}>Online</span>
            </span>
          </div>
        </header>

        <div className="content-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

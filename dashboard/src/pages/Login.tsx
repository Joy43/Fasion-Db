import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../store/apiSlice';
import { setCredentials } from '../store/authSlice';
import type { RootState } from '../store';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';

export function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await login({ email, password }).unwrap();
      if (response?.success && response?.data?.accessToken) {
        const token = response.data.accessToken;
        const decoded = decodeJwt(token);
        
        dispatch(
          setCredentials({
            token,
            user: decoded
              ? {
                  id: decoded.userId,
                  email: decoded.email,
                  role: decoded.role,
                }
              : { id: '', email, role: 'admin' },
          })
        );
        navigate('/dashboard');
      } else {
        setErrorMsg(response?.message || 'Login failed. Please check credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Sparkles size={28} />
          Fasionbd Admin
        </div>
        <p className="auth-subtitle">Sign in to manage shops, products, brands, and categories</p>
        
        {errorMsg && (
          <div className="error-container" style={{ textAlign: 'left', fontSize: '14px' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'rgba(255, 255, 255, 0.4)' 
                }} 
              />
              <input
                type="email"
                className="form-input"
                placeholder="admin@fasionbd.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '44px' }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'rgba(255, 255, 255, 0.4)' 
                }} 
              />
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '44px' }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ marginTop: '16px' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

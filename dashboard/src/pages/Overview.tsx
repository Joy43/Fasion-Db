import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useGetShopsQuery
} from '../store/apiSlice';
import { ShoppingBag, Tag, Award, Store, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Overview() {
  const { data: productsRes, isLoading: loadingProducts } = useGetProductsQuery();
  const { data: categoriesRes, isLoading: loadingCategories } = useGetCategoriesQuery();
  const { data: brandsRes, isLoading: loadingBrands } = useGetBrandsQuery();
  const { data: shopsRes, isLoading: loadingShops } = useGetShopsQuery();

  const productsCount = productsRes?.data?.length || 0;
  const categoriesCount = categoriesRes?.data?.length || 0;
  const brandsCount = brandsRes?.data?.length || 0;
  const shopsCount = shopsRes?.data?.length || 0;

  const isLoading = loadingProducts || loadingCategories || loadingBrands || loadingShops;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-h)' }}>
          Welcome Back to Fasionbd Dashboard!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Here is an overview of your current fashion database.
        </p>
      </div>

      {isLoading ? (
        <Loading message="Loading database metrics..." />
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <ShoppingBag size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{productsCount}</span>
                <span className="stat-label">Total Products</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Tag size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{categoriesCount}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Award size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{brandsCount}</span>
                <span className="stat-label">Active Brands</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Store size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{shopsCount}</span>
                <span className="stat-label">Registered Shops</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
              Quick Navigation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <Link to="/dashboard/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500 }}>Manage Products</span>
                  <ChevronRight size={18} style={{ color: 'var(--primary)' }} />
                </div>
              </Link>

              <Link to="/dashboard/categories" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500 }}>Manage Categories</span>
                  <ChevronRight size={18} style={{ color: 'var(--primary)' }} />
                </div>
              </Link>

              <Link to="/dashboard/brands" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500 }}>Manage Brands</span>
                  <ChevronRight size={18} style={{ color: 'var(--primary)' }} />
                </div>
              </Link>

              <Link to="/dashboard/shops" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500 }}>Manage Shops</span>
                  <ChevronRight size={18} style={{ color: 'var(--primary)' }} />
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

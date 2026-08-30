import React, { useState } from 'react';
import {
  useGetFlashSalesQuery,
  useCreateFlashSaleMutation,
  useGetProductsQuery
} from '../store/apiSlice';
import { Plus, X, Zap, Percent, CheckSquare, Square } from 'lucide-react';
import Loading from '../components/Loading';

export default function FlashSales() {
  const { data: flashSalesRes, isLoading: loadingFlash, refetch } = useGetFlashSalesQuery();
  const { data: productsRes, isLoading: loadingProducts } = useGetProductsQuery();
  const [createFlashSale, { isLoading: creatingFlash }] = useCreateFlashSaleMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const products = productsRes?.data || [];
  const flashSales = flashSalesRes?.data?.result || [];

  const handleProductToggle = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const openCreateModal = () => {
    setDiscountPercentage(10);
    setSelectedProductIds([]);
    setErrorMsg('');
    setSuccessMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (selectedProductIds.length === 0) {
      setErrorMsg('Please select at least one product.');
      return;
    }

    try {
      const response = await createFlashSale({
        products: selectedProductIds,
        discountPercentage: Number(discountPercentage)
      }).unwrap();

      if (response?.success) {
        setSuccessMsg('Flash Sale created successfully!');
        refetch();
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1500);
      } else {
        setErrorMsg(response?.message || 'Failed to create flash sale.');
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || 'Error occurred while creating flash sale.');
    }
  };

  return (
    <div className="container" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap style={{ color: 'var(--primary)' }} /> Flash Sales
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Manage promotional campaigns and time-limited discounts
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal} style={{ width: 'auto' }}>
          <Plus size={18} /> Initiate Flash Sale
        </button>
      </div>

      {loadingFlash ? (
        <Loading message="Loading campaigns..." />
      ) : flashSales.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <Zap size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No Active Campaigns</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
            Get started by launching a new flash sale discount event
          </p>
          <button className="btn btn-primary" onClick={openCreateModal} style={{ width: 'auto', margin: '0 auto' }}>
            Launch Event
          </button>
        </div>
      ) : (
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {flashSales.map((product: any) => (
            <div key={product._id} className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600, fontSize: '12px', padding: '4px 8px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Percent size={12} /> {product.discountPercentage || 0}% OFF
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <img
                  src={product.imageUrls?.[0] || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px' }}>
                    Shop: {product.shop?.shopName || 'N/A'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>
                      ${product.offerPrice?.toFixed(2)}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ${product.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Initiation Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', border: '1px solid var(--border)', padding: '24px', position: 'relative', animation: 'scaleIn 0.2s ease-out' }}>
            <button style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Zap style={{ color: 'var(--primary)' }} /> Configure Campaign
            </h2>

            {errorMsg && (
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: 'var(--radius-md)', color: '#22c55e', fontSize: '14px', marginBottom: '16px' }}>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Discount Percentage (%)</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  max="99"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ marginBottom: '12px' }}>Select Products to Include</label>
                {loadingProducts ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading products...</p>
                ) : products.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No products available.</p>
                ) : (
                  <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
                    {products.map((product: any) => {
                      const isSelected = selectedProductIds.includes(product._id);
                      return (
                        <div
                          key={product._id}
                          onClick={() => handleProductToggle(product._id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: isSelected ? 'var(--primary-light)' : 'transparent', transition: 'var(--transition)' }}
                        >
                          {isSelected ? (
                            <CheckSquare size={18} style={{ color: 'var(--primary)' }} />
                          ) : (
                            <Square size={18} style={{ color: 'var(--text-muted)' }} />
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img
                              src={product.imageUrls?.[0] || 'https://via.placeholder.com/150'}
                              alt={product.name}
                              style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: 500, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>{product.name}</p>
                              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Original: ${product.price?.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={creatingFlash} style={{ flex: 1 }}>
                  {creatingFlash ? 'Launching...' : 'Launch Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from '../store/apiSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import Loading from '../components/Loading';

export default function Brands() {
  const { data: brandsRes, isLoading, error } = useGetBrandsQuery();
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingBrand(null);
    setName('');
    setLogo('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (brand: any) => {
    setEditingBrand(brand);
    setName(brand.name || '');
    setLogo(brand.logo || '');
    setIsActive(brand.isActive !== undefined ? brand.isActive : true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, logo, isActive };

    try {
      if (editingBrand) {
        await updateBrand({ id: editingBrand._id, ...payload }).unwrap();
      } else {
        await createBrand(payload).unwrap();
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Error saving brand');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(id).unwrap();
      } catch (err) {
        alert('Error deleting brand');
      }
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Brand List</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
              Create, edit, or delete store brands.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
            <Plus size={18} />
            <span>Add Brand</span>
          </button>
        </div>

        {isLoading ? (
          <Loading message="Loading brands..." />
        ) : error ? (
          <div className="error-container">Failed to load brands.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brandsRes?.data?.map((brand: any) => (
                  <tr key={brand._id}>
                    <td>
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="image-preview" onError={(e) => { (e.target as any).src = 'https://placehold.co/50x50?text=Brand' }} />
                      ) : (
                        <span style={{ fontSize: '24px' }}>🏆</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{brand.name}</td>
                    <td>
                      <span className={`badge ${brand.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {brand.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-icon-edit" onClick={() => openEditModal(brand)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(brand._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!brandsRes?.data || brandsRes.data.length === 0) && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      No brands found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{editingBrand ? 'Edit Brand' : 'Create Brand'}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Brand Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Logo URL</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://example.com/logo.png"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="isActiveBrand"
                    className="form-checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label htmlFor="isActiveBrand" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Active</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                  {editingBrand ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

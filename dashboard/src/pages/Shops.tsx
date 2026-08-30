import React, { useState } from 'react';
import {
  useGetShopsQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
} from '../store/apiSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import Loading from '../components/Loading';

export default function Shops() {
  const { data: shopsRes, isLoading, error } = useGetShopsQuery();
  const [createShop] = useCreateShopMutation();
  const [updateShop] = useUpdateShopMutation();
  const [deleteShop] = useDeleteShopMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<any>(null);

  // Form State
  const [shopName, setShopName] = useState('');
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [establishedYear, setEstablishedYear] = useState(new Date().getFullYear());
  const [taxIdentificationNumber, setTaxIdentificationNumber] = useState('');
  const [logo, setLogo] = useState('');
  const [servicesOffered, setServicesOffered] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingShop(null);
    setShopName('');
    setBusinessLicenseNumber('');
    setAddress('');
    setContactNumber('');
    setWebsite('');
    setEstablishedYear(new Date().getFullYear());
    setTaxIdentificationNumber('');
    setLogo('');
    setServicesOffered('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (shop: any) => {
    setEditingShop(shop);
    setShopName(shop.shopName || '');
    setBusinessLicenseNumber(shop.businessLicenseNumber || '');
    setAddress(shop.address || '');
    setContactNumber(shop.contactNumber || '');
    setWebsite(shop.website || '');
    setEstablishedYear(shop.establishedYear || new Date().getFullYear());
    setTaxIdentificationNumber(shop.taxIdentificationNumber || '');
    setLogo(shop.logo || '');
    setServicesOffered(shop.servicesOffered ? shop.servicesOffered.join(', ') : '');
    setIsActive(shop.isActive !== undefined ? shop.isActive : true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const servicesArr = servicesOffered
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      shopName,
      businessLicenseNumber,
      address,
      contactNumber,
      website,
      establishedYear: Number(establishedYear),
      taxIdentificationNumber,
      logo,
      servicesOffered: servicesArr,
      isActive,
    };

    try {
      if (editingShop) {
        await updateShop({ id: editingShop._id, ...payload }).unwrap();
      } else {
        await createShop(payload).unwrap();
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Error saving shop');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      try {
        await deleteShop(id).unwrap();
      } catch (err) {
        alert('Error deleting shop');
      }
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Shop List</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
              Create, edit, or delete registered vendor shops.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
            <Plus size={18} />
            <span>Add Shop</span>
          </button>
        </div>

        {isLoading ? (
          <Loading message="Loading shops..." />
        ) : error ? (
          <div className="error-container">Failed to load shops.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Shop Name</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Est. Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shopsRes?.data?.map((shop: any) => (
                  <tr key={shop._id}>
                    <td>
                      {shop.logo ? (
                        <img src={shop.logo} alt={shop.shopName} className="image-preview" onError={(e) => { (e.target as any).src = 'https://placehold.co/50x50?text=Shop' }} />
                      ) : (
                        <span style={{ fontSize: '24px' }}>🏪</span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{shop.shopName}</div>
                      {shop.website && (
                        <a href={shop.website} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary)' }}>
                          {shop.website}
                        </a>
                      )}
                    </td>
                    <td>{shop.contactNumber}</td>
                    <td style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{shop.address}</td>
                    <td>{shop.establishedYear}</td>
                    <td>
                      <span className={`badge ${shop.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {shop.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-icon-edit" onClick={() => openEditModal(shop)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(shop._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!shopsRes?.data || shopsRes.data.length === 0) && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      No shops found.
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
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingShop ? 'Edit Shop' : 'Create Shop'}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Shop Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Business License #</label>
                  <input
                    type="text"
                    className="form-input"
                    value={businessLicenseNumber}
                    onChange={(e) => setBusinessLicenseNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tax ID (TIN)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={taxIdentificationNumber}
                    onChange={(e) => setTaxIdentificationNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Website URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Established Year</label>
                  <input
                    type="number"
                    className="form-input"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Logo URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Services Offered (Comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Free Shipping, 24/7 Support, Gift Wrapping"
                    value={servicesOffered}
                    onChange={(e) => setServicesOffered(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2' }}>
                  <input
                    type="checkbox"
                    id="isActiveShop"
                    className="form-checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label htmlFor="isActiveShop" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Active</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                  {editingShop ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

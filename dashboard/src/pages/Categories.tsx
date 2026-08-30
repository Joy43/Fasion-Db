import React, { useState } from 'react';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../store/apiSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import Loading from '../components/Loading';

export default function Categories() {
  const { data: categoriesRes, isLoading, error } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setIcon('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setName(category.name || '');
    setSlug(category.slug || '');
    setDescription(category.description || '');
    setIcon(category.icon || '');
    setIsActive(category.isActive !== undefined ? category.isActive : true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, slug: slug || name.toLowerCase().replace(/ /g, '-'), description, icon, isActive };

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory._id, ...payload }).unwrap();
      } else {
        await createCategory(payload).unwrap();
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Error saving category');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
      } catch (err) {
        alert('Error deleting category');
      }
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Category List</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
              Create, edit, or delete store categories.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        </div>

        {isLoading ? (
          <Loading message="Loading categories..." />
        ) : error ? (
          <div className="error-container">Failed to load categories.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesRes?.data?.map((category: any) => (
                  <tr key={category._id}>
                    <td>
                      {category.icon ? (
                        <img src={category.icon} alt={category.name} className="image-preview" onError={(e) => { (e.target as any).src = 'https://placehold.co/50x50?text=Category' }} />
                      ) : (
                        <span style={{ fontSize: '24px' }}>🏷️</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{category.name}</td>
                    <td>{category.slug}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{category.description || 'No description'}</td>
                    <td>
                      <span className={`badge ${category.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-icon-edit" onClick={() => openEditModal(category)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(category._id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!categoriesRes?.data || categoriesRes.data.length === 0) && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      No categories found.
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
              <h3 className="modal-title">{editingCategory ? 'Edit Category' : 'Create Category'}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. fashion-wear"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    style={{ height: '80px', resize: 'vertical' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon URL</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://example.com/icon.png"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="isActive"
                    className="form-checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label htmlFor="isActive" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Active</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

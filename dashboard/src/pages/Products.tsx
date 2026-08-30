import React, { useState } from 'react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useGetShopsQuery,
} from '../store/apiSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import Loading from '../components/Loading';

export default function Products() {
  const { data: productsRes, isLoading: loadingProducts, error: errorProducts } = useGetProductsQuery();
  const { data: categoriesRes } = useGetCategoriesQuery();
  const { data: brandsRes } = useGetBrandsQuery();
  const { data: shopsRes } = useGetShopsQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [shop, setShop] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [availableColors, setAvailableColors] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice(0);
    setStock(0);
    setWeight('');
    setCategory(categoriesRes?.data?.[0]?._id || '');
    setBrand(brandsRes?.data?.[0]?._id || '');
    setShop(shopsRes?.data?.[0]?._id || '');
    setImageUrls('');
    setAvailableColors('');
    setKeyFeatures('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setName(product.name || '');
    setDescription(product.description || '');
    setPrice(product.price || 0);
    setStock(product.stock || 0);
    setWeight(product.weight !== null && product.weight !== undefined ? String(product.weight) : '');
    setCategory(product.category?._id || product.category || '');
    setBrand(product.brand?._id || product.brand || '');
    setShop(product.shop?._id || product.shop || '');
    setImageUrls(product.imageUrls ? product.imageUrls.join(', ') : '');
    setAvailableColors(product.availableColors ? product.availableColors.join(', ') : '');
    setKeyFeatures(product.keyFeatures ? product.keyFeatures.join(', ') : '');
    setIsActive(product.isActive !== undefined ? product.isActive : true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imgs = imageUrls.split(',').map((img) => img.trim()).filter((img) => img.length > 0);
    const colors = availableColors.split(',').map((c) => c.trim()).filter((c) => c.length > 0);
    const features = keyFeatures.split(',').map((f) => f.trim()).filter((f) => f.length > 0);

    const payload = {
      name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      description,
      price: Number(price),
      stock: Number(stock),
      weight: weight ? Number(weight) : null,
      category,
      brand,
      shop,
      imageUrls: imgs,
      availableColors: colors,
      keyFeatures: features,
      isActive,
      specification: {},
    };

    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, ...payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  // Helper Maps for display
  const categoryMap = React.useMemo(() => {
    const map = new Map<string, string>();
    categoriesRes?.data?.forEach((c: any) => map.set(c._id, c.name));
    return map;
  }, [categoriesRes]);

  const brandMap = React.useMemo(() => {
    const map = new Map<string, string>();
    brandsRes?.data?.forEach((b: any) => map.set(b._id, b.name));
    return map;
  }, [brandsRes]);

  const shopMap = React.useMemo(() => {
    const map = new Map<string, string>();
    shopsRes?.data?.forEach((s: any) => map.set(s._id, s.shopName));
    return map;
  }, [shopsRes]);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Product List</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
              Create, edit, or delete items in the store catalog.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>

        {loadingProducts ? (
          <Loading message="Loading products..." />
        ) : errorProducts ? (
          <div className="error-container">Failed to load products.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Product Details</th>
                  <th>Price & Stock</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Shop</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsRes?.data?.map((product: any) => {
                  const catName = categoryMap.get(product.category?._id || product.category) || 'N/A';
                  const brName = brandMap.get(product.brand?._id || product.brand) || 'N/A';
                  const shName = shopMap.get(product.shop?._id || product.shop) || 'N/A';

                  return (
                    <tr key={product._id}>
                      <td>
                        {product.imageUrls?.[0] ? (
                          <img src={product.imageUrls[0]} alt={product.name} className="image-preview" onError={(e) => { (e.target as any).src = 'https://placehold.co/50x50?text=Product' }} />
                        ) : (
                          <span style={{ fontSize: '24px' }}>🛍️</span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{product.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {product.description}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>${product.price}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Stock: {product.stock}</div>
                      </td>
                      <td>{catName}</td>
                      <td>{brName}</td>
                      <td>{shName}</td>
                      <td>
                        <span className={`badge ${product.isActive ? 'badge-success' : 'badge-danger'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon btn-icon-edit" onClick={() => openEditModal(product)}>
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(product._id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {(!productsRes?.data || productsRes.data.length === 0) && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      No products found.
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
          <div className="modal-content" style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingProduct ? 'Edit Product' : 'Create Product'}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    style={{ height: '70px', resize: 'vertical' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock Qty</label>
                  <input
                    type="number"
                    className="form-input"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Weight (optional)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoriesRes?.data?.map((c: any) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <select
                    className="form-input"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  >
                    <option value="">Select Brand</option>
                    {brandsRes?.data?.map((b: any) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Shop</label>
                  <select
                    className="form-input"
                    value={shop}
                    onChange={(e) => setShop(e.target.value)}
                    required
                  >
                    <option value="">Select Shop</option>
                    {shopsRes?.data?.map((s: any) => (
                      <option key={s._id} value={s._id}>{s.shopName}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Image URLs (Comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                    value={imageUrls}
                    onChange={(e) => setImageUrls(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Available Colors (Comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Red, Blue, Black"
                    value={availableColors}
                    onChange={(e) => setAvailableColors(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Key Features (Comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Premium Cotton, Breathable, Stretchable"
                    value={keyFeatures}
                    onChange={(e) => setKeyFeatures(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2' }}>
                  <input
                    type="checkbox"
                    id="isActiveProduct"
                    className="form-checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label htmlFor="isActiveProduct" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Active</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

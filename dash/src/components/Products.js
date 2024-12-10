
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Products.css';
import Header from './Header';
import SideBar from './SideBar';

function Products() {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', preview: '', price: '', sold: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleError = (error, defaultMessage) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || data.message?.includes('token')) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        // window.location.href = '/login';
      } else {
        toast.error(data.message || defaultMessage);
      }
    } else {
      toast.error(error.message || defaultMessage);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      toast.error('Authentication token missing. Please log in.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/data/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      handleError(error, 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddItemClick = () => {
    setShowPopup(true);
    setFormData({ name: '', preview: '', price: '', sold: '' });
    setSelectedFile(null);
    setIsEdit(false);
  };

  const handleEditClick = (product) => {
    setFormData({ ...product });
    setSelectedFile(null);
    setIsEdit(true);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsEdit(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prevData) => ({ ...prevData, preview: file.name }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.price || !formData.sold) {
      toast.error('Please fill in all required fields.');
      return;
    }
  
    const url = isEdit
      ? `http://localhost:3001/api/data/products/${formData._id}`
      : 'http://localhost:3001/api/data/products';
  
    console.log('Request Details:', {
      url,
      method: isEdit ? 'PUT' : 'POST',
      formData,
    });
  
    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('price', formData.price);
    dataToSend.append('sold', formData.sold);
    
    if (selectedFile) {
      dataToSend.append('preview', selectedFile);
    } else if (isEdit && formData.preview) {
      dataToSend.append('preview', formData.preview);
    }
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token is missing.');
  
      const response = await axios({
        method: isEdit ? 'PUT' : 'POST',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: dataToSend,
      });
  
      console.log('API Response:', response.data);
  
      setProducts((prev) =>
        isEdit
          ? prev.map((item) => (item._id === response.data._id ? response.data : item))
          : [...prev, response.data]
      );
  
      toast.success(isEdit ? 'Product updated successfully!' : 'Product added successfully!');
      closePopup();
    } catch (error) {
      console.error('Error during product save:', error);
      toast.error(
        error.response?.status === 404
          ? 'Product not found or invalid endpoint.'
          : `Failed to save product: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  
  
  
  
  

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token missing.');

      await axios.delete(`http://localhost:3001/api/data/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((product) => product._id !== id)); // Remove product from state
      toast.success('Product deleted successfully!');
    } catch (error) {
      handleError(error, 'Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <SideBar />
      <div id="products" className="products">
        <ToastContainer />
        <div className="product-titles">
          <h4>Products</h4>
          <button className="button" onClick={handleAddItemClick}>
            <span className="button__text">Add Item</span>
            <span className="button__icon">
              <i className="bi bi-plus-circle" style={{ color: '#fff' }}></i>
            </span>
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : products.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Sold</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.preview || '/placeholder.png'}
                        alt={product.name}
                        style={{ width: '80px', height: '80px' }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.sold}</td>
                    <td style={{ color: "grey" }}>
                      <i className="bi bi-pencil" style={{ marginLeft: "15px", color:"green" }} onClick={() => handleEditClick(product)}></i>
                      <i className="bi bi-trash-fill" style={{ marginLeft: "15px", color:"red" }} onClick={() => handleDelete(product._id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No products found.</div>
        )}

        {showPopup && (
          <div className="popup show">
            <div className="popup-content">
              <div className="top">
                <h5>{isEdit ? 'Edit Product' : 'Add New Product'}</h5>
                <button type="button" className="close_btn" onClick={closePopup}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                  <label>Product Name</label>
                </div>

                <div className="inputGroup">
                  <input type="file" name="preview" onChange={handleFileChange} />
                  <label>Product Preview</label>
                </div>

                <div className="inputGroup">
                  <input
                    type="number"
                    name="price"
                    placeholder=" "
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                  <label>Price</label>
                </div>

                <div className="inputGroup">
                  <input
                    type="number"
                    name="sold"
                    placeholder=" "
                    value={formData.sold}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                  <label>Sold</label>
                </div>

                <button type="submit" className="btn btn-primary">
                  {isEdit ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Products;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './order.css';
import Header from './Header';
import SideBar from './SideBar';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleError = (error, defaultMessage) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || data.message?.includes('token')) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
      } else {
        toast.error(data.message || defaultMessage);
      }
    } else {
      toast.error(error.message || defaultMessage);
    }
  };

  const fetchOrders = async () => {
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
      setOrders(response.data); 
    } catch (error) {
      handleError(error, 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <SideBar />
      <div id="order" className="orders">
        <ToastContainer />
        <div className="order-titles">
          <h4>Orders</h4>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : orders.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img
                        src={order.preview || '/placeholder.png'}
                        alt={order.name}
                        style={{ width: '80px', height: '80px' }}
                      />
                    </td>
                    <td>{order.name}</td>
                    <td>${order.price}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No orders found.</div>
        )}
      </div>
    </>
  );
}

export default Order;

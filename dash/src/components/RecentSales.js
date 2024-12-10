
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; 
import './recentSales.css';
import Header from './Header'; 
import SideBar from './SideBar'; 

function RecentSales() {
    const [overview, setOverview] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/data/products")
            .then((response) => {
                setOverview(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data.");
            });
    }, [userId]);  

    return (
        <>
            <ToastContainer />
            <Header /> 
            <SideBar /> 
            <div id='recent-sales' className="recent-sales">
                <div id='fullrecent' className='fullrecent'>
                    <div className="overview-titles">
                        <h4>Recent Sales Overview</h4>
                    </div>

                    <div className='cardss'>
                        <table className='table table-borderless datatable'>
                            <thead className='table-light'>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Customer</th>
                                    <th scope='col'>Product</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Status</th>
                                </tr>
                            </thead>
                            <tbody id='datatable'>
                                {overview.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.number}</td>
                                        <td>{item.customer}</td>
                                        <td><a href='/#' className='text-primary'>{item.product}</a></td>
                                        <td>{item.price !== undefined && !isNaN(item.price) ? `$${item.price.toFixed(2)}` : 'N/A'}</td>
                                        <td>
                                            <span className={`badge bg-${item.status === 'Approved' ? 'success' : item.status === 'Pending' ? 'warning' : 'danger'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecentSales;



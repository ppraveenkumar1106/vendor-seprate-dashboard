import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function NavAvatar() {
    const { logout, username } = useAuth(); 
    const navigate = useNavigate();

    console.log("NavAvatar Username:", username);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const generateProfileImage = (username) => {
        if (!username) return null;

        const firstChar = username.charAt(0).toUpperCase();
        const backgroundColor = '#71a832';
        const textColor = '#fff';

        const style = {
            backgroundColor,
            color: textColor,
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            fontWeight: 'bold',
        };

        return (
            <div style={style}>
                {firstChar}
            </div>
        );
    };

    return (
        <div>
            <li className='nav-item dropdown pe-3'>
                <a
                    className='nav-links nav-profile d-flex align-items-center pe-0'
                    href='#'
                    data-bs-toggle='dropdown'
                >
                    {generateProfileImage(username)}
                    <span className='d-none d-md-block dropdown-toggle ps-2'>
                        {username ? `${username.charAt(0).toUpperCase()}${username.slice(1)}` : 'Guest'}
                    </span>
                </a>

                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
                    <li className='dropdown-header'>
                        <h6>{username || 'Guest'}</h6>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li>
                    <li>
                        <a className='dropdown-item d-flex align-items-center' href='/dashboard'>
                            <i className='bi bi-person'></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li>
                    <li>
                        <a className='dropdown-item d-flex align-items-center' href='/dashboard'>
                            <i className='bi bi-gear'></i>
                            <span>Account Setting</span>
                        </a>
                    </li>
                    <li>
                        <hr className='dropdown-divider' />
                    </li>
                    <li>
                        <a
                            href='/'
                            className='dropdown-item d-flex align-items-center'
                            onClick={handleLogout}
                        >
                            <i className='bi bi-arrow-right'></i>
                            <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </li>
        </div>
    );
}

export default NavAvatar;

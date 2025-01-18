// src/components/ProfileLink.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProfileLink = ({ isAuthenticated, setWarningOpen, children, ...props }) => {
    const handleClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault(); // Evitar la navegación
            setWarningOpen(true); // Abrir el modal de advertencia
        }
    };

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default ProfileLink;

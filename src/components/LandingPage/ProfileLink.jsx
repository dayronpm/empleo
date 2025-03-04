// src/components/ProfileLink.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProfileLink = ({ isAuthenticated, setWarningOpen, openLogin, children, ...props }) => {
    const handleClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault(); // Evitar la navegación
            openLogin(); // Abrir directamente el modal de inicio de sesión en lugar del modal de advertencia
        }
    };

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default ProfileLink;

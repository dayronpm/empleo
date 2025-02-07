import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUsername('');
    };

    const openLogin = () => {
        setLoginOpen(true);
        setRegisterOpen(false);
    };

    const openRegister = () => {
        setRegisterOpen(true);
        setLoginOpen(false);
    };

    const handleLoginSuccess = (username) => {
        setIsAuthenticated(true);
        setUsername(username);
    };

    return {
        isLoginOpen,
        isRegisterOpen,
        isAuthenticated,
        username,
        openLogin,
        openRegister,
        handleLogout,
        handleLoginSuccess,
        setLoginOpen,
        setRegisterOpen
    };
};

export default useAuth;

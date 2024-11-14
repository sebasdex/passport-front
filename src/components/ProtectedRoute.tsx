import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import checkAuth from '../helpers/checkAuth';
import CircularUnderLoad from './CircularUnderLoad';
import { useRole } from '../helpers/useRole';

type ProtectedRouteProps = {
    redirectTo: string;
    allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { userData, setUserData } = useRole();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const authStatus = await checkAuth();
                setIsAuthenticated(authStatus.isAuthenticated);
                if (authStatus.isAuthenticated && authStatus.user) {
                    setUserData(authStatus.user);
                }
            } catch (error) {
                console.error("Error de autenticación:", error);
                setIsAuthenticated(false);
            }
        };
        if (isAuthenticated === null) {
            verifyAuth();
        }
    }, [isAuthenticated, setUserData]);

    if (isAuthenticated === null) return <><CircularUnderLoad /></>;
    if (userData && userData.role && !allowedRoles.includes(userData.role)) return <Navigate to={redirectTo} />;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

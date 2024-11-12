import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import checkAuth from '../helpers/checkAuth';
import CircularUnderLoad from './CircularUnderLoad';

type ProtectedRouteProps = {
    redirectTo: string;
    allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const authStatus = await checkAuth();
                console.log("Estado de autenticación:", authStatus);
                setIsAuthenticated(authStatus.isAuthenticated);
                setUserRole(authStatus.user?.role || null);
            } catch (error) {
                console.error("Error de autenticación:", error);
                setIsAuthenticated(false);
            }
        };
        if (isAuthenticated === null) {
            verifyAuth();
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) return <><CircularUnderLoad /></>;
    if (!allowedRoles.includes(userRole || "")) return <Navigate to={redirectTo} />;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

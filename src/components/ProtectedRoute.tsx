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
                if (authStatus.isAuthenticated && authStatus.user) {
                    setIsAuthenticated(true);
                    setUserData(authStatus.user);
                }
                else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log("Error al verificar autenticación", error);
                setIsAuthenticated(false);
            }
        };
        verifyAuth();
    }, [setUserData]);

    if (isAuthenticated === null) return <><CircularUnderLoad /></>;
    if (isAuthenticated === false) return <Navigate to={redirectTo} />;

    if (userData && userData.role && !allowedRoles.includes(userData.role)) {
        return <Navigate to={redirectTo} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

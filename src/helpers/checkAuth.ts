const checkAuth = async () : Promise<{ isAuthenticated: boolean, user?: { role: string | null, employeeId: number | null } }> => {
    try {
        const response = await fetch(`/api/auth/api/checkSession`, {
            method: 'GET',
            credentials: 'include', 
        });
        if (response.status === 401) {
            return { isAuthenticated: false };
        }
        const data = await response.json();
        if(!data.isAuthenticated || !data.user) {
            return { isAuthenticated: false };
        }
        return { isAuthenticated: true, user: data.user };
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
        return { isAuthenticated: false };
    }
};

export default checkAuth;

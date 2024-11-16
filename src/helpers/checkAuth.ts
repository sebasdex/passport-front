const checkAuth = async () : Promise<{ isAuthenticated: boolean, user?: { role: string | null, employeeId: number | null } }> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_URL}auth/api/checkSession`, {
            method: 'GET',
            credentials: 'include', 
        });
        console.log('response', response);
        if (response.status === 401) {
            console.log('No se autenticaron error 401');
            return { isAuthenticated: false };
        }
        const data = await response.json();
        console.log('data', data);
        if(!data.isAuthenticated || !data.user) {
            console.log('No se autenticaron error 401' + data.user);
            return { isAuthenticated: false };
        }
        return { isAuthenticated: true, user: data.user };
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
        return { isAuthenticated: false };
    }
};

export default checkAuth;

const checkAuth = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_URL}auth/api/checkSession`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            return {
                isAuthenticated: false
            }
        }
        const data = await response.json();
        return {
            isAuthenticated: data.isAuthenticated,
            user: data.user
        }
    } catch (error) {
        console.error('Error checking auth:', error);
        return {
            isAuthenticated: false
        }
    }
};

export default checkAuth;

import { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<{ role: string | null, employeeId: number | null }>({ role: null, employeeId: null });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};



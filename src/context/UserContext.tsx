import { createContext } from 'react';

export type UserData = {
    userData: {
        role: string | null;
        employeeId: number | null;
    } | null;
    setUserData: React.Dispatch<React.SetStateAction<{ role: string | null, employeeId: number | null }>>;
};


export const UserContext = createContext<UserData | undefined>(undefined);
